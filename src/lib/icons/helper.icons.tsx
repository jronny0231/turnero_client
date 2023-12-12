import { IconProps } from "../../@types/global"

export const SearchIcon = ({size = 24, strokeWidth = 1}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path strokeWidth={strokeWidth} fill="currentColor" d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5l-1.5 1.5l-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16A6.5 6.5 0 0 1 3 9.5A6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14S14 12 14 9.5S12 5 9.5 5Z" />
        </svg>
    )
}

export const MenuIcon = ({size = 24, strokeWidth = 1}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path strokeWidth={strokeWidth} fill="currentColor" fillRule="evenodd" d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Zm0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75Z" clipRule="evenodd"/>
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

export const SpinnerIcon = ({size = 24, strokeWidth = 1}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24">
            <path strokeWidth={strokeWidth} fill="currentColor"  d="M12 22c5.523 0 10-4.477 10-10h-3a7 7 0 0 1-7 7v3ZM2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7H2Z"/>
        </svg>
    )
}

export const FemaleIcon = ({size = 24, strokeWidth = 1}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 14 14">
            <path strokeWidth={strokeWidth} fill="currentColor" d="M7 1.5A3.25 3.25 0 1 0 7 8a3.25 3.25 0 0 0 0-6.5Zm4.75 3.25a4.751 4.751 0 0 1-4 4.691v1.309h.75a.75.75 0 0 1 0 1.5h-.75v1a.75.75 0 0 1-1.5 0v-1H5.5a.75.75 0 0 1 0-1.5h.75V9.441a4.751 4.751 0 1 1 5.5-4.691Z"/>
        </svg>
    )
}

export const MaleIcon = ({size = 24, strokeWidth = 1}: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 14 14">
            <path strokeWidth={strokeWidth} fill="currentColor" d="M8 .75A.75.75 0 0 1 8.75 0h4.5a.748.748 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V2.56L9.026 6.036a5 5 0 1 1-1.06-1.06l3.473-3.475H8.75A.75.75 0 0 1 8 .75Zm-.594 5.708a3.5 3.5 0 1 0 .135.135a.756.756 0 0 1-.135-.135Z"/>
        </svg>
    )
}