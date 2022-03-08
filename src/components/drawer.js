import React, { Suspense, useRef, useState, useEffect } from "react"
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GradientIcon from '@mui/icons-material/Gradient';
import { Sfera } from './Sphere';
import { Close } from '@mui/icons-material';
import Slider from '@mui/material/Slider';
import HeightIcon from '@mui/icons-material/Height';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AccountBalanceWalletSharpIcon from '@mui/icons-material/AccountBalanceWalletSharp';
import {State} from "./State"


  const drawerWidth = 240;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );
  
  export default function Menu() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const [rangeval, setRangeval] = useState(null);
  
    
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar style={{background:"#000"}} position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <img
              style={{width: '175px',
              padding: '0 20px 0 0',
              margin: '0 20px 0 0',
              filter: 'invert(1)',
              borderRight: '2px solid #000', 
              display: open ? 'none' : 'block',}}
              src={"/logo.png"}
              alt={"Vetreria Re"}
              loading="lazy"
            />
            <Typography variant="h6" noWrap component="div">
              Box Doccia 001
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
          <img
              style={{
                width: '75%',
                padding: '0px 15px 0px 0px',
                borderRight: '2px solid rgb(0, 0, 0)',
                display: 'block',
                marginRight:"8px"
              }}
              src={"/logo.png"}
              alt={"Vetreria Re"}
              loading="lazy"
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <Close /> : <Close />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>

          <ListItemButton
                onClick={handleDrawerOpen}
                key={"materriale"}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <GradientIcon />
                </ListItemIcon>
                <ListItemText primary={"Materiale del Vetro"} 
                sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>            
            {open ? (<Sfera />) :  ('')}
            <Divider />
            <ListItemButton
                onClick={handleDrawerOpen}
                key={"Altezza"}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HeightIcon />
                </ListItemIcon>
                <ListItemText primary={"Altezza"} secondary={
                  <React.Fragment>
                    <Slider value={State.scale["y"]}
                      step={0.1}
                      min={.8}
                      max={1.5}
                      onChange={(event) => {
                        setRangeval(event.target.value)
                        State.scale["y"] = rangeval
                      }}
                      defaultValue={State.scale["y"]} aria-label="Default" valueLabelDisplay="auto" sx={{ display: open ? "block" : "none" }} />
                  </React.Fragment>
                } 
                sx={{ opacity: open ? 1 : 0 }} />
                
            </ListItemButton>
            
            <Divider />

            <ListItemButton
                onClick={handleDrawerOpen}
                key={"larghezza"}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <HeightIcon style={{transform:"rotate(90deg)"}} />
                </ListItemIcon>
                <ListItemText primary={"Larghezza"} 
                secondary={
                  <React.Fragment>
                   <Slider value={State.scale["x"]}
                      step={0.1}
                      min={.8}
                      max={1.5}
                      onChange={(event) => {
                        setRangeval(event.target.value)
                        State.scale["x"] = rangeval
                      }}
                      defaultValue={State.scale["x"]} aria-label="Default" valueLabelDisplay="auto" sx={{ display: open ? "block" : "none" }} />
                  </React.Fragment>
                } 
                sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            
            <Divider />

            <ListItemButton
                onClick={handleDrawerOpen}
                key={"cerniera"}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <AccountBalanceWalletSharpIcon style={{transform:"rotate(180deg)"}} />
                </ListItemIcon>
                <ListItemText primary={"Cerniera aggiuntiva?"} 
                secondary={
                  <React.Fragment>
                   <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>

                      <FormControlLabel
                      component={'span'}
                        value="1"
                        control={<Checkbox />}
                        label="terza cerniera"
                        labelPlacement="end"
                      />
                    </FormGroup>
                  </FormControl>
                  </React.Fragment>
                } 
                sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>

          </List>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
    );
  }

