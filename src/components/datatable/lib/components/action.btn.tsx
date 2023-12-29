import { actionBtn } from "../@types/components"


export const buttons: actionBtn = {
    name: 'Acciones',
    buttons: [
        {
            cback(e) {
                console.log(e.currentTarget.ariaLabel, e.currentTarget.getAttribute('data-index'))
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