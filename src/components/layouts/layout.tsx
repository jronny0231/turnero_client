import { QueueIcon } from "../../lib/icons/app.icons";
import { HomeIcon, SettingsIcon, UsersIcon } from "../../lib/icons/main.icons";
import { Sidebar } from "./sidebar/sidebar";
import { ROUTES } from "../../lib/constants/app.constants";
import { Outlet, Link } from "react-router-dom";
import { ElementProps } from "./sidebar/sidebar.element";
import { UserProfileTag } from "./profile/sidebar.tag";

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

    return (
        <section className="grid min-h-screen w-full grid-full_aside_layout content-center gap-2">
            <header className="bg-prim-500 text-prim-50 grid-header pr-4 flex flex-row flex-nowrap items-center justify-end gap-x-8 select-none">
                <h1>Layout Pague for Agent User Type</h1>
                <span>Nombre de usuario</span>
            </header>
            <aside className="bg-sky-100 text-prim-700 grid-sidebar select-none px-2 flex flex-col justify-between max-w-[200px]">
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