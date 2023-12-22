export const fakeData = () => {
    const token = 'fake_token'

    const userData = {
        id: 1,
        nombres: 'Faker User',
        username: 'fakeruser',
        activo: true,
        correo: 'fake@user.com',
        createdAt: new Date(),
        rol: {
            id: 1,
            activo: true,
            nombre: 'Administrador',
            descripcion: 'Administra recursos'
        },
        type: 'USER'
    }

    const permissionsData = [
        {
            id: 1,
            slug: '/admin',
            nombre: 'Administracion',
            can: { create: false, read: true, update: false, delete: false, }
        },
        {
            id: 2,
            slug: '/users',
            nombre: 'Usuarios',
            parent_id: 1,
            can: { create: true, read: true, update: true, delete: true, }
        },
        {
            id: 3,
            slug: '/queues',
            nombre: 'Turnos',
            can: { create: true, read: true, update: true, delete: true, }
        },
        {
            id: 4,
            slug: '/profile',
            nombre: 'Perfil',
            can: { create: false, read: true, update: true, delete: false, }
        }
    ]

    return {
        token, userData, permissionsData
    }
}