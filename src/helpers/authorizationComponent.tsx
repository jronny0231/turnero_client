import React from 'react'
import { UserData } from '../types'
import PageNotFound from './errorPages/pageNotFound';

export default function PathToAutenticatedComponent({user, path}: {user: UserData, path: string}): JSX.Element {
    
    const [component, setComponent] = React.useState<JSX.Element>(
        <PageNotFound title={`Acceso no autorizado para el perfil ${user?.rol.descripcion}`} />
    );

    return (
        <div>{user.rol.descripcion}</div>
    )
} 