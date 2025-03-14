import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { enqueueSnackbar } from "notistack";

import { useGetTodosQuery } from "../../store";
import { TodoContainerProps } from "./TodoContainerProps";
import { API_SERVER_ERROR_MESSAGE } from "../../constants";
import { setError, setLoading } from "../../store/slices/todoListsSlice";

const TodoContainer = ({ children }: TodoContainerProps) => {
  const dispatch = useDispatch();
  const { error, isLoading } = useGetTodosQuery();

  useEffect(() => {
    dispatch(setLoading(isLoading));

    if (error) {
      const message =
        typeof error === "object"
          ? error.message ?? API_SERVER_ERROR_MESSAGE
          : error;

      dispatch(setError(message));
      enqueueSnackbar(message, { variant: "error", autoHideDuration: 3000 });
    }
  }, [dispatch, isLoading, error]);

  return <>{children}</>;
};

export default TodoContainer;
