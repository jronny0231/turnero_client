const HOST: string = 'http://localhost';
const PORT: number = 5000;

export const Api = {

    HOST,
    PORT,
    BASEURL: HOST + ":" + PORT,
    BASEAPI: HOST + ":" + PORT + "/api" 
}

export const Env = {

    LOCAL_TOKEN_KEY: "accessToken",
    LOCAL_USER_DATA: "user",
    LOCAL_AGENT_DATA: "agente"

}

export const Path = {

    LOGIN: '/auth/login',
    NEW_TOKEN: '/auth/refreshToken',
    PROFILE: '/auth/profile',
    LOGGED_USER_AGENT: '/auth/agent',
    LOGGED_USER_PERMISSIONS: 'auth/permissions',
    LOGOUT: '/auth/logout',

    SERVICES: '/services',
    GROUP_SERVICES: '/services/groups',
    SERVICES_BY_GROUP: '/services/groups/#/selectable-services',

    QUEUES: '/queues',
}

