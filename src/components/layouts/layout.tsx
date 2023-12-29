import { QueueIcon } from "../../lib/icons/app.icons";
import { HomeIcon, SettingsIcon, UsersIcon } from "../../lib/icons/main.icons";
import { Sidebar } from "./sidebar/sidebar";
import { ROUTES } from "../../lib/constants/app.constants";
import { Outlet, Link, useLocation } from "react-router-dom";
import { ElementProps } from "./sidebar/sidebar.element";
import { UserProfileTag } from "./profile/sidebar.tag";
import { useAccountStore } from "../../store/profile.store";
import { useEffect, useState } from "react";

const sidebar: ElementProps[] = [
    {
        name: 'Inicio',
        icon: <HomeIcon />,
        href: ROUTES.MAIN
    },{
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },{
        name: 'Ajustes',
        icon: <SettingsIcon />,
        href: ROUTES.ADMIN,
        children: [
            {
                name: 'Usuarios',
                icon: <UsersIcon />,
                href: ROUTES.USERS
            },{
                name: 'Roles',
                icon: <UsersIcon />,
                href: ROUTES.ROLS
            },{
                name: 'Sistema',
                icon: <UsersIcon />,
                href: ROUTES.SYS
            }
        ]
    }
]

export const Layout = () => {

    const { agent } = useAccountStore(store => store)
    const [title, setTitle] = useState<string>()
    const location = useLocation()

    useEffect(() => {
        let title = location.pathname.slice(1)
        title = title === "" ? "home" : title.replace(/[/]/gi," / ")

        setTitle(title)
    }, [location])

    return (
        <section className="grid min-h-screen w-full grid-full_aside_layout content-center gap-2">
            
            <header className="grid-header bg-prim-500 text-prim-50 pr-4 flex flex-row flex-nowrap items-center justify-end gap-x-8 select-none">
                <h1>{title}</h1>
                <span>{agent?.nombre ?? ''}</span>
            </header>

            <aside className="grid-sidebar bg-transparent text-prim-700 select-none px-2 flex flex-col justify-between max-w-[200px]">
                <header className="w-full py-3 border-prim-400 border-b-[1px] box-border">
                    <Link to={'/'} >
                        <img src="/brand.png" alt="Brand Logo" className="w-full" />
                    </Link>
                </header>
                <section className="h-full w-full overflow-y-auto overflow-x-hidden">
                    <Sidebar elements={sidebar} />
                </section>
                <footer className="w-full py-3 border-prim-400 border-t-[1px] box-border">
                    <UserProfileTag />
                </footer>
            </aside>

            <main className="grid-main bg-prim-50 text-prim-700 overflow-y-auto overflow-x-hidden">
                <Outlet />
            </main>

            <footer className="grid-footer bg-emphasys-600 text-emphasys-50 content-center text-center">
                Footer
            </footer>

        </section>
    )
}