import { Box, Container, Grid, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useAuth } from "../../hooks/auth.hooks";
import LoadingCustomButton from "../shared/buttons/loading";

export default function Profile(): JSX.Element {

    const {user, logout} = useAuth();

    const promiseLogout = async () => logout()

    return (
        <Box component={'div'}>
            <Container>
                <Grid component="div"
                    container
                    spacing={2}
                    direction="row"
                    display={'flex'}
                    alignItems="center"
                    justifyContent={"center"}
                >
                    <Grid item xs={12}>
                        <Typography variant="h4">Configuracion de cuenta</Typography>
                        <Typography variant="h6">{
                            `Usuario: ${user?.nombres} | Perfil: ${user?.rol.descripcion}`
                        }</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <LoadingCustomButton
                            variant="contained"
                            color="secondary"
                            onClick={promiseLogout}
                            startIcon={<Logout/>}
                        >
                                Cerrar Sesion
                        </LoadingCustomButton>
                    </Grid>
                </Grid>
            </Container> 
        </Box>
    )
}