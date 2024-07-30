import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  AppBar,
  Drawer,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { RootState } from "../../store";
import DrawerContent from "./DrawerContent";
import { SideBarLayoutProps } from "./SideBarLayoutProps";

const drawerWidth = 240;

const SideBarLayout = ({ children }: SideBarLayoutProps) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const lists = useSelector((state: RootState) => state.todos.lists);
  const loading = useSelector((state: RootState) => state.todos.loading);

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevMobileOpen) => !prevMobileOpen);
  }, []);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  const listsArray = useMemo(() => {
    return Object.keys(lists).map((id) => ({
      id,
      name: lists[Number(id)].name,
    }));
  }, [lists]);

  const filteredLists = useMemo(() => {
    return listsArray.filter((list) =>
      list.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [listsArray, searchTerm]);

  const drawer = (
    <DrawerContent
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      onClearSearch={handleClearSearch}
      filteredLists={filteredLists}
      navigate={navigate}
      handleDrawerToggle={handleDrawerToggle}
      loading={loading}
    />
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
