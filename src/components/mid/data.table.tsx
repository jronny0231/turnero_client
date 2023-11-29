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
        <table {...rest}>
            <thead>
                <tr className="border-b">
                    {columns.map(col => (
                        <th key={col.key} className="text-left">{col.name}</th>
                    ))}
                    <th className="text-center">
                        {actions.name}
                    </th>
                </tr>
            </thead>
            <tbody>
                {dataPerformed.map(row => {
                    return (
                        <tr key={row.uuid}>
                            {
                                columns.map(col => {
                                    const cellId = `${row.uuid}_${col.key}`
                                    const key = col.key as keyof typeof row
                                    return (  <td key={cellId}>{row[key]}</td>)
                                })
                            }
                            {
                                <td key={`${row.uuid}_actions`} className="flex flex-wrap gap-3 justify-center content-center items-center">
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
    )
}