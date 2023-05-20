import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Container from '@mui/material/Container';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, CircularProgress } from '@mui/material';

type TabComponent = {
  id: string,
  label: string,
  component: JSX.Element,
}

const Schedule = React.lazy(() => import('./schedule/schedule'))
const Queue = React.lazy(() => import('./queues/queues'))
const Profile = React.lazy(() => import('../Profile/profile'))

const tabsComponents: TabComponent[] = [
  {
    id: 'schedule',
    label: 'Gestion de Agendas',
    component: <Schedule />,
  },{
    id: 'queue',
    label: 'Registro de Turnos',
    component: <Queue />,
  },{
    id: 'profile',
    label: 'Perfil de Usuario',
    component: <Profile />,
  },

]

export default function Registry(): JSX.Element {
        
    const [tabActiveId, setTabActiveId] = React.useState<string>('queue');

    const handleChange = (event: React.SyntheticEvent, id: string) => {
      document.title = tabsComponents.filter(tab => tab.id === id)[0].label;
      setTabActiveId(id);
    };

    React.useEffect(() => {
      document.title = tabsComponents.filter(tab => tab.id === tabActiveId)[0].label
    }, [tabActiveId])

    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tabActiveId}>
          <Container sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              onChange={handleChange}
              aria-label="optionTab"
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              centered
            >
              {tabsComponents.map( state => {
                return (
                  <Tab
                    key={state.id}
                    label={state.label}
                    value={state.id}
                  />
                  )
              })}
            </TabList>
          </Container>

          <TabPanel value={tabActiveId}>
            <React.Suspense fallback = {
              <Grid item style={{display:'flex', justifyContent:'center', width:'100vw', height: '100vh', zIndex: 999}}>
                <CircularProgress color="inherit" />
              </Grid>
            }>
              {
                tabsComponents.filter(tab => tab.id === tabActiveId)[0].component
              ?? null}

            </React.Suspense>
          </TabPanel>

        </TabContext>
      </Box>
    );
}