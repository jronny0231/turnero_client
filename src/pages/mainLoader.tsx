import { useAuth } from "../hooks/auth.hooks";
import { Rol, Agente } from "../services/utils/bussiness.const";
import Registry from "./Registry/Registry";
import PageNotFound from "../helpers/errorPages/pageNotFound";
import AdminPage from "./Admin/AdminPage";
import AttendPage from "./Servicing/AttendPage";
import ServicePage from "./Servicing/ServicePage";

export default function MainLoader(): JSX.Element {
    
    const MainPage = (): JSX.Element => {
        const { user, agent } = useAuth();

        if ( user ) {
            switch (user.rol.nombre) {
                case Rol.ADMIN:
                    return <AdminPage />;
                
                case Rol.AGENT:
                    if( agent ) {
                        switch(agent.tipo_agente.nombre){
                            case Agente.REG:
                                return <Registry />
    
                            case Agente.RECEP:
                                return <AttendPage />
    
                            case Agente.SERV: case Agente.DOC:
                                return <ServicePage />
                            
                            default:
                                return <PageNotFound
                                        title={`Acceso no autorizado para el agente ${agent.tipo_agente}`} />;
                        }
                    } else {
                        return <PageNotFound
                                title={`Acceso no autorizado para el usuario sin agente ${user.username}`} />;
                    }
                    

                default:
                    return <PageNotFound
                        title={`Acceso no autorizado para el perfil ${user?.rol.descripcion}`} />;
            }
        }
        return <PageNotFound title={`Acceso no autorizado`} />
    }
    
    return (
        <MainPage />
    )
}