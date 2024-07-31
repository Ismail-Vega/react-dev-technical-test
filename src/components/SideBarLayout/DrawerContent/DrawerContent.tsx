import { Toolbar, Divider, Box } from "@mui/material";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
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
  loading,
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
        data-testid="search-bar"
      />
    </Box>
    {loading && filteredLists.length === 0 ? (
      <List sx={{ width: 200 }} data-testid="loading-skeleton">
        <Skeleton key="wave-1" animation="wave" />
        <Skeleton key="wave-2" animation="wave" />
        <Skeleton key="wave-3" animation="wave" />
        <Skeleton key="wave-4" animation="wave" />
        <Skeleton key="wave-5" animation="wave" />
      </List>
    ) : (
      <NavList
        filteredLists={filteredLists}
        navigate={navigate}
        handleDrawerToggle={handleDrawerToggle}
        data-testid="nav-list"
      />
    )}
  </div>
);

export default DrawerContent;
