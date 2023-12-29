import { customFieldStyle } from "../@types/components"
import { colors } from "../constants/colors"
import { DEFAULTS, customFieldFillStyle, customFieldSharpStyle } from "../constants/sharp.styles"

export const calculateStyle = (data: customFieldStyle): React.CSSProperties => {
    const sharp = data.sharp ?? DEFAULTS.SHARP
    const fill = data.fill ?? DEFAULTS.FILL

    const sharpStyle = customFieldSharpStyle[sharp]
    const fillStyle = customFieldFillStyle[fill]

    const {dark, light} = colors[data.color]

    fillStyle.backgroundColor = fill === 'filled' ? light : fillStyle.backgroundColor;
    fillStyle.borderColor = fill === 'border' ? dark : fillStyle.borderColor;
    fillStyle.color = dark;

    return {
        borderRadius: sharpStyle,
        ...fillStyle
    }
}