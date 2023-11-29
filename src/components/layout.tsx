import { SidebarElement } from "../@types/global";
import { QueueIcon } from "./icons/app.icons";
import { HomeIcon, SettingsIcon, UsersIcon } from "./icons/main.icons";
import { Sidebar } from "./utils/sidebar";
import { ROUTES } from "../constants/app.constants";
import { useAuthHook } from "../hooks/auth.hook"
import { Outlet, Navigate } from "react-router-dom";

const sidebar: SidebarElement[] = [
    {
        name: 'Inicio',
        icon: <HomeIcon />,
        href: ROUTES.MAIN
    },
    {
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
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    }
]

export const Layout = () => {

    const { authed } = useAuthHook()

    if (authed === null) return (<Navigate to={ROUTES.LOGIN} />)

    return (
        <section className="grid-layout_normal content-center gap-4">
            <header className="bg-prim-500 text-prim-50 grid-header pr-4 flex flex-row flex-nowrap items-center justify-end gap-x-8 select-none">
                <h1>Layout Pague for Agent User Type</h1>
                <span>{authed.nombres}</span>
            </header>
            <aside className="bg-sky-100 text-prim-700 grid-sidebar overflow-y-auto select-none">
                <Sidebar elements={sidebar} />
            </aside>
            <main className="bg-prim-50 text-prim-700 grid-main overflow-y-auto overflow-x-hidden">
                <Outlet />
            </main>
            <footer className="bg-emphasys-600 text-emphasys-50 grid-footer content-center text-center">
                Footer
            </footer>
        </section>
    )

}
