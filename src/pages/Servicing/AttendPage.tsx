import { styled } from '@mui/material/styles';
import { Box, Button, CssBaseline, Divider, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import MainLateralMenu from './components/lateralMenu.component';
import HomeIcon from '@mui/icons-material/Home';
import MainAppBar from './components/appBar.component';
import { useAuth } from '../../hooks/auth.hooks';

const drawerWidth: number = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  fontSize: 25,
  color: theme.palette.text.secondary,
}));

type Props = {}

function AttendPage(props: Props): JSX.Element {

  const [isOpen, setOpen] = React.useState(false);
  const { agent } = useAuth()
  const turno = {
    id: 1,
    secuencia: 'CPV01',
    identificacion: '001-1234567-8'
  }

  const handleDrawerToggle = () => {
    setOpen(!isOpen);
  };
  
  const menuItem = [
    {
      id: 1,
      name: "Inicio",
      icon: <HomeIcon />,
      href: "/",
      selected: true
    },
    {
      id: 2,
      name: "Agenda",
      icon: <HomeIcon />,
      href: "/",
      selected: false
    },
    {
      id: 3,
      name: "Registros",
      icon: <HomeIcon />,
      href: "/",
      selected: false
    },
    {
      id: 4,
      name: "Clientes",
      icon: <HomeIcon />,
      href: "/",
      selected: false
    },
    {
      id: 5,
      name: "Cuenta",
      icon: <HomeIcon />,
      href: "/",
      selected: false
    }
  ]

  type ButtonsType = Array<{
    id: number,
    text: string,
    action: () => void,
    isPrincipal: boolean
  }>
  const actionButtons: ButtonsType = [
    {
      id: 1,
      text: "Atendiendo",
      action: () => {},
      isPrincipal: true,
    },
    {
      id: 2,
      text: "Poner en Espera",
      action: () => {},
      isPrincipal: false,
    },
    {
      id: 3,
      text: "Volver a llamar",
      action: () => {},
      isPrincipal: false,
    },
    {
      id: 4,
      text: "Cancelar",
      action: () => {},
      isPrincipal: false,
    }
  ]

  const mainTest: JSX.Element = (

    <Main open={isOpen}>
        <DrawerHeader />
        <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center">

          <Grid item container xs={12} direction="row" justifyContent="space-between">
            <Grid item xs={4}>
              <Item>{turno.secuencia}</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>{agent?.departamento_sucursal.sucursal.descripcion ?? 'Default'}</Item>
            </Grid>
          </Grid>

          {actionButtons.map((button, index) => {
            {
              return button.isPrincipal ? 

                  <>
                    <Grid key={index} item xs={12}>
                      <Button type='submit' variant='contained' fullWidth >
                        <Typography variant='h4'>{button.text}</Typography>
                      </Button>
                    </Grid>
                    <Divider/>
                  </>
                  :
                  <Grid key={index} item md={4} xs={12}>
                    <Button variant='outlined' fullWidth>
                      <Typography variant='h4'>{button.text}</Typography>
                    </Button>
                  </Grid>
            }
          })}
        </Grid>
      </Main>
  )
  
  return (
    <Box sx={{ display: 'flex', flexGrow: 1}}>
      <CssBaseline />

      <MainAppBar title='Inicio' drawerWidth={drawerWidth} isOpen={isOpen} handleDrawerToggle={handleDrawerToggle}/>
      <MainLateralMenu list={menuItem} drawerWidth={drawerWidth} isOpen={isOpen} handleDrawerToggle={handleDrawerToggle}/>
      
      {mainTest}
    </Box>
  )
}

export default AttendPage
