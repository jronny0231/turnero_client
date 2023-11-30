import { SpinnerIcon } from "../icons/helper.icons"
import { ButtonType, IconButton } from "../low/icon.button"
//import { useReactTable } from "@tanstack/react-table"

type HTMLTableType = JSX.IntrinsicElements["table"]
export interface TableType extends HTMLTableType {
    columns: {
        key: string
        name: string
    }[]
    data: object[]
    actions: {
        name: string
        buttons: ButtonType[]
    }
    isLoading?: boolean
}

export const DataTable = ({ columns, data, actions, isLoading, ...rest }: TableType) => {

    const dataPerformed = data.map(row => ({
        uuid: crypto.randomUUID(),
        ...row
    }))

    const LoadingTag = () => {
        return (
            <div className="flex flex-row justify-center items-center gap-4 w-full py-2 bg-prim-700 text-white">
                <span className="animate-spin"><SpinnerIcon /></span>
                <p>Cargando...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full min-h-max shadow-prim-200 shadow-lg border-prim-400">
            {isLoading === true ? <LoadingTag /> :
                <>
                    <div className="relative w-full min-h-max max-h-[450px] overflow-x-auto overflow-y-auto">
                        <table className="relative border-collapse" {...rest}>
                            <thead>
                                <tr className="drop-shadow-lg sticky top-[0] z-10">
                                    {columns.map(col => (
                                        <th key={col.key} className="text-left px-3 border-b h-10 bg-prim-500 text-prim-50">{col.name}</th>
                                    ))}
                                    <th key={'actions'} className="text-center px-3 border-b h-10 bg-prim-500 text-prim-50">
                                        {actions.name}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPerformed.map(row => {
                                    return (
                                        <tr key={row.uuid} className="h-12 border-b-[1px] border-sec-100 bg-sec-50 even:contrast-125">
                                            {
                                                columns.map(col => {
                                                    const cellId = `${row.uuid}_${col.key}`
                                                    const key = col.key as keyof typeof row
                                                    return (
                                                        <td key={cellId} className="px-3">
                                                            {row[key]}
                                                        </td>
                                                    )
                                                })
                                            }
                                            {
                                                <td key={`${row.uuid}_actions`} className="text-center">
                                                    {actions.buttons.map(button => (
                                                        <IconButton key={`${row.uuid}_${button.name}`} {...button} />
                                                    ))}
                                                </td>
                                            }
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <footer className="sticky bottom-0 w-full py-2 bg-prim-700 text-white text-center">
                        <span>Total: <b>{data.length.toLocaleString('es-DO')}</b></span>
                    </footer>
                </>
            }

        </div>
    )
}