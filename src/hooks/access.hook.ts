import { UserPermissions } from "../@types/schema"
import { ErrorPage } from "../pages/helper/error.page"
import { usePermissionsStore } from "../store/profile.store"

export const useAccessControl = () => {

    const { can } = usePermissionsStore(state => state)

    const canView = (slug: UserPermissions['slug'], component: JSX.Element): JSX.Element => {

        if ( can({make: 'read', slug}) ) return component

        return ErrorPage({type: 'FORBIDDEN'})
    }

    const canCreate = (slug: UserPermissions['slug'], component: JSX.Element): JSX.Element => {

        if ( can({make: 'create', slug}) ) return component

        return ErrorPage({type: 'FORBIDDEN'})
    }

    const canUpdate = (slug: UserPermissions['slug'], component: JSX.Element): JSX.Element => {

        if ( can({make: 'update', slug}) ) return component

        return ErrorPage({type: 'FORBIDDEN'})
    }

    const canDelete = (slug: UserPermissions['slug'], component: JSX.Element): JSX.Element => {

        if ( can({make: 'delete', slug}) ) return component

        return ErrorPage({type: 'FORBIDDEN'})
    }


    return {
        canView,
        canCreate,
        canUpdate,
        canDelete
    }
}