import { useMemo, useState } from "react"
import { tableRow } from "../@types/components"
import { Props } from "../@types/main"
import { PerformedRowData } from "../components/helpers/rows.performed"

export const useDataTable = () => {

    const [props, setProps] = useState<Props | null>(null)
    const [data, setData] = useState<tableRow[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [hasErrors, setHasErrors] = useState<boolean>(false)

    useMemo(() => {
        setIsLoading(true)
        setHasErrors(false)

        if (props) {
            const loadData = async () => {
                setIsLoading(true)

                const raw = await fetch(props.getDataApi)
                const data: object[] = await raw.json()
                const performedData = []

                for (const row of data) {
                    const performedRow = await PerformedRowData({
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
        }



    }, [props])

    return {
        setProps,
        isLoading,
        data,
        hasErrors
    }
}