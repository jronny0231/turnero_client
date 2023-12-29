import { customFieldProps } from "../@types/components";
import { calculateStyle } from "../helpers/calculate.styles";


export const CustomField = (props: customFieldProps) => {

    const {action, icon, matchWith} = props

    const tailwindStyles: React.HTMLAttributes<HTMLButtonElement>['className'] = `
        h-full w-fit p-2 gap-1
        flex flex-row flex-wrap
        item-center justify-center content-center text-center
        transition-all transform-gpu hover:contrast-[1.5] active:contrast-[1.2]
    `;
    const dynamicStyles = calculateStyle(props.style)

    const Children = () => {
        return (
            <>
                {icon &&
                    <span>
                        {icon}
                    </span>
                }
                <span className='font-semibold'>
                    {String(matchWith)}
                </span>
            </>
        )
    }

    // Returns the cell content to call back function
    const handleClick = () => {
        if (action && action.cback) {
            const {cback, value} = action
            cback(value)
        }
    }

    return (
        <>
            {action
                ? <button onClick={handleClick} className={tailwindStyles} style={dynamicStyles}>
                    <Children />
                </button>
                : <div className={tailwindStyles} style={dynamicStyles}>
                    <Children />
                </div>
            }
        </>
    )
}