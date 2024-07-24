import { FormEvent, useState, useRef, useEffect } from "react";
import { Box } from "@mui/material/";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import TaskIcon from "@mui/icons-material/Task";
import FormControl from "@mui/material/FormControl";
import { NewTodoFormProps } from "./NewTodoFormProps";

const NewTodoForm = ({ onAddTodo }: NewTodoFormProps) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const MIN_LENGTH = 3;
  const MAX_LENGTH = 100;

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (description.trim().length < MIN_LENGTH) {
      setError(true);
      setErrorMsg(`Description must be at least ${MIN_LENGTH} characters.`);
      return;
    }

    if (description.trim().length > MAX_LENGTH) {
      setError(true);
      setErrorMsg(`Description must be no more than ${MAX_LENGTH} characters.`);
      return;
    }

    onAddTodo(description);
    setDescription("");
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
        <TaskIcon />
      </Avatar>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 1, width: "100%" }}
      >
        <FormControl fullWidth>
          <TextField
            required
            fullWidth
            error={error}
            margin="normal"
            id="description"
            name="description"
            label="Description"
            value={description}
            inputRef={inputRef}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setError(false)}
            sx={{ backgroundColor: "rgb(232,240,254)" }}
            helperText={
              error ? errorMsg : `${description.length}/${MAX_LENGTH}`
            }
            inputProps={{ maxLength: MAX_LENGTH }}
          />
        </FormControl>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default NewTodoForm;
