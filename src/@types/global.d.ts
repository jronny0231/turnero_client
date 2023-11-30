import { AxiosError, AxiosResponse } from 'axios'

export type mainStoreType = {
    user: UserData | null
    agent: object | null
    permissions: UserPermissions[]
}

export interface CustomAxiosError extends AxiosError<unknown, T> {
	response: CustomAxiosResponse;
}

export interface CustomAxiosResponse extends AxiosResponse {
	data: CustomAxiosResponseData
}

export type CustomAxiosResponseData = {
    message?: string,
    code?: number
}

export type Credentials = {
    username: FormDataEntryValue,
    password: FormDataEntryValue
}

export type Response <type> = {
    success: boolean,
    message?: string,
    data: type
}

export type UserData = {
    id: number,
    type?: 'USER' | 'SUPER'
    nombres: string,
    correo: string,
    username: string,
    activo: boolean,
    createdAt: Date,
    rol: {
        id: number,
        nombre: string,
        descripcion: string,
        activo: boolean
    }
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

export interface SessionPermissionsData extends Pick<UserPermissions, 'id' | 'slug' | 'can' | 'nombre' | 'parent_id'> {}

export type IconProps = {
    strokeWidth?: number | undefined;
    size?: number | undefined;
}