export enum customFieldSharpStyle {
    rounded = '0.75rem',
    square = '0rem'
}

export const customFieldFillStyle = {
    filled: {
        backgroundColor: 'inherit',
        color: 'inherit',
        borderWidth: '0px',
        borderColor: 'inherit',
    },
    border: {
        backgroundColor: 'transparent',
        color: 'inherit',
        borderWidth: '2px',
        borderColor: 'inherit',
    }
}

type DefaultTypes = {
    SHARP: keyof typeof customFieldSharpStyle
    FILL: keyof typeof customFieldFillStyle
}

export const DEFAULTS: DefaultTypes = {
    SHARP: "rounded",
    FILL: "filled"
}