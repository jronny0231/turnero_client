import { QueueIcon } from "../../lib/icons/app.icons";
import { HomeIcon, SettingsIcon, UsersIcon } from "../../lib/icons/main.icons";
import { Sidebar } from "./sidebar/sidebar";
import { ROUTES } from "../../lib/constants/app.constants";
import { useAuthHook } from "../../hooks/auth.hook"
import { Outlet, Navigate } from "react-router-dom";
import { ElementProps } from "./sidebar/sidebar.element";
import { UserProfileTag } from "./profile/sidebar.tag";

const sidebar: ElementProps[] = [
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
            }, {
                name: 'Roles',
                icon: <UsersIcon />,
                href: ROUTES.ROLS
            }, {
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
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
    },
    {
        name: 'Registro',
        icon: <QueueIcon />,
        href: ROUTES.REGISTRY
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
        <section className="grid max-h-screen w-full grid-layout_normal content-center gap-4">
            <header className="bg-prim-500 text-prim-50 grid-header pr-4 flex flex-row flex-nowrap items-center justify-end gap-x-8 select-none">
                <h1>Layout Pague for Agent User Type</h1>
                <span>{authed.nombres}</span>
            </header>
            <aside className="bg-sky-100 text-prim-700 px-2 grid-sidebar select-none flex flex-col justify-between">
                <section className="overflow-y-auto">
                    <Sidebar elements={sidebar} />
                </section>
                <section className="w-full py-3 border-prim-400 border-t-[1px] box-border">
                    <UserProfileTag />
                </section>
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

/*
const List = {
    [ROUTES.ADMIN]: {
        name: '',
        icon: 
    }
}

const sidebarList = (data: []) => {

}
*/