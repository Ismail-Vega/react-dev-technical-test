import { memo, useMemo, useState, ReactNode, MouseEvent } from "react";
import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import Popper from "@mui/material/Popper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ListItemButton from "@mui/material/ListItemButton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Typography from "@mui/material/Typography";

import { RootState } from "../../store";
import { ListTableProps } from "./ListTableProps";

interface Data {
  id: number;
  name: string;
}

function createData(id: number, name: string): Data {
  return { id, name };
}

const ListItem = memo(function ListItem({
  name,
  actions,
}: {
  name: string;
  actions: ReactNode;
}) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">{actions}</TableCell>
    </TableRow>
  );
});

const ListsTable = ({ rowMenuActions }: ListTableProps) => {
  const lists = useSelector((state: RootState) => state.todos.lists);
  const loading = useSelector((state: RootState) => state.todos.loading);
  const [openPopper, setOpenPopper] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick =
    (listId: number) => (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpenPopper(openPopper === listId ? null : listId);
    };

  const handleClosePopper = () => {
    setOpenPopper(null);
    setAnchorEl(null);
  };

  const rows = useMemo(
    () =>
      Object.keys(lists).map((listId) => {
        const parsedId = Number(listId);
        const { name } = lists[parsedId];
        return createData(parsedId, name);
      }),
    [lists]
  );

  if (loading)
    return (
      <Typography
        variant="body1"
        color="textSecondary"
        sx={{ textAlign: "center", marginTop: "20px" }}
      >
        loading...
      </Typography>
    );

  return rows.length ? (
    <TableContainer component={Paper} sx={{ mb: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const actions = (
              <Box>
                <IconButton
                  aria-label="edit/delete"
                  onClick={handleClick(row.id)}
                >
                  <MoreHorizIcon />
                </IconButton>
                <Popper
                  open={openPopper === row.id}
                  anchorEl={anchorEl}
                  placement="bottom-end"
                  modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
                >
                  <ClickAwayListener onClickAway={handleClosePopper}>
                    <Paper>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "start",
                          flexDirection: "column",
                        }}
                      >
                        <ListItemButton
                          sx={{ width: "100%" }}
                          onClick={() => {
                            rowMenuActions[0](row.id);
                            handleClosePopper();
                          }}
                        >
                          Edit
                        </ListItemButton>
                        <ListItemButton
                          onClick={() => {
                            rowMenuActions[1](row.id);
                            handleClosePopper();
                          }}
                        >
                          Delete
                        </ListItemButton>
                      </Box>
                    </Paper>
                  </ClickAwayListener>
                </Popper>
              </Box>
            );

            return <ListItem key={row.id} name={row.name} actions={actions} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography
      variant="body1"
      color="textSecondary"
      sx={{ textAlign: "center", marginTop: "20px" }}
    >
      No Lists Found
    </Typography>
  );
};

export default ListsTable;
