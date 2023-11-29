import { useEffect } from "react";

const DEFAULT_HEADER = {
    title: 'Gestion de Turnos',
    description: 'Sistema de gestion de turnos desarrollado para el INSTITUTO INTERNACIONAL DE LA VISION INVIS',
}

export const useSEO = (
    { title, description }:
        Partial<typeof DEFAULT_HEADER>
) => {

    useEffect(() => {
        document.title = title ?? DEFAULT_HEADER.title
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", description ?? DEFAULT_HEADER.description)
    }, [title, description])

}