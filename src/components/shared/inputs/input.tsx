import { useState, forwardRef } from "react"

type InputTextFieldType = {
    title: string
    name: string
    placeholder?: string
    validations?: string[]
}

const RulesPopup = ({ rules }: { rules: InputTextFieldType['validations'] }) => {
    if (rules !== undefined && rules.length > 0) {
        return (
            <ul className="ms-6 list-disc text-red-800 font-semibold text-sm tracking-wide">
                {rules.map((rule, i) => (
                    <li key={`${i}_${rule}`}>{rule}</li>
                ))}
            </ul>
        )
    }
    return undefined
}

export const InputText: React.FC<InputTextFieldType> = forwardRef<HTMLInputElement, InputTextFieldType>(({
    title, name, validations, placeholder, ...props
}: InputTextFieldType, ref) => {

    return (
        <div className="flex flex-col my-4">
            <label
                className="font-semibold text-slate-600 tracking-widest"
                htmlFor={name}>
                {title}
            </label>
            <input
                ref={ref /* Pass ref */}
                className="border-2 border-sec bg-slate-100 drop-shadow-lg shadow-sec_contrast rounded-ee-2xl mb-5 p-2"
                id={name}
                name={name}
                type="text"
                placeholder={placeholder} 
                {...props} />
            <RulesPopup rules={validations} />
        </div>
    )
})

interface InputPasswordType extends InputTextFieldType {

}

export const InputPassword: React.FC<InputPasswordType> = forwardRef<HTMLInputElement, InputPasswordType>(({
    title, name, validations, placeholder, ...props
}: InputPasswordType, ref) => {

    const [isVisible, setIsVisible] = useState<boolean>(false)

    const handleToggle = () => {
        setIsVisible(!isVisible)
    }

    return (
        <div className="flex flex-col my-4">
            <label
                className="font-semibold text-slate-600 tracking-widest"
                htmlFor={name}>
                {title}
            </label>
            <div className="relative w-full">
                <input
                    ref={ref /* Pass ref */}
                    className="appearance-none w-full py-3 px-3 pr-20 leading-tight border-2 border-sec bg-slate-100 drop-shadow-lg shadow-sec_contrast rounded-ee-2xl"
                    id={name}
                    name={name}
                    type={isVisible ? 'text' : 'password'}
                    autoComplete="off"
                    placeholder={placeholder}
                    {...props} />
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <a
                        className="bg-gray-300 hover:bg-gray-400 rounded-sm px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer rounded-ee-2xl"
                        onClick={handleToggle} >
                        {isVisible ? 'ocultar' : 'mostrar'}
                    </a>
                </div>
            </div>
            <RulesPopup rules={validations} />
        </div>
    )
})