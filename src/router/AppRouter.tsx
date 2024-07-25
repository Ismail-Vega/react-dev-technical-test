import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "../App";
import { TodoProvider } from "../state/TodoProvider";
import TodoListPage from "../pages/TodoListPage/TodoListPage";

const AppRouter = () => {
  return (
    <Router>
      <TodoProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/list/:listName" element={<TodoListPage />} />
        </Routes>
      </TodoProvider>
    </Router>
  );
};

export default AppRouter;
