import { FormEvent, useState, useRef, useEffect } from "react";
import { Box } from "@mui/material/";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import { AppFormProps } from "./AppFormProps";
import { MAX_TITLE_LENGTH } from "../../constants";
import { handleFormValidation } from "../../utils";

const AppForm = ({
  icon,
  label,
  onSubmit,
  initialTitleValue = "",
}: AppFormProps) => {
  const [title, setTitle] = useState(initialTitleValue);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = handleFormValidation(title);

    if (!validation.isValid) {
      setError(true);
      setErrorMsg(validation.errorMsg);
      return;
    }

    onSubmit(title);
    setTitle("");
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      data-testid="app-form"
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>{icon}</Avatar>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%" }}
      >
        <FormControl fullWidth>
          <TextField
            required
            fullWidth
            id="input"
            name="input"
            error={error}
            margin="normal"
            label={label}
            value={title}
            inputRef={inputRef}
            onFocus={() => setError(false)}
            inputProps={{ maxLength: MAX_TITLE_LENGTH }}
            sx={{ backgroundColor: "rgb(232,240,254)" }}
            onChange={(e) => setTitle(e.target.value)}
            helperText={
              error ? errorMsg : `${title.length}/${MAX_TITLE_LENGTH}`
            }
            data-testid="app-form-input"
          />
        </FormControl>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          data-testid="app-form-confirm-button"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AppForm;
