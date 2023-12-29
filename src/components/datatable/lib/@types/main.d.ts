import { TableProps } from "../components/main.table"
import { customFieldType } from "./components"

export export type Props = {
    columns: TableProps['columns']
    getDataApi: string
    options?: {
        customFields: customFieldType[]
    }
}