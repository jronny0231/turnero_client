import { useState, useEffect } from 'react';
import { SearchIcon } from "../components/icons/helper.icons"
import { UsersIcon } from "../components/icons/main.icons"
import { type TableType, DataTable } from "../components/mid/data.table"
import { MainHeader } from "../components/mid/main.header"
import { useSEO } from "../hooks/useSEO"
import data from "../../data/MOCK_DATA.json"

const columns: TableType['columns'] = [
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
        key: 'country',
        name: 'CIUDAD',
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

export const UsersList = (): JSX.Element => {

    useSEO({ title: 'Lista de Usuarios' })

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 100)
    }, [])


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
                <DataTable columns={columns} data={data} actions={buttons} isLoading={isLoading} />
            </section>
        </section>
    )
}