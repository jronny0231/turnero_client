import { z } from 'zod'
import * as msg from './utils/messages';

export const userSchema = z.object({
    nombres: z.string({ description: msg.type('STRING') }).min(1, msg.min(1)).max(50, msg.max(50)),
    correo: z.string({ description: msg.type('STRING') }).email(msg.email).max(60, msg.max(60)),
    username: z.string({ description: msg.type('STRING') }).min(3, msg.min(3)).max(15, msg.max(15))
        .regex(/^[a-zA-Z0-9_]+$/,
            "Debe contener solo letras, numeros y guion bajo"),
    password: z.string({ description: msg.type('STRING') }).min(8, msg.min(8)).max(80, msg.max(80))
        .regex(/^(?=.*[a-z]).+$/,
            "Debe contener al menos una letra en minusculas")

        .regex(/^(?=.*[A-Z]).+$/,
            "Debe contener al menos una letra en mayusculas")

        .regex(/^(?=.*[-+_!@#$%^&*., ?]).+$/,
            "Debe contener al menos un caracter especial")

        .regex(/^(?=.*\d).+$/,
            "Debe contener al menos un numero"),
    rol_id: z.number({ description: msg.type('NUMBER') }).gte(1, msg.min(1)),
    agente_id: z.coerce.number({ description: msg.type('NUMBER') }).gte(1, msg.min(1))
})

export const createUser = userSchema.partial({
    agente: true,
    agente_id: true,
}).omit({
    password: true
})

export const updateUser = userSchema.pick({
    username: true,
    correo: true,
    rol_id: true,
    agente: true
}).partial()

export const userCredential = userSchema.pick({
    username: true,
    password: true
})

export type userSchemaType = z.infer<typeof userSchema>
export type createUserType = z.infer<typeof createUser>
export type updateUserType = z.infer<typeof updateUser>
export type userCredentialType = z.infer<typeof userCredential>