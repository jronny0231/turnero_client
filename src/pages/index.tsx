import { useSEO } from '../hooks/useSEO'

export const Home = (): JSX.Element => {

    useSEO({})

    return (
        <section>
            <h1>Main Page</h1>
        </section>
    )
}