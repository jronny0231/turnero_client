export const PROTOCOL = 'http';
export const HOST = 'localhost';
export const PORT = '5000';
export const SOCKET_PORT = '5050';
export const API_VERSION = '1.0.0';

export const BASE_HOST = `${PROTOCOL}://${HOST}:${PORT}`;
export const BASE_SOCKET = `${PROTOCOL}://${HOST}:${SOCKET_PORT}`;

export const BASE_API = `${BASE_HOST}/api/v${API_VERSION}`;



export const LOCAL_TOKEN_KEY = 'TOKEN_KEY';

export const PATH_URI = {
    LOGIN: '/auth/login',
    NEW_TOKEN: '/auth/refreshToken',
    PROFILE: '/auth/profile',
    LOGGED_USER_AGENT: '/auth/agent',
    LOGGED_USER_PERMISSIONS: 'auth/permissions',
    LOGOUT: '/auth/logout',

    SERVICES: '/services',
    GROUP_SERVICES: '/services/selectable-groups',
    SERVICES_BY_GROUP: '/services/groups/#/selectable-services',

    QUEUES: '/queues',
    NEW_QUEUES: '/queues/new', // Accept incoming new queues to current user agent
    CURRENT_QUEUES: '/queues/current', // Get current queue assigned to current user agents
}