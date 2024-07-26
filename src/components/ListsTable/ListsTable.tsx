import { MouseEvent, ReactNode, useContext, useMemo, useState } from "react";

import { Box } from "@mui/material";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
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

import { TodoContext } from "../../state/TodoProvider";
import { ListTableProps } from "./ListTableProps";

interface Data {
  name: string;
  description: string;
  actions: ReactNode;
}

function createData(
  name: string,
  description: string,
  actions: ReactNode
): Data {
  return {
    name,
    description,
    actions,
  };
}

const ListsTable = ({ rowMenuActions }: ListTableProps) => {
  const { state } = useContext(TodoContext);
  const [openPopper, setOpenPopper] = useState<{ [key: string]: boolean }>({});
  const [anchorEl, setAnchorEl] = useState<{
    [key: string]: HTMLButtonElement | null;
  }>({});

  const handleClick =
    (listId: string) => (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl((prev) => ({
        ...prev,
        [listId]: event.currentTarget,
      }));
      setOpenPopper((prev) => ({
        ...prev,
        [listId]: !prev[listId],
      }));
    };

  const handleClosePopper = (listId: string) => () => {
    setOpenPopper((prev) => ({
      ...prev,
      [listId]: false,
    }));
  };

  const rows = useMemo(
    () =>
      Object.keys(state.lists).map((listId) => {
        const { name, description } = state.lists[listId];

        const tablePopper = (
          <Box key={listId}>
            <IconButton aria-label="edit/delete" onClick={handleClick(listId)}>
              <MoreHorizIcon />
            </IconButton>

            <Popper
              open={!!anchorEl[listId] && openPopper[listId]}
              anchorEl={anchorEl[listId]}
              placement="bottom-end"
              modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
            >
              <ClickAwayListener onClickAway={handleClosePopper(listId)}>
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
                        rowMenuActions[0](listId);

                        setOpenPopper((prev) => ({
                          ...prev,
                          [listId]: false,
                        }));
                      }}
                    >
                      Edit
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => {
                        rowMenuActions[1](listId);

                        setOpenPopper((prev) => ({
                          ...prev,
                          [listId]: false,
                        }));
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

        return createData(name, description, tablePopper);
      }),
    [anchorEl, openPopper, rowMenuActions, state.lists]
  );

  return rows.length ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
};

export default ListsTable;
