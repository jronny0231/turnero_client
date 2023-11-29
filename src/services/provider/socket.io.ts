import { io } from 'socket.io-client';
import { BASE_SOCKET } from '../../constants/api.constants';

export const init = (token: string) => {
    try {
        const socket = io(BASE_SOCKET, { auth: { token } })

        return socket
        
    } catch (error) {
        console.error('Socket error: ', error)
    }
}