import { memo } from "react";
import List from "@mui/material/List";
import ListIcon from "@mui/icons-material/List";
import Typography from "@mui/material/Typography";

import ListNavItem from "../ListNavItem";
import { NavListProps } from "./NavListProps";
import { MAX_NAV_ITEMS_SHOWN } from "../../constants";

const NavList = memo(function NavList({
  filteredLists,
  navigate,
  handleDrawerToggle,
}: NavListProps) {
  return (
    <List data-testid="nav-list">
      {filteredLists.slice(0, MAX_NAV_ITEMS_SHOWN).map(({ id, name }) => (
        <ListNavItem
          key={id}
          value={name}
          icon={<ListIcon />}
          navigate={navigate}
          path={`/list/${id}`}
          onClick={handleDrawerToggle}
        />
      ))}
      {filteredLists.length > MAX_NAV_ITEMS_SHOWN && (
        <Typography variant="body2" sx={{ ml: 2 }} data-testid="more-items">
          {`+ ${filteredLists.length - MAX_NAV_ITEMS_SHOWN} more items`}
        </Typography>
      )}
    </List>
  );
});

export default NavList;
