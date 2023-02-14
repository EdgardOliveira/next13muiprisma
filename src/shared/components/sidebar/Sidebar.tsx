import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import WifiIcon from "@mui/icons-material/Wifi";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Link from "next/link";
import { Environment } from "@/shared/environment";
import { useSidebarContext } from "../../contexts/SidebarContext";
import { ReactNode } from "react";

const openedMixin = (theme: Theme): CSSObject => ({
  width: Environment.SIDEBAR_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: Environment.SIDEBAR_WIDTH,
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

//Tipagem do menu
export interface IMenuProps {
  title: string;
  url: string;
  icon?: ReactNode;
}

// itens do menu
const itensMenu: Array<IMenuProps> = [
  { title: "Inicial", url: "/", icon: <HomeIcon /> },
  { title: "Dashboard", url: "/dashboard", icon: <DashboardIcon /> },
  { title: "Grupos", url: "/grupos", icon: <PeopleIcon /> },
  { title: "Redes", url: "/redes", icon: <WifiIcon /> },
  { title: "Usuários", url: "/usuarios", icon: <AssignmentIndIcon /> },
];

export const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarContext();
  const theme = useTheme();

  return (
    <Drawer variant="permanent" open={isSidebarOpen}>
      <DrawerHeader>
        <IconButton onClick={toggleSidebar}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {itensMenu.map((itemMenu, index) => (
          <Link key={index} href={itemMenu.url} legacyBehavior>
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: isSidebarOpen ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isSidebarOpen ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {itemMenu.icon}
                </ListItemIcon>
                <ListItemText
                  primary={itemMenu.title}
                  sx={{ opacity: isSidebarOpen ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};
