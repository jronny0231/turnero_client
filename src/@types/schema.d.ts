import { agentSchemaType } from '../helpers/schemas/agent.schema'
import { departmentSchemaType } from '../helpers/schemas/department.schema'
import { officeSchemaType } from '../helpers/schemas/office.schema'
import { userSchemaType } from '../helpers/schemas/user.schema'

export interface UserData extends Omit<userSchemaType, 'password' | 'rol_id' | 'agente_id'> {
    id: number,
    type?: 'USER' | 'SUPER'
    activo: boolean,
    createdAt: Date,
    rol: {
        id: number,
        nombre: string,
        descripcion: string,
        activo: boolean
    }
}

export interface AgentData extends Partial<agentSchemaType> {
    departamento: Partial<departmentSchemaType>
    sucursal: Partial<officeSchemaType>
}

export type AuthedContext = {
    user: UserData | null
    agent: AgentData | null
}

export type UserPermissions = {
    id: number
    nombre: string
    descripcion: string
    slug: string
    parent_id?: number
    can: {
        create?: boolean
        read?: boolean
        update?: boolean
        delete?: boolean
    }
}