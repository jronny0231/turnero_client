import { useState, useEffect } from 'react';
import { DangerIcon, SpinnerIcon } from "../../lib/icons/helper.icons";
import { SimpleTable, TableProps } from './lib/simple.table';
//import { useReactTable } from "@tanstack/react-table"

type customFieldStyle = 'rounded' | 'square'

type customField = {
    key: string
    statusStyle: {
        icon?: JSX.Element
        style: string
        value: string
    }[]
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

type CustomFieldProps = {
    style: string
    value: string
    icon?: JSX.Element
    type?: customFieldStyle
    action?: customField['onClick']
}

const CustomField = ({ type = 'rounded', ...rest }: CustomFieldProps) => {

    const style = `text-center w-fit p-2 flex flex-row flex-wrap item-center justify-center content-center h-full gap-1 ${type === 'rounded' ? 'rounded-xl' : ''} ${rest.style}`
    const Children = () => {
        return (
            <>
                {rest.icon &&
                    <span>
                        {rest.icon}
                    </span>
                }
                <span className='font-semibold'>
                    {rest.value}
                </span>
            </>
        )
    }

    // Buscar la manera de obtener los datos de la fila sin sobrecargar los metadatos
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const row = e.currentTarget.parentElement?.parentElement

        const data = {
            uuid: row?.getAttribute('data-uuid') ?? '',
        }

        if (rest.action && data) {
            const rowData = {data}
            rest.action(rowData)
        }
    }

    return (
        <>
            {rest.action
                ? <button onClick={handleClick} className={`${style} border-none`}>
                    <Children />
                </button>
                : <div className={`${style}`}>
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
                            type={custom.type}
                            action={custom.onClick}
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
        <div className="flex flex-col w-full min-h-max shadow-prim-200 shadow-lg border-prim-400">
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