const valueType = {
    STRING: "una cadena de texto valida",
    NUMBER: "un numero valido"
}

export const type = (type: keyof typeof valueType) =>  `Debe ser ${valueType[type]}`;

export const min = (value: number) => `Debe ser un valor mayor que ${value}`;

export const max = (value: number) => `Debe ser un valor menor que ${value}`;

export const email = 'El email no esta formado correctamente';