import { FemaleIcon, MaleIcon, SearchIcon } from "../../lib/icons/helper.icons"
import { UsersIcon } from "../../lib/icons/main.icons"
import { DataTable, type Props } from "../../components/datatable/data.table"
import { MainHeader } from "../../components/header/main.header"
import { useSEO } from "../../hooks/useSEO"
import { toast } from "sonner"

const columns: Props['columns'] = [
    {
        key: 'id',
        name: 'ID',
    }, {
        key: 'first_name',
        name: 'NOMBRE',
    }, {
        key: 'last_name',
        name: 'APELLIDO',
    }, {
        key: 'email',
        name: 'CORREO',
    }, {
        key: 'gender',
        name: 'GENERO',
    }, {
        key: 'job',
        name: 'PROFESION',
    }
]

export const UsersList = (): JSX.Element => {

    useSEO({ title: 'Lista de Usuarios' })

    const option: Props['options']  = {
        customFields: [
            {
                key: 'gender',
                onClick: (data) => {
                    toast.success('Usuario', {
                        description: JSON.stringify(data)
                    })
                },
                statusStyle: [
                    {
                        style: { color: 'pink' },
                        value: 'Female',
                        icon: <FemaleIcon />
                    },{
                        style: { color: 'blue' },
                        value: 'Male',
                        icon: <MaleIcon />
                    },{
                        style: { color: 'green' },
                        value: 'Genderqueer'
                    }
                    
                ]
            }
        ]
    }

    return (
        <section className="w-full py-4 px-3 flex flex-col gap-y-7 justify-items-center items-start">
            <MainHeader title="Lista de Usuarios" icon={UsersIcon} />
            <section className="bg-prim-100 flex flex-col p-4 gap-y-4 w-full items-center justify-items-center antialiased">
                <search className="flex flex-row items-center justify-end gap-x-3 w-full py-3 px-3 bg-emphasys-100">
                    <SearchIcon />
                    <button className="py-2 px-3 bg-prim-900 text-white hover:bg-prim-800 transition-colors">
                        Adicionar
                    </button>
                </search>
                <DataTable getDataApi="../../data/MOCK_DATA.json" columns={columns} options={option} />
            </section>
        </section>
    )
}