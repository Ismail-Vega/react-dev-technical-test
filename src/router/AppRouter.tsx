import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "../App";
import { TodoProvider } from "../state/TodoProvider";
import SideBarLayout from "../components/SideBarLayout";
import TodoListPage from "../pages/TodoListPage/TodoListPage";

const AppRouter = () => {
  return (
    <Router>
      <TodoProvider>
        <SideBarLayout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/list/:id" element={<TodoListPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </SideBarLayout>
      </TodoProvider>
    </Router>
  );
};

export default AppRouter;
