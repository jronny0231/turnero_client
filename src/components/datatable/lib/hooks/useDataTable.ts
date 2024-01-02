import { useEffect, useState } from "react"
import { tableRow } from "../@types/components"
import { PerformedRowData } from "../components/helpers/rows.performed"
import { type StateType, type OptionType, type ColumnsType } from "../@types/main"
//import { useReactTable } from "@tanstack/react-table"

type Props<T> = {
    url: string
    columns: ColumnsType<T>
    options?: OptionType
}

export const useDataTable = <T>({ url, columns, options }: Props<T>): StateType => {

    const [data, setData] = useState<tableRow<T>[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasErrors, setHasErrors] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        setHasErrors(false)

        const loadData = async () => {
            setIsLoading(true)

            const raw = await fetch(url)
            const data: object[] = await raw.json()
            const performedData = []

            for (const row of data) {
                const performedRow = await PerformedRowData({
                    row,
                    customField: options?.customFields
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

    }, [options, url])

    return {
        columns,
        data,
        isLoading,
        hasErrors
    }
}