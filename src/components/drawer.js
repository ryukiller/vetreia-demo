import React, { Suspense, useRef, useState, useEffect } from "react";
import VetreriaBox from "./VetreriaBox.js";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GradientIcon from "@mui/icons-material/Gradient";
import { Sfera } from "./Sphere";
import { Close } from "@mui/icons-material";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import HeightIcon from "@mui/icons-material/Height";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import AccountBalanceWalletSharpIcon from "@mui/icons-material/AccountBalanceWalletSharp";
import { State } from "./State";
import Chip from "@mui/material/Chip";
import { ListItem } from "@mui/material";
import CalculateIcon from "@mui/icons-material/Calculate";

/*<Slider value={State.scale["x"]}
                      step={0.001}
                      min={.8}
                      max={1.5}
                      onChange={(event) => {
                        setRangeval(event.target.value)
                        State.scale["x"] = rangeval
                        State.panelPos["x"] = State.panelPos["x"] + Number(rangeval)
                        
                      }}
                      defaultValue={State.scale["x"]} aria-label="Default" valueLabelDisplay="auto" sx={{ display: open ? "block" : "none" }} />*/

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

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

  const [position, setPosition] = useState({ x: 0.6, y: 2, z: 1, x2: 1 });
  const { x, y, z, x2 } = position;

  function valueLabelFormat(value) {
    let newval = Number(value * 100).toFixed(0);
    return `${newval} CM`;
  }

  const [base, setBase] = useState(679);
  const [nome, setNome] = useState("linea azzurra");
  const [hinge, setHinge] = useState(false);
  const [modelMaterials, setModelMaterials] = useState();
 

  const handleSphereClick = (clickedMaterial) => {
    setModelMaterials(clickedMaterial.material);
    setBase(Number(clickedMaterial.base));
    setNome(clickedMaterial.nome);
  };

  const prezzo = base + (hinge ? 156 : 0) + roundToNearestTen(x * 100 - 60) + roundToNearestTen(y * 100 - 200);

  useEffect(() => {
    if (x >= 0.7 || y >= 2.2) {
      setHinge(true);
    } else {
      setHinge(false);
    }
  }, [x, y]);

const [inputXValue, setInputXValue] = useState(0);
const [inputYValue, setInputYValue] = useState(0);

function updateValue(val, axis) {
  let value = parseInt(val, 10);
  const limits = axis === "x" ? { min: 60, max: 100 } : { min: 200, max: 300 };

  if (value > limits.max) value = limits.max;
  if (value < limits.min) value = limits.min;

  const setInputValue = axis === "x" ? setInputXValue : setInputYValue;
  setInputValue(value);

  let cm = value / 100;
  setPosition({ ...position, [axis]: cm });
}

useEffect(() => {
  const timeout = setTimeout(() => {
    updateValue(inputXValue, "x");
  }, 800);
  return () => {
    clearTimeout(timeout);
  };
}, [inputXValue]);

useEffect(() => {
  const timeout = setTimeout(() => {
    updateValue(inputYValue, "y");
  }, 800);
  return () => {
    clearTimeout(timeout);
  };
}, [inputYValue]);

function roundToNearestTen(value) {
  return Math.round(value / 10) * 10;
}

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar style={{ background: "#000" }} position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <img
              style={{
                width: "175px",
                padding: "0 20px 0 0",
                margin: "0 20px 0 0",
                filter: "invert(1)",
                borderRight: "2px solid #000",
                display: open ? "none" : "block",
              }}
              src={"/logo2.png"}
              alt={"Vetreria Re"}
              loading="lazy"
            />
            <Typography variant="h6" noWrap component="div">
              Box Doccia 001 - prezzo: € {prezzo}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <img
              style={{
                width: "75%",
                padding: "0px 15px 0px 0px",
                borderRight: "2px solid rgb(0, 0, 0)",
                display: "block",
                marginRight: "8px",
              }}
              src={"/logo2.png"}
              alt={"Vetreria Re"}
              loading="lazy"
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <Close /> : <Close />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItemButton
              onClick={handleDrawerOpen}
              key={"materriale"}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GradientIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Materiale del Vetro"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
            {open ? <Sfera onClick={handleSphereClick} /> : ""}
            <Divider textAlign="left">
              <Chip label="Porta" sx={{ display: open ? "flex" : "none" }} />
            </Divider>
            <ListItemButton
              onClick={handleDrawerOpen}
              key={"Altezza2"}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HeightIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Altezza"}
                secondary={
                  <React.Fragment>
                    <Slider
                      value={position.y}
                      step={0.01}
                      min={2}
                      max={3}
                      onChange={(e) => {
                        setInputYValue(Number(e.target.value * 100).toFixed(0));
                        setPosition({ ...position, y: e.target.value });
                      }}
                      defaultValue={position.y}
                      aria-label="Default"
                      valueLabelFormat={valueLabelFormat}
                      valueLabelDisplay="auto"
                      sx={{ display: open ? "block" : "none" }}
                    />
                    <TextField
                      id="standard-number"
                      label="Misura in CM"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={inputYValue}
                      InputProps={{ inputProps: { min: 200, max: 300 } }}
                      onChange={(e) => {
                        setInputYValue(e.target.value);
                      }}
                      variant="standard"
                    />
                  </React.Fragment>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>

            <Divider />

            <ListItemButton
              onClick={handleDrawerOpen}
              key={"larghezza2"}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <HeightIcon style={{ transform: "rotate(90deg)" }} />
              </ListItemIcon>
              <ListItemText
                primary={"Larghezza"}
                secondary={
                  <React.Fragment>
                    <Slider
                      value={position.x}
                      step={0.01}
                      min={0.6}
                      max={1}
                      onChange={(e) => {
                        setInputXValue(Number(e.target.value * 100).toFixed(0));
                        setPosition({ ...position, x: e.target.value });
                      }}
                      defaultValue={position.x}
                      aria-label="Default"
                      valueLabelFormat={valueLabelFormat}
                      valueLabelDisplay="auto"
                      sx={{ display: open ? "block" : "none" }}
                    />
                    <TextField
                      id="standard-number"
                      label="Misura in CM"
                      type="number"
                      value={inputXValue}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{ inputProps: { min: 60, max: 100 } }}
                      onChange={(e) => {
                        setInputXValue(e.target.value);
                      }}
                      variant="standard"
                    />
                  </React.Fragment>
                }
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>

            {/* <Divider textAlign="left">
              <Chip label="Vetro laterale" sx={{ display: open ? "flex" : "none" }} />
            </Divider>

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
                    <Slider value={position.y.toFixed(2)}
                      step={0.1}
                      min={2}
                      max={3}
                      onChange={(e) => setPosition({ ...position, y: e.target.value })}
                      defaultValue={position.y.toFixed(2)} aria-label="Default" valueLabelFormat={valueLabelFormat} valueLabelDisplay="auto" sx={{ display: open ? "block" : "none" }} />
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
                    <Slider value={position.x2}
                      step={0.1}
                      min={.6}
                      max={2}
                      onChange={(e) => setPosition({ ...position, x2: e.target.value })}
                      defaultValue={position.x2} aria-label="Default" valueLabelFormat={valueLabelFormat} valueLabelDisplay="auto" sx={{ display: open ? "block" : "none" }} />
                  </React.Fragment>
                } 
                sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton> */}

            {/* <ListItemButton
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
                        value={hinge}
                        onChange={() => setHinge(!hinge)}
                        control={<Checkbox />}
                        label="terza cerniera"
                        labelPlacement="end"
                      />
                    </FormGroup>
                  </FormControl>
                  </React.Fragment>
                } 
                sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton> */}
            {open && (
              <>
                <Divider textAlign="left">
                  <Chip
                    label="Riepilogo"
                    sx={{ display: open ? "flex" : "none" }}
                  />
                </Divider>

                <ListItem alignItems="flex-start">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <GradientIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Materiale Vetro"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "block" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          textAlign="right"
                          margin="10px 0"
                        >
                          {nome}
                        </Typography>
                        <Typography
                          sx={{ display: "block" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          textAlign="right"
                        >
                          € {base}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>

                {y > 2 && (
                  <ListItem alignItems="flex-start">
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <GradientIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Altezza"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "block" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            textAlign="right"
                          >
                            + € {roundToNearestTen(y * 100 - 200).toFixed(2)}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                )}

                {x > 0.6 && (
                  <ListItem alignItems="flex-start">
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <GradientIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Larghezza"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "block" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            textAlign="right"
                          >
                            + € {roundToNearestTen(x * 100 - 60).toFixed(2)}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                )}

                {hinge && (
                  <ListItem alignItems="flex-start">
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <AccountBalanceWalletSharpIcon
                        style={{ transform: "rotate(180deg)" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Cerniera aggiuntiva"
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "block" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            textAlign="right"
                            margin="10px 0"
                          >
                            + € 156
                          </Typography>
                          <Typography
                            sx={{ display: "block" }}
                            component="p"
                            variant="body2"
                            color="text.primary"
                            whiteSpace="normal"
                          >
                            Cerniera piatta a scatto con regolazione angolo di
                            chiusura, pomello inox finitura cromo lucido
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                )}

                <ListItem alignItems="flex-start">
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <CalculateIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Totale"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "block" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          textAlign="right"
                          margin="10px 0"
                          fontWeight="bold"
                          fontSize="1.4rem"
                        >
                          € {prezzo}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
      </Box>
      <VetreriaBox
        x={x}
        y={y}
        z={z}
        x2={x2}
        material={modelMaterials}
        hinge={hinge}
      />
    </>
  );
}
