import { IconProps } from "../../@types/global"



type HeaderProps = {
    title: string
    icon: (arg: IconProps) => JSX.Element
}

export const MainHeader = (props: HeaderProps) => {

    const Icon = () => {
        return props.icon({strokeWidth: 1.5, size: 36})
    }

    return (
        <header className="px-8 py-4 w-full bg-prim-100 flex flex-row gap-x-4 items-center flex-wrap align-middle select-none">
            <Icon />
            <h1 className="text-prim-600 text-2xl text-center">{props.title}</h1>
        </header>
    )
}