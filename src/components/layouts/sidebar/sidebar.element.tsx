import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export type ElementProps = {
    name: string
    icon: JSX.Element
    href: string
    children?: Array<Omit<ElementProps, 'children'>>
}

export const SidebarElement = ({ props }: { props: ElementProps }) => {

    const [active, setActive] = useState<boolean>(false);
    const [childIsActived, setChildIsActived] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const location = useLocation();

    useEffect(() => {

        setActive(location.pathname === props.href)

        const hrefChildren = props.children?.map(el => el.href) ?? null

        if (hrefChildren !== null) {
            const isLocationChildActived = hrefChildren.includes(location.pathname)
            setIsExpanded(isLocationChildActived)
            setChildIsActived(isLocationChildActived)
        }

    }, [location.pathname, props.href, props.children])

    const handleExpandGroup = () => {
        setIsExpanded(!isExpanded)
    }

    const hasChild = props.children !== undefined ? true : false

    const activeStyle = active
        ? 'bg-prim-600 text-white hover:bg-prim-700'
        : 'text-prim-800 hover:bg-prim-300'
    return (

        <li>
            <div className={`${activeStyle} ${childIsActived ? 'bg-prim-200' : ''} h-12 transition-colors flex flex-row items-center justify-start`}>
                <Link to={props.href} className="px-2 w-full h-full flex flex-row justify-start items-center gap-x-3">
                    <span> {props.icon} </span>
                    <span className="text-md ">{props.name}</span>
                </Link>
                {hasChild && (
                    <button
                        onClick={handleExpandGroup}
                        className="w-6 h-full flex items-center justify-center text-center 
                                    hover:bg-slate-400 transition-colors">
                        <span className={`transition-transform ${isExpanded ? 'rotate-0' : '-rotate-90'}`}>
                            {"▼"}
                        </span>
                    </button>
                )}
            </div>
            {hasChild && (
                <ul className={`${isExpanded ? 'max-h-screen' : 'max-h-0'} overflow-hidden transition-[max-height] duration-500 transform-gpu flex flex-col bg-prim-200`}>
                    {props.children && props.children.map(el => (
                        <SidebarElement key={crypto.randomUUID()} props={el} />
                    ))}
                </ul>
            )}
        </li>

    )
}