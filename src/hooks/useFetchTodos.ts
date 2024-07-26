import { useEffect, useRef, useState } from "react";
import { fetchFromApi } from "../services/fetchFromApi";
import { Todo } from "../components/TodoItem/TodoItemProps";

export const useFetchTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
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
