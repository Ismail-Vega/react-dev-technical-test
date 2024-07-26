import { useCallback, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import ListIcon from "@mui/icons-material/List";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import ListNavItem from "../ListNavItem";
import { TodoContext } from "../../state/TodoProvider";
import { SideBarLayoutProps } from "./SideBarLayoutProps";

const drawerWidth = 240;

const SideBarLayout = ({ children }: SideBarLayoutProps) => {
  const navigate = useNavigate();
  const { state } = useContext(TodoContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const drawer = useMemo(
    () => (
      <div>
        <Toolbar
          sx={{
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
          }}
        >
          <ListNavItem
            path="/"
            key="home"
            value="Home"
            icon={<HomeIcon />}
            navigate={navigate}
            onClick={handleDrawerToggle}
          />
        </Toolbar>

        <Divider />
        <List>
          {Object.keys(state.lists).map((id) => (
            <ListNavItem
              key={id}
              icon={<ListIcon />}
              navigate={navigate}
              path={`/list/${id}`}
              value={state.lists[Number(id)].name}
              onClick={handleDrawerToggle}
            />
          ))}
        </List>
      </div>
    ),
    [handleDrawerToggle, navigate, state.lists]
  );

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          ml: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ margin: "auto" }}>
            React Developer Technical Test
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        aria-label="todo list items"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          open={mobileOpen}
          variant="temporary"
          disableScrollLock={true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          ml: { sm: `${drawerWidth}px` },
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default SideBarLayout;
