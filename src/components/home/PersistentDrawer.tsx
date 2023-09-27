import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useRef, useState } from "react";
import { FileContext } from "../../App";
import { arrayType } from "../types";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const fileInput = useRef<HTMLInputElement>(null);
  const routes = [
    {
      name: "Home",
      route: "/home",
      icon: (
        <HomeIcon
          // eslint-disable-next-line no-restricted-globals
          sx={{ color: location.pathname.includes("/home") ? "white" : "" }}
        />
      ),
    },
    {
      name: "Dashboard",
      route: "/dashboard",
      icon: (
        <DashboardIcon
          sx={{
            // eslint-disable-next-line no-restricted-globals
            color: location.pathname.includes("/dashboard") ? "white" : "",
          }}
        />
      ),
    },
  ];

  // const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const { file, setFile } = useContext(FileContext);
  const fileReader = new FileReader();

  const handleOnChange = (e: any) => {
    const temp = e?.target?.files[0];
    if (temp) {
      fileReader.onload = function (event) {
        if (!event.target) return;
        const csvOutput: string = event.target.result + "";
        csvFileToArray(csvOutput);
      };

      fileReader.readAsText(temp);
    }
  };

  const csvFileToArray = (string: string) => {
    const csvHeader = string
      .slice(0, string.indexOf("\n"))
      .split(",")
      .map((x) => x.replace("\r", ""));
    const csvRows = string.slice(string.indexOf("\n")).split("\n");

    const array: arrayType[] = csvRows.map((i: string) => {
      const values = i.split(",");
      // values.forEach((x) => x.replace("/r", ""));
      const obj = csvHeader.reduce((object: any, header: any, index: any) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    // console.log(array)
    setFile(array);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          {!open && (
            <Typography variant="h6" noWrap component="div">
              Sales Dashboard
            </Typography>
          )}
          <Box sx={{ ml: "auto" }}>
            {file?.length ? (
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 2 }}
                onClick={() => {
                  setFile([]);
                  if (fileInput.current) fileInput.current.value = "";
                }}
              >
                Remove File
              </Button>
            ) : null}
            <label
              htmlFor="file-upload"
              style={{
                border: "1px solid",
                borderRadius: "5px",
                // marginLeft: "auto",
                padding: "8px",
              }}
            >
              Upload File
              <FileUploadIcon sx={{ verticalAlign: "middle", ml: "4px" }} />
            </label>
            <input
              ref={fileInput}
              id="file-upload"
              type={"file"}
              accept={".csv"}
              onInput={handleOnChange}
              style={{ display: "none" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ borderBottom: ".1px solid black" }}>
          <AutoGraphIcon sx={{ mr: 2 }} />
          {/* <IconButton onClick={handleDrawerClose} sx={{ mr: "auto" }}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
          <Typography variant="h6" sx={{ marginRight: "auto" }}>
            Sales Dashboard
          </Typography>
        </DrawerHeader>
        <Divider />
        <List sx={{ p: 0 }}>
          {routes.map((item, index) => (
            <ListItem
              key={item.name}
              disablePadding
              sx={{
                borderBottom: "1px solid black",
                // eslint-disable-next-line no-restricted-globals
                backgroundColor: location.pathname.includes(item.route)
                  ? "#1976d2"
                  : "",
                // eslint-disable-next-line no-restricted-globals
                color: location.pathname.includes(item.route) ? "white" : "",
              }}
            >
              <ListItemButton onClick={() => navigate(item.route)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
