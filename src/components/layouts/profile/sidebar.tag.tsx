import { useState } from 'react';
import { useAuthHook } from '../../../hooks/auth.hook';
import { SettingsIcon, UsersIcon } from '../../../lib/icons/main.icons';
import { MenuIcon } from '../../../lib/icons/helper.icons';
import { useSessionStore } from '../../../store/profile.store';

enum PositionStyles {
    'top-left' = 'bottom-10 right-0 origin-bottom-right',
    'top' = 'bottom-10 -translate-x-[45%] origin-bottom',
    'top-right' = 'bottom-10 left-0 origin-bottom-left',

    'mid-left' = '-top-10 right-0 origin-right',
    'mid-right' = '-top-10 left-0 origin-left',

    'bottom-left' = 'top-10 right-0 origin-top-right',
    'bottom' = 'top-10 -translate-x-[45%] origin-top',
    'bottom-right' = 'top-10 left-0 origin-top-left',
}

type Props = {
    options?: {
        float?: {
            position?: keyof typeof PositionStyles
        }
    }
}

export const UserProfileTag = (props: Props) => {

    const [isProfileActive, setIsProfileActive] = useState(false)
    const { logout } = useAuthHook()

    const { user } = useSessionStore(state => state)

    const floatPosition = props.options?.float?.position ?? 'top-right'
    const menuStylePosition = PositionStyles[floatPosition]


    return (
        <article className='h-20 flex items-center pl-2'>
            <div className="w-full flex items-center gap-x-2">
                <picture className="flex flex-wrap justify-center content-center p-2 rounded-full bg-prim-600 text-white">
                    <UsersIcon size={18}/>
                </picture>
                <div>
                    <span className="block text-gray-700 text-sm font-semibold">
                        {user?.nombres ?? user?.username}
                    </span>
                    <span
                        className="block mt-px text-gray-600 text-xs"
                    >
                        {user?.rol?.nombre ?? user?.correo}
                    </span>
                </div>
                <div className="relative flex-1 text-right">
                    <button className={`relative p-1.5 rounded-md text-prim-500 hover:bg-prim-50 active:bg-prim-100 ${isProfileActive ? 'bg-prim-50' : ''}`}
                        onClick={() => setIsProfileActive(!isProfileActive)}
                    >
                        <MenuIcon />
                    </button>
                    <div className={`${isProfileActive ? 'scale-100' : 'scale-0 content-none'} ${menuStylePosition} absolute z-10 w-64 rounded-lg bg-white shadow-md border text-sm text-gray-600 transition-all transform-gpu`}>
                            <div className="p-2 text-left flex flex-col gap-2 [&>*]:border-b-2 [&>*]:border-prim-100 [&>*]:py-2 [&>*]:px-2 [&>*]:flex [&>*]:flex-row [&>*]:flex-wrap [&>*]:gap-3 [&>*]:items-center">
                                <button className='hover:bg-sec-50 transition-color' >
                                    <SettingsIcon />
                                    <span>Editar Perfil</span>
                                </button>

                                <button className='hover:bg-sec-50 transition-color' onClick={() => void logout()}>
                                    <span>Cerrar Sesion</span>
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </article>
    )
}