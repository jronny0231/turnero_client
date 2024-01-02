import { ButtonType } from "../../../shared/buttons/icon.button"
import { colors } from "../constants/colors"
import { customFieldFillStyle, customFieldSharpStyle } from "../constants/sharp.styles"

export type customFieldStyle = {
    color: keyof typeof colors
    sharp?: keyof typeof customFieldSharpStyle
    fill?: keyof typeof customFieldFillStyle
}

export type statusStyle = {
    icon?: JSX.Element
    style: customFieldStyle
    matchWith: string | RegExp
}

export type customFieldType = {
    key: string
    statusStyle: statusStyle[]
    type?: customFieldStyle
    onClick?: (data: object) => void
}

export interface customFieldProps extends statusStyle {
    action?: {
        cback: customFieldType['onClick']
        value: object
    }
}

export interface tableRow<T> extends T {
    uuid: `${string}-${string}-${string}-${string}-${string}`
    
}

export type actionBtn = {
    name: string
    buttons: ButtonType[]
}

type HTMLTableType = JSX.IntrinsicElements["table"]

export interface tableProps extends HTMLTableType {
    columns: {
        key: string
        name: string
    }[]
    data: tableRow[]
    actions: actionBtn
}