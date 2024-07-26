import {
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

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
  actions: ReactNode;
}

function createData(name: string, actions: ReactNode): Data {
  return {
    name,
    actions,
  };
}

const ListsTable = ({ rowMenuActions }: ListTableProps) => {
  const { state } = useContext(TodoContext);
  const [openPopper, setOpenPopper] = useState<{ [key: number]: boolean }>({});
  const [anchorEl, setAnchorEl] = useState<{
    [key: number]: HTMLButtonElement | null;
  }>({});

  const handleClick = useCallback(
    (listId: number) => (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl((prev) => ({
        ...prev,
        [listId]: event.currentTarget,
      }));
      setOpenPopper((prev) => ({
        ...prev,
        [listId]: !prev[listId],
      }));
    },
    []
  );

  const handleClosePopper = (listId: number) => () => {
    setOpenPopper((prev) => ({
      ...prev,
      [listId]: false,
    }));
  };

  const rows = useMemo(
    () =>
      Object.keys(state.lists).map((listId) => {
        const parsedId = Number(listId);
        const { name } = state.lists[parsedId];

        const tablePopper = (
          <Box key={listId}>
            <IconButton
              aria-label="edit/delete"
              onClick={handleClick(parsedId)}
            >
              <MoreHorizIcon />
            </IconButton>

            <Popper
              open={!!anchorEl[parsedId] && openPopper[parsedId]}
              anchorEl={anchorEl[parsedId]}
              placement="bottom-end"
              modifiers={[{ name: "offset", options: { offset: [0, 8] } }]}
            >
              <ClickAwayListener onClickAway={handleClosePopper(parsedId)}>
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
                        rowMenuActions[0](parsedId);

                        setOpenPopper((prev) => ({
                          ...prev,
                          [parsedId]: false,
                        }));
                      }}
                    >
                      Edit
                    </ListItemButton>
                    <ListItemButton
                      onClick={() => {
                        rowMenuActions[1](parsedId);

                        setOpenPopper((prev) => ({
                          ...prev,
                          [parsedId]: false,
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

        return createData(name, tablePopper);
      }),
    [anchorEl, handleClick, openPopper, rowMenuActions, state.lists]
  );

  return rows.length ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
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
              <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
};

export default ListsTable;
