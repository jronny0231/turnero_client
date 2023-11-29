import { useAuthHook } from '../hooks/auth.hook'
import { useSEO } from '../hooks/useSEO'

export const Home = (): JSX.Element => {

    useSEO({})

    const { authed } = useAuthHook()

    return (
        <section>
            <h1>Main Page {authed?.correo}</h1>
        </section>
    )
}