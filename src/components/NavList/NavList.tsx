import { memo } from "react";
import ListIcon from "@mui/icons-material/List";
import { List, Typography } from "@mui/material";

import ListNavItem from "../ListNavItem";
import { NavListProps } from "./NavListProps";
import { MAX_NAV_ITEMS_SHOWN } from "../../constants";

const NavList = memo(function NavList({
  filteredLists,
  navigate,
  handleDrawerToggle,
}: NavListProps) {
  return (
    <List>
      {filteredLists.slice(0, MAX_NAV_ITEMS_SHOWN).map(({ id, name }) => (
        <ListNavItem
          key={id}
          icon={<ListIcon />}
          navigate={navigate}
          path={`/list/${id}`}
          value={name}
          onClick={handleDrawerToggle}
        />
      ))}
      {filteredLists.length > MAX_NAV_ITEMS_SHOWN && (
        <Typography variant="body2" sx={{ ml: 2 }}>
          {`+ ${filteredLists.length - MAX_NAV_ITEMS_SHOWN} more items`}
        </Typography>
      )}
    </List>
  );
});

export default NavList;
