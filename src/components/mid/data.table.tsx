import { ButtonType, IconButton } from "../low/icon.button"

type HTMLTableType = JSX.IntrinsicElements["table"]
export interface TableType extends HTMLTableType {
    columns: {
        key: string
        name: string
        type: 'string' | 'number' | 'date' | 'image' | 'component'
    }[]
    data: object[]
    actions: {
        name: string
        buttons: ButtonType[]
    }
}

export const DataTable = ({ columns, data, actions, ...rest }: TableType) => {

    const dataPerformed = data.map(row => ({
        uuid: crypto.randomUUID(),
        ...row
    }))


    return (
        <div className="overflow-auto w-full min-h-max max-h-64 shadow-prim-200 shadow-lg border-prim-400">
            <table {...rest}>
                <thead>
                    <tr className="border-b h-10 bg-prim-500 text-prim-50 sticky top-0">
                        {columns.map(col => (
                            <th key={col.key} className="text-left px-3">{col.name}</th>
                        ))}
                        <th className="text-center px-3">
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
                                    <td key={`${row.uuid}_actions`} className="flex flex-nowrap gap-3 justify-center content-center items-center">
                                        {actions.buttons.map(button => (
                                            <IconButton key={`${row.uuid}_${button.name}`} {...button} />
                                        ))}
                                    </td>
                                }
                            </tr>
                        )
                    })}
                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div>
    )
}