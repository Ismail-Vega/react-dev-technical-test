import { memo } from "react";
import ListIcon from "@mui/icons-material/List";
import { List, Typography } from "@mui/material";

import ListNavItem from "../ListNavItem";
import { NavListProps } from "./NavListProps";

const NavList = memo(
  ({ filteredLists, navigate, handleDrawerToggle }: NavListProps) => (
    <List>
      {filteredLists.slice(0, 5).map(({ id, name }) => (
        <ListNavItem
          key={id}
          icon={<ListIcon />}
          navigate={navigate}
          path={`/list/${id}`}
          value={name}
          onClick={handleDrawerToggle}
        />
      ))}
      {filteredLists.length > 5 && (
        <Typography variant="body2" sx={{ ml: 2 }}>
          {`+ ${filteredLists.length - 5} more items`}
        </Typography>
      )}
    </List>
  )
);

export default NavList;
