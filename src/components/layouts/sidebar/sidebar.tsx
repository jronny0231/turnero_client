import { SidebarElement, type ElementProps } from "./sidebar.element"

type Props = {
    elements: ElementProps[]
}

export const Sidebar = ({ elements }: Props) => {

    

    return (
        <ul className="p-1 flex flex-col relative justify-start">
            {elements.map(el => (
                <SidebarElement key={crypto.randomUUID()} props={el} />
            ))}
        </ul>
    )
}

