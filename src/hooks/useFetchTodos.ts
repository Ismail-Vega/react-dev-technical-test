import { useEffect, useRef, useState } from "react";
import { Todo } from "../components/TodoItem/TodoItemProps";
import { fetchFromApi } from "../services";

/**
 * Custom hook to fetch todos from the API.
 * @returns {Object} An object containing the todos, loading state, and error state.
 * @returns {Todo[]} return.todos - An array of todos fetched from the API.
 * @returns {boolean} return.loading - A boolean indicating if the data is still being fetched.
 * @returns {string | undefined} return.error - A string containing an error message if an error occurred during fetching.
 */
export const useFetchTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      /**
       * Fetches todos from the jsonplaceholder API.
       */
      const fetchTodos = async () => {
        setLoading(true);
        const result = await fetchFromApi("GET", "/todos");
        const { data, status, error } = result;

        if (error) {
          setError(error);
        } else if (status === 200 && data) {
          setTodos(data);
        }
        setLoading(false);
      };

      fetchTodos();
      hasFetched.current = true;
    }
  }, []);

  return { todos, loading, error };
};
