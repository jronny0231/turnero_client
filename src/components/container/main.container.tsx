import { IconProps } from "../../@types/global"
import { MainHeader } from "../header/main.header"

type Props = {
    children?: React.ReactNode
    title: string
    icon: (arg: IconProps) => JSX.Element
}

export const MainContainer = ({ children, title, icon }: Props) => {

    return (
        <section className="w-full py-4 px-3 flex flex-col gap-y-7 justify-items-center items-start">
            <MainHeader title={title} icon={icon} />
            {children &&
                <section className="bg-prim-100 flex flex-col p-4 gap-y-4 w-full items-center justify-items-center antialiased">
                    {children}
                </section>
            }
        </section>
    )

}