import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Home, People, WarningAmber } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

import { Link, Outlet } from 'react-router-dom';
import { Fab } from '@mui/material';

const drawerWidth = 240;



const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
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
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
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


export default function DrawerComp() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color="warning" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <div className='flex flex-row justify-between w-full'>
            <div className='mt-2'>
              <Typography variant="h6" noWrap >
                KMUTNB Smart report
              </Typography>
            </div>
            <Link to='/LoginPage'>
              <Fab variant="extended" color='error'>
                <LogoutIcon sx={{ mr: 1 }} />
                ออกจากระบบ
              </Fab>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
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
        open={open}
      >
        <DrawerHeader sx={{ backgroundColor: 'warning.main' }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr'
              ? <ChevronLeftIcon sx={{ color: pink[50] }} />
              : <ChevronRightIcon sx={{ color: pink[50] }} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          <Link to="/" style={{ textDecoration: 'none', color: 'black' }}  >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><Home /></ListItemIcon>
                <ListItemText primary='หน้าหลัก' />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/EmployeePage" style={{ textDecoration: 'none', color: 'black' }}  >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><People /></ListItemIcon>
                <ListItemText primary='บุคลากร' />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/TypePage" style={{ textDecoration: 'none', color: 'black' }}  >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><WarningAmber /></ListItemIcon>
                <ListItemText primary='ประเภทปัญหา' />
              </ListItemButton>
            </ListItem>
          </Link>

        </List>

      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        <Outlet />

      </Main>
    </Box>
  );
}