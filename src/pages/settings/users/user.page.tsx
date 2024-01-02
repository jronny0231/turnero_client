import { SearchIcon } from "../../../lib/icons/helper.icons"
import { UsersIcon } from "../../../lib/icons/main.icons"
import { DataTable } from "../../../components/datatable/data.table"
import { useSEO } from "../../../hooks/useSEO"
import { toast } from "sonner"
import { MainContainer } from "../../../components/container/main.container"
import { useState } from "react"
import { ModalContainer } from "../../../components/modal/modal.container"
import { useDataTable } from "../../../components/datatable/lib/hooks/useDataTable"
import { viewUserType } from "../../../helpers/schemas/user.schema"

/**
 * TODO's:
 * - Crear hooks en el DataTable que permitan setear las propiedades
 * - Usar tipado para las propiedades de las tablas y retornarlas en las funciones de los botones
 * - Terminar de implementar TansTak Query en la tabla con paginado en el footer del DataTable
 */

/**
 * id: number;
    nombres: string;
    correo: string;
    username: string;
    rol_id: number;
    agente_id: number;
 */

export const UsersList = (): JSX.Element => {

    useSEO({ title: 'Lista de Usuarios' })
    const [openModal, setOpenModal] = useState(false)


    const state = useDataTable<viewUserType>({
        url: "../../data/MOCK_DATA.json",
        
        columns: [
            { key: 'id', name: 'ID' },
            { key: 'nombres', name: 'NOMBRE'},
            { key: 'correo', name: 'CORREO'},
            { key: 'rol_id', name: 'ID ROL'},
            { key: 'agente_id', name: 'ID AGENTE'}
        ],
        
        options: {
            customFields: [
                {
                    key: 'id',
                    onClick: (content) => {
                        const row = content as {
                            id: number, first_name: string, last_name: string, email: string, gender: string, job: string
                        }
                        const ListNode = () => {
                            return (
                                <ol type="A">
                                    <li>{row.id}</li>
                                    <li>{row.first_name}</li>
                                    <li>{row.last_name}</li>
                                    <li>{row.email}</li>
                                    <li>{row.gender}</li>
                                    <li>{row.job}</li>
                                </ol>
                            )
                        }
                        toast.success('Usuario', {
                            description: <ListNode />
                        })
                    },
                    statusStyle: [{
                        style: { color: 'primary', fill: 'filled' },
                        matchWith: "*"
                    }]
                },
                {
                    key: 'gender',
                    statusStyle: [
                        {
                            style: { color: 'secundary', fill: 'border' },
                            matchWith: /[ale]$/i
                        }
                    ]
                }
            ]
        }
    })



    return (
        <MainContainer title="Lista de Usuarios" icon={UsersIcon}>
            <search className="flex flex-row items-center justify-end gap-x-3 w-full py-3 px-3 bg-emphasys-100">
                <SearchIcon />
                <button onClick={() => { setOpenModal(true) }} className="py-2 px-3 bg-prim-900 text-white hover:bg-prim-800 transition-colors">
                    Adicionar
                </button>
            </search>
            <ModalContainer setClose={setOpenModal} open={openModal}>
                <p>Hola soy un modal</p>
            </ModalContainer>
            <DataTable state={state} />
        </MainContainer>
    )
}