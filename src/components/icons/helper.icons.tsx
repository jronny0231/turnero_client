import { IconProps } from "../../@types/global"

export const SearchIcon = ({size = 24, strokeWidth = 1}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path strokeWidth={strokeWidth} fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z" />
        </svg>
    )
}

export const InfoIcon = ({size = 24, strokeWidth = 1}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path strokeWidth={strokeWidth} fill="currentColor" d="M11 17h2v-6h-2v6Zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/>
        </svg>
    )
}

export const SuccessIcon = ({size = 24, strokeWidth = 1}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path strokeWidth={strokeWidth} fill="currentColor" d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"/>
        </svg>
    )
}

export const WarningIcon = ({size = 24, strokeWidth = 1}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path strokeWidth={strokeWidth} fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24Zm-8 56a8 8 0 0 1 16 0v56a8 8 0 0 1-16 0Zm8 104a12 12 0 1 1 12-12a12 12 0 0 1-12 12Z"/>
        </svg>
    )
}

export const DangerIcon = ({size = 24, strokeWidth = 1}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path strokeWidth={strokeWidth} fill="currentColor"  d="M9.075 21q-.4 0-.762-.15t-.638-.425l-4.1-4.1q-.275-.275-.425-.638T3 14.925v-5.85q0-.4.15-.762t.425-.638l4.1-4.1q.275-.275.638-.425T9.075 3h5.85q.4 0 .763.15t.637.425l4.1 4.1q.275.275.425.638t.15.762v5.85q0 .4-.15.763t-.425.637l-4.1 4.1q-.275.275-.638.425t-.762.15h-5.85ZM12 13.4l2.15 2.15q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.15-2.15q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.85 8.45q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7L10.6 12l-2.15 2.15q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275L12 13.4Z"/>
        </svg>
    )
}