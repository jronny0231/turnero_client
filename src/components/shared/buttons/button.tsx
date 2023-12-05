import { forwardRef } from "react"
import { SpinnerIcon } from "../../../lib/icons/helper.icons"

type ButtonType = {
    bussy?: boolean
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
    children: React.ReactNode
}

export const Button: React.FC<ButtonType> = forwardRef<HTMLButtonElement, ButtonType>(
    ({ bussy, type, children, ...props }: ButtonType, ref) => {

        const condClass: React.HTMLAttributes<HTMLButtonElement>['className'] = `
        ${type === 'reset' ? ' bg-emphasys-50 text-prim-500 ' : ' bg-prim-500 text-emphasys-50 '}
    `
        const LoadingTag = () => {
            return (
                <div className="flex flex-row justify-center items-center gap-4">
                    <span className="animate-spin">
                        <SpinnerIcon />
                    </span>
                    <p>Cargando...</p>
                </div>
            )
        }

        return (
            <button
                ref={ref /* Pass ref */}
                className={"w-full py-3 px-2 border-1 rounded-2 uppercase font-sans text-xs font-semibold " + condClass}
                type={type}
                disabled={bussy}
                {...props}
            >
                {bussy ? <LoadingTag />  : children}
            </button>
        )
    })