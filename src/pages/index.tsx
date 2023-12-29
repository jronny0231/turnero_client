import { MainContainer } from '../components/container/main.container'
import { useSEO } from '../hooks/useSEO'
import { HomeIcon } from '../lib/icons/main.icons'

export const Home = (): JSX.Element => {

    useSEO({})

    return (
        <MainContainer title='Inicio' icon={HomeIcon}>

        </MainContainer>
    )
}