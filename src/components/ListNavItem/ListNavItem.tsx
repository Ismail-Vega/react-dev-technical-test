import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";

import { ListNavItemProps } from "./ListNavItemProps";

const ListNavItem = ({
  path,
  value,
  icon,
  onClick,
  navigate,
}: ListNavItemProps) => (
  <ListItem disablePadding data-testid="list-nav-item">
    <ListItemButton
      onClick={() => {
        navigate(path);
        if (onClick) onClick();
      }}
      data-testid={`list-nav-item-button-${value.replace(/\s/g, "")}`}
    >
      <ListItemIcon data-testid="list-nav-item-icon">{icon}</ListItemIcon>
      <ListItemText
        primary={value}
        data-testid={`list-nav-item-text-${value.replace(/\s/g, "")}`}
      />
    </ListItemButton>
  </ListItem>
);

export default ListNavItem;
