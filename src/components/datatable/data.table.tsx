import { useState, useEffect } from 'react';
import { DangerIcon, SpinnerIcon } from "../../lib/icons/helper.icons";
import { SimpleTable, TableProps } from './lib/simple.table';
//import { useReactTable } from "@tanstack/react-table"

const CONTRAST = {
    light: 300, dark: 800, hover: 200
}

enum customFieldSharpStyle {
    rounded = 'rounded-xl',
    square = 'rounded-none'
}
enum customFieldFillStyle {
    filled = 'bg-$ text-#',
    border = 'bg-transparent border-2 border-# text-#' 
}

const colors = {
    prim: { light: `prim-${CONTRAST.light}`, dark: `prim-${CONTRAST.dark}`, hover: `prim-${CONTRAST.hover}` },
    sec: { light: `sec-${CONTRAST.light}`, dark: `sec-${CONTRAST.dark}`, hover: `sec-${CONTRAST.hover}` },
    blue: { light: `blue-${CONTRAST.light}`, dark: `blue-${CONTRAST.dark}`, hover: `blue-${CONTRAST.hover}` },
    red: { light: `red-${CONTRAST.light}`, dark: `red-${CONTRAST.dark}`, hover: `red-${CONTRAST.hover}` },
    yellow: { light: `yellow-${CONTRAST.light}`, dark: `yellow-${CONTRAST.dark}`, hover: `yellow-${CONTRAST.hover}` },
    pink: { light: `pink-${CONTRAST.light}`, dark: `pink-${CONTRAST.dark}`, hover: `pink-${CONTRAST.hover}` },
    slate: { light: `slate-${CONTRAST.light}`, dark: `slate-${CONTRAST.dark}`, hover: `slate-${CONTRAST.hover}` },
    green: { light: `green-${CONTRAST.light}`, dark: `green-${CONTRAST.dark}`, hover: `green-${CONTRAST.hover}` },
    zinc: { light: `zinc-${CONTRAST.light}`, dark: `zinc-${CONTRAST.dark}`, hover: `zinc-${CONTRAST.hover}` },
    neutral: { light: `neutral-${CONTRAST.light}`, dark: `neutral-${CONTRAST.dark}`, hover: `neutral-${CONTRAST.hover}` },
    stone: { light: `stone-${CONTRAST.light}`, dark: `stone-${CONTRAST.dark}`, hover: `stone-${CONTRAST.hover}` },
    orange: { light: `orange-${CONTRAST.light}`, dark: `orange-${CONTRAST.dark}`, hover: `orange-${CONTRAST.hover}` },
    amber: { light: `amber-${CONTRAST.light}`, dark: `amber-${CONTRAST.dark}`, hover: `amber-${CONTRAST.hover}` },
    lime: { light: `lime-${CONTRAST.light}`, dark: `lime-${CONTRAST.dark}`, hover: `lime-${CONTRAST.hover}` },
    emerald: { light: `emerald-${CONTRAST.light}`, dark: `emerald-${CONTRAST.dark}`, hover: `emerald-${CONTRAST.hover}` },
    teal: { light: `teal-${CONTRAST.light}`, dark: `teal-${CONTRAST.dark}`, hover: `teal-${CONTRAST.hover}` },
    sky: { light: `sky-${CONTRAST.light}`, dark: `sky-${CONTRAST.dark}`, hover: `sky-${CONTRAST.hover}` },
    indigo: { light: `indigo-${CONTRAST.light}`, dark: `indigo-${CONTRAST.dark}`, hover: `indigo-${CONTRAST.hover}` },
    violet: { light: `violet-${CONTRAST.light}`, dark: `violet-${CONTRAST.dark}`, hover: `violet-${CONTRAST.hover}` },
    purple: { light: `purple-${CONTRAST.light}`, dark: `purple-${CONTRAST.dark}`, hover: `purple-${CONTRAST.hover}` },
    fuchsia: { light: `fuchsia-${CONTRAST.light}`, dark: `fuchsia-${CONTRAST.dark}`, hover: `fuchsia-${CONTRAST.hover}` },
    rose: { light: `rose-${CONTRAST.light}`, dark: `rose-${CONTRAST.dark}`, hover: `rose-${CONTRAST.hover}` },
}

type customFieldStyle = {
    color: keyof typeof colors
    sharp?: keyof typeof customFieldSharpStyle
    fill?: keyof typeof customFieldFillStyle
}

type statusStyle = {
    icon?: JSX.Element
    style: customFieldStyle
    value: string
}

type customField = {
    key: string
    statusStyle: statusStyle[]
    type?: customFieldStyle
    onClick?: (data: object) => void
}

export type Props = {
    columns: TableProps['columns']
    getDataApi: string
    options?: {
        customFields: customField[]
    }
}

const buttons: TableProps['actions'] = {
    name: 'Acciones',
    buttons: [
        {
            cback(e) {
                console.log(e.currentTarget.ariaLabel, e.currentTarget.getAttribute('data-index'))
            },
            name: 'Editar',
            role: 'success',
            bussy: false
        },
        {
            cback(e) {
                console.log(e.currentTarget.ariaLabel)
            },
            name: 'Eliminar',
            role: 'danger',
            bussy: false
        }
    ]
}

interface CustomFieldProps extends statusStyle {
    action?: {
        cback: customField['onClick']
        value: {[key: string]: unknown}
    }
}

// CAMBIAR CLASES POR ESTILOS EN LA PROPIEDAD STYLE DEL ELEMENTO
const calculateStyle = (data: customFieldStyle) => {
    const sharp = customFieldSharpStyle[data.sharp ?? "rounded"]
    const fill = customFieldFillStyle[data.fill ?? "filled"]

    const {dark, light, hover} = colors[data.color]

    const hoverStyle = `hover:bg-${hover} transition-colors`

    return `${sharp} ${fill.replace(/#/g, dark).replace(/\$/g, light)} ${hoverStyle}`
}

const CustomField = (props: CustomFieldProps) => {

    const {action, icon, value} = props

    const presetStyles = "text-center w-fit p-2 flex flex-row flex-wrap item-center justify-center content-center h-full gap-1";
    const calculatedStyles = calculateStyle(props.style)
    const style = `${presetStyles} ${calculatedStyles}`

    const Children = () => {
        return (
            <>
                {icon &&
                    <span>
                        {icon}
                    </span>
                }
                <span className='font-semibold'>
                    {value}
                </span>
            </>
        )
    }

    // Returns the cell content to call back function
    const handleClick = () => {
        if (action && action.cback) {
            const {cback, value} = action
            cback(value)
        }
    }

    return (
        <>
            {action
                ? <button onClick={handleClick} className={style}>
                    <Children />
                </button>
                : <div className={style}>
                    <Children />
                </div>
            }
        </>
    )
}


const performedRowData = async ({ row, customField }: { row: object, customField?: customField[] }):
    Promise<TableProps['data'][0]> => {

    return new Promise((res) => {
        const uuid = crypto.randomUUID()

        if (customField) {
            const newRow: { [key: string]: unknown } = structuredClone(row) as { [key: string]: unknown }

            customField.forEach(custom => {
                custom.statusStyle.forEach(customStatus => {
                    const key = custom.key as keyof typeof newRow
                    newRow[key] = (newRow[key] === customStatus.value)
                        ? <CustomField
                            value={customStatus.value}
                            style={customStatus.style}
                            icon={customStatus.icon}
                            action={{cback: custom.onClick, value: {[key]:customStatus.value}}}
                        />
                        : newRow[key]
                })
            })

            return res({
                uuid,
                ...newRow
            })
        }

        return res({
            uuid,
            ...row
        })
    })
}

export const DataTable = (props: Props) => {

    const [data, setData] = useState<TableProps['data']>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasErrors, setHasErrors] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        setHasErrors(false)

        const loadData = async () => {
            setIsLoading(true)

            const raw = await fetch(props.getDataApi)
            const data: object[] = await raw.json()
            const performedData = []

            for (const row of data) {
                const performedRow = await performedRowData({
                    row,
                    customField: props.options?.customFields
                })
                performedData.push(performedRow)
            }

            return performedData

        }

        loadData()
            .then(setData)
            .catch(err => {
                setHasErrors(true)
                console.error('Error fetching Data Table', err)
            })
            .finally(() => {
                setIsLoading(false)
            })

    }, [props.getDataApi, props.options?.customFields])


    const LoadingTag = () => {
        return (
            <div className="flex flex-row justify-center items-center gap-4 w-full py-2 bg-prim-700 text-white">
                <span className="animate-spin"><SpinnerIcon /></span>
                <p>Cargando...</p>
            </div>
        )
    }

    const ErrorTag = () => {
        return (
            <div className="flex flex-row justify-center items-center gap-4 w-full py-2 bg-red-500 text-white">
                <span><DangerIcon /></span>
                <p>Ha habido un error</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full min-h-max shadow-prim-${CONTRAST.hover} shadow-lg border-prim-400">
            {isLoading && <LoadingTag />}
            {hasErrors && <ErrorTag />}
            {!isLoading && !hasErrors && <>
                <SimpleTable columns={props.columns} data={data} actions={buttons} />
                <footer className="sticky bottom-0 w-full py-2 bg-prim-700 text-white text-center">
                    <span>Total: <b>{data.length.toLocaleString('es-DO')}</b></span>
                </footer>
            </>
            }

        </div>
    )
}