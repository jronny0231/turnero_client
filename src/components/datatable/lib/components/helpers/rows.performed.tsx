import { type customFieldType, type tableRow, type statusStyle } from "../../@types/components"
import { CustomField } from "../custom.element"

export const PerformedRowData = async ({ row, customField }: { row: object, customField?: customFieldType[] }):
    Promise<tableRow> => {

    return new Promise((res) => {
        const uuid = crypto.randomUUID()

        if (customField) {
            const newRow: { [key: string]: unknown } = structuredClone(row) as { [key: string]: unknown }

            customField.forEach(custom => {
                const key = custom.key as keyof typeof newRow
                const rowValue = String(newRow[key]);

                custom.statusStyle.forEach(customStatus => {
                    const condValue = customStatus.matchWith
                    const styledField = <CustomField
                        matchWith={rowValue}
                        style={customStatus.style}
                        icon={customStatus.icon}
                        action={custom.onClick ? { cback: custom.onClick, value: row} : undefined}
                    />

                    newRow[key] = conditionalStylish({rowValue, condValue, styledField})
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

type ConditionalType = {
    rowValue: string
    condValue: statusStyle['matchWith']
    styledField: JSX.Element
}

const conditionalStylish = ({rowValue, condValue, styledField}: ConditionalType) => {

    if (condValue === "*") {
        return styledField
    }

    if (condValue === rowValue) {
        return styledField
    }

    if (condValue instanceof RegExp) {
        if (condValue.test(rowValue)) {
            return styledField
        }
    }

    // TODO: Add some match value using regex to include:
    // less than, more than, between, startWith, endWith, contains, etc.

    return rowValue
}