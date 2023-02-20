import { Box, CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import { Navbar } from "../navbar/Navbar";
import { Sidebar } from "../sidebar/Sidebar";
import { styled } from "@mui/material/styles";
import Header from "../header/Header";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface IBaseLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const BaseLayout = ({ title, subtitle, children }: IBaseLayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Header title={title} subtitle={subtitle} />
        {children}
      </Box>
    </Box>
  );
};
