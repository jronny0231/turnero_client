import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


type Props = {
    list: Array<{
        id: number
        name: string
        icon: JSX.Element
        href: string
        selected: boolean
    }>
    drawerWidth: number,
    isOpen: boolean,
    handleDrawerToggle: () => void
}

export default function MainLateralMenu({list, drawerWidth, isOpen, handleDrawerToggle}: Props) {
    const theme = useTheme();
    const drawer = (
      <List>
        { list.map( ( item ) => (
            <ListItem key={item.id} disablePadding>
                <ListItemButton selected={item.selected}>
                    <ListItemIcon>
                        {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItemButton>
            </ListItem>
        ))}
      </List>
  );

  return (
    <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
            },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
        >
        <DrawerHeader>
            <IconButton onClick={handleDrawerToggle}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </DrawerHeader>
        <Divider />
        { drawer }
    </Drawer>
  );
}