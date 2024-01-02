import { customFieldType } from "./components"

export type ColumnsType<T> = Array<{
    key: keyof T,
    name: string,
}>

export type OptionType = {
    customFields: customFieldType[]

} | undefined

export type StateType = {
    columns: ColumnsType
    data: tableRow[]
    isLoading: boolean
    hasErrors: boolean
}