import { forwardRef } from "react"
import { DangerIcon, InfoIcon, SuccessIcon, WarningIcon } from "../../../lib/icons/helper.icons"

const RoleIcons = {
    info: {
        color: 'text-sky-800',
        icon: <InfoIcon />
    },
    success: {
        color: 'text-green-800',
        icon: <SuccessIcon />
    },
    warning: {
        color: 'text-yellow-800',
        icon: <WarningIcon />
    },
    danger: {
        color: 'text-rose-800',
        icon: <DangerIcon />
    }
}

export type ButtonType = {
    bussy?: boolean
    role: keyof typeof RoleIcons
    cback: (e: React.MouseEvent<HTMLButtonElement>) => void
    name: string
}

export const IconButton: React.FC<ButtonType> = forwardRef<HTMLButtonElement, ButtonType>(
    ({ bussy, role, cback, name, ...props }: ButtonType, ref) => {

        const LoadingIcon = () => {

            return (
                <p>{'l'}</p>
            )
        }

        const Icon = () => RoleIcons[role].icon
    

        return (
            <>
            <button
                ref={ref /* Pass ref */}
                className={`
                    w-7 aspect-[9/8] overflow-hidden
                    ${RoleIcons[role].color} hover:brightness-150 transition-all
                    text-inherit
                `}
                aria-label={name}
                data-tooltip-target={'tooltip-up'}
                type="button"
                disabled={bussy}
                onClick={cback}
                {...props}
            >
                {bussy ? <LoadingIcon /> : <Icon />}
            </button>
            </>
        )
    })
