import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Login, Logout, getAuthUser } from "../services/login.service";
import { AgentData, AuthContext, Credentials, Response, UserData } from "../types";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'
import { Env } from "../services/utils/axios.const";
import { useLocalStorage } from "./localStorage.hook";
import { getAuthAgent } from "../services/agents.data";

const SwalReact = withReactContent(Swal);

const AuthContext = createContext<AuthContext>({
    user: null,
    agent: null,
    login: (credentials: Credentials) => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: {children: JSX.Element}) => {
    
    const [token, setToken] = useLocalStorage(Env.LOCAL_TOKEN_KEY, null)
    const [user, setUser] = useLocalStorage(Env.LOCAL_USER_DATA, null)
    const [agent, setAgent] = useLocalStorage(Env.LOCAL_AGENT_DATA, null)
    
    const navigate = useNavigate();

    // Se carga primero que todo y carga las variables de estado segun el LocalStorage
    React.useEffect(() => {
        if (token === null) {
            setUser(null)
            setAgent(null)
            return
        }
        
        const promiseSetUserData = async () => {
            await updateUserAndAgentData()
        }

        promiseSetUserData()
    }, [])

    const updateUserAndAgentData = async () => {
        const userDataResp: Response<UserData|{message:string}> = await getAuthUser()
        const agentDataResp: Response<AgentData|{message:string}> = await getAuthAgent()
        
        if(userDataResp.success){
            setUser(userDataResp.data)
            agentDataResp.success && setAgent(agentDataResp.data)

        } else {
            SwalReact.fire({
                icon: 'error',
                title: 'Sesion cerrada',
                text: 'Su sesion ha sido cerrada automaticamente por inactividad',
                footer: userDataResp.message,
                timer: 5000
            })
            console.error({...userDataResp})
            setUser(null);

            return navigate("/login", {replace: true})
        }
    }

    // call this function when you want to authenticate the user
    const login = async (credentials: Credentials) => {
        
        const loginResp: Response<String> = await Login( credentials );

        if(loginResp.success && loginResp.success) {
            Swal.fire({
                icon: 'success',
                title: 'Login Successful',
                text: loginResp.message,
                timer: 5000
            })
            await updateUserAndAgentData()
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: loginResp.message,
                footer: loginResp.data,
                timer: 5000
            })
        }
        setToken(loginResp.data ?? null)

    };

    // call this function to sign out logged in user
    const logout = async () => {
        const resp: Response<string> = await Logout()
        if(resp.success){
            setToken(null)
            setUser(null)
            navigate("/login", {replace: true})
        } else {
            console.error({...resp})
            navigate("/", {replace: true})
        }
    };

    const value = useMemo(() => ({
        user,
        agent,
        login,
        logout
    }), [user]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    return useContext(AuthContext);
};