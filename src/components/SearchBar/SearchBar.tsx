import { memo } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { SearchBarProps } from "./SearchBarProps";

const SearchBar = memo(
  ({ searchTerm, onSearchChange, onClearSearch }: SearchBarProps) => (
    <TextField
      fullWidth
      label="Search lists"
      variant="outlined"
      value={searchTerm}
      onChange={onSearchChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {searchTerm && (
              <IconButton onClick={onClearSearch}>
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  )
);

export default SearchBar;
