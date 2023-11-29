import { SearchIcon } from "../components/icons/helper.icons"
import { UsersIcon } from "../components/icons/main.icons"
import { type TableType, DataTable } from "../components/mid/data.table"
import { MainHeader } from "../components/mid/main.header"
import { TansTable } from "../components/mid/tanstable"
import { useSEO } from "../hooks/useSEO"

export const UsersList = (): JSX.Element => {

    useSEO({ title: 'Lista de Usuarios' })

    const columns: TableType['columns'] = [
        {
            key: 'id',
            name: 'ID',
            type: 'number'
        },{
            key: 'name',
            name: 'NOMBRE',
            type: 'string'
        },{
            key: 'username',
            name: 'NOMBRE DE USUARIO',
            type: 'string'
        },{
            key: 'rol',
            name: 'ROL',
            type: 'string'
        },{
            key: 'status',
            name: 'ESTADO',
            type: 'string'
        }
    ]

    const data = [
        {
            id: 1,
            name: 'Nikii de los Santos',
            username: 'Nikii0131',
            rol: 'Administrador',
            status: 'activo'
        },{
            id: 2,
            name: 'Ronny Martinez',
            username: 'Rmartinez0231',
            rol: 'Agente de Servicios',
            status: 'activo'
        },{
            id: 3,
            name: 'Pedro Escamosa',
            username: 'Pete2345',
            rol: 'Agente de Servicios',
            status: 'activo'
        },{
            id: 4,
            name: 'Juan Pablo Duarte',
            username: 'Liberty1844',
            rol: 'Analista',
            status: 'inactivo'
        },{
            id: 5,
            name: 'Scarlett Johanson',
            username: 'Viuda0101',
            rol: 'Soporte TI',
            status: 'activo'
        }
    ]

    const buttons: TableType['actions'] = {
        name: 'Acciones',
        buttons: [
            {
                cback(e) {
                    console.log(e.currentTarget.ariaLabel)
                },
                name: 'Editar',
                role: 'success',
                bussy: false
            },
            {
                cback(e) {
                    console.log(e.currentTarget.ariaLabel)
                },
                name: 'Eliminar',
                role: 'danger',
                bussy: false
            }
        ]
    }

    return (
        <section className="w-full py-4 px-3 flex flex-col gap-y-7 justify-items-center items-start">
            <MainHeader title="Lista de Usuarios" icon={UsersIcon} />
            <section className="bg-prim-100 flex flex-col p-4 gap-y-4 w-full items-center justify-items-center antialiased">
                <search className="w-full py-3 px-2 flex flex-row gap-x-3 bg-emphasys-100">
                    <SearchIcon />
                    <button className="py-2 px-3 bg-prim-900 text-white hover:bg-prim-800 transition-colors">
                        Adicionar
                    </button>
                </search>
                <DataTable columns={columns} data={data} actions={buttons} className={'min-w-full bg-sec-100'}/>
                <TansTable data={data} />
            </section>
        </section>
    )
}