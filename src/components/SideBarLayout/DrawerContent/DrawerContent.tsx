import { Toolbar, Divider, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

import NavList from "../../NavList";
import SearchBar from "../../SearchBar";
import ListNavItem from "../../ListNavItem";
import { DrawerContentProps } from "./DrawerContentProps";
import { PALETTE_DARK_GREY, PALETTE_LIGHT_GREY } from "../../../constants";

const DrawerContent = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  filteredLists,
  navigate,
  handleDrawerToggle,
}: DrawerContentProps) => (
  <div>
    <Toolbar
      sx={{
        backgroundColor: (t) =>
          t.palette.mode === "light"
            ? t.palette.grey[PALETTE_LIGHT_GREY]
            : t.palette.grey[PALETTE_DARK_GREY],
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
    <Box sx={{ m: 2 }}>
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onClearSearch={onClearSearch}
      />
    </Box>
    <NavList
      filteredLists={filteredLists}
      navigate={navigate}
      handleDrawerToggle={handleDrawerToggle}
    />
  </div>
);

export default DrawerContent;
