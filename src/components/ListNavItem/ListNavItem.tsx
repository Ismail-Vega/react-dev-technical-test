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
  <ListItem disablePadding>
    <ListItemButton
      onClick={() => {
        navigate(path);
        if (onClick) onClick();
      }}
    >
      {<ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={value} />
    </ListItemButton>
  </ListItem>
);

export default ListNavItem;
