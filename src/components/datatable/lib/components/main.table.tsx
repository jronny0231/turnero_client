import { IconButton } from "../../../shared/buttons/icon.button"
import { tableProps } from "../@types/components"

export const SimpleTable = ({columns, data, actions, ...rest}: tableProps) => {

    return (
        <div className="w-full min-h-max max-h-[450px] overflow-x-auto overflow-y-auto">
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
                    {data.map(row => {
                        return (
                            <tr data-uuid={row.uuid} key={row.uuid} className="h-12 border-b-[1px] border-sec-100 bg-sec-50 even:contrast-125">
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
                                    <td key={`${row.uuid}_actions`} className="h-14 flex flex-row flex-wrap justify-center content-center text-center">
                                        {actions.buttons.map(button => (
                                            <IconButton data-index={row.uuid} key={`${row.uuid}_${button.name}`} {...button} />
                                        ))}
                                    </td>
                                }
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}