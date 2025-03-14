import { memo } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { SearchBarProps } from "./SearchBarProps";

const SearchBar = memo(function SearchBar({
  searchTerm,
  onSearchChange,
  onClearSearch,
}: SearchBarProps) {
  return (
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
              <IconButton onClick={onClearSearch} data-testid="clear-button">
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      data-testid="search-bar"
    />
  );
});

export default SearchBar;
