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
import TextIncrease from '@mui/icons-material/TextIncrease';
import TextDecrease from '@mui/icons-material/TextDecrease';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FmdBad, Home, People, WarningAmber } from '@mui/icons-material';
import { pink } from '@mui/material/colors';

import { Link, Route, Routes } from 'react-router-dom';
import { Fab, createTheme } from '@mui/material';
import AdminPage from '../pages/AdminPage';
import EmployeePage from '../pages/EmployeePage';
import TypePage from '../pages/TypePage';
import HomePage from '../pages/HomePage';
import MainPage from '../pages/MainPage';
import { useState } from 'react';

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
  const [open, setOpen] = useState(true);
  const [font, setFont] = useState(16);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const root = document.documentElement;

  const handleDecreaseFont = () => {
    setFontSize(font - 2);
    setFont(font - 2);
  }

  const handleIncreaseFont = () => {
    setFontSize(font + 2);
    setFont(font + 2);
  }

  const setFontSize = (size) => {
    root.style.fontSize = size + 'px';
  }

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
            <div className='flex justify-end'>
              <div className='mx-2'>
                <Fab variant="extended" color='info' onClick={() => { handleIncreaseFont() }}>
                  <TextIncrease />
                </Fab>
              </div>
              <div className='mx-2'>
                <Fab variant="extended" color='info' onClick={() => { handleDecreaseFont() }}>
                  <TextDecrease />
                </Fab>
              </div>
              <Link to='/'>
                <Fab variant="extended" color='error'>
                  <LogoutIcon sx={{ mr: 1 }} />
                  ออกจากระบบ
                </Fab>
              </Link>
            </div>
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

          <Link to="/Dashborad/MainPage" style={{ textDecoration: 'none', color: 'black' }}  >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><Home /></ListItemIcon>
                <ListItemText primary='หน้าหลัก' />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/Dashborad/HomePage" style={{ textDecoration: 'none', color: 'black' }}  >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><FmdBad /></ListItemIcon>
                <ListItemText primary='รายการปัญหา' />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/Dashborad/EmployeePage" style={{ textDecoration: 'none', color: 'black' }}  >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><People /></ListItemIcon>
                <ListItemText primary='บุคลากร' />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/Dashborad/TypePage" style={{ textDecoration: 'none', color: 'black' }}  >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><WarningAmber /></ListItemIcon>
                <ListItemText primary='ประเภทปัญหา' />
              </ListItemButton>
            </ListItem>
          </Link>

          <Link to="/Dashborad/AdminPage" style={{ textDecoration: 'none', color: 'black' }}  >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                <ListItemText primary='แอดมิน' />
              </ListItemButton>
            </ListItem>
          </Link>

        </List>

      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        {/* <Outlet /> */}
        <Routes>
          <Route path="/EmployeePage" element={<EmployeePage />} />
          <Route path="/TypePage" element={<TypePage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/MainPage" element={<MainPage />} />
        </Routes>

      </Main>
    </Box>
  );
}