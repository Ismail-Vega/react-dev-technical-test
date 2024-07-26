import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TodoProvider } from "../state/TodoProvider";

const App = lazy(() => import("../App"));
const SideBarLayout = lazy(() => import("../components/SideBarLayout"));
const TodoListPage = lazy(() => import("../pages/TodoListPage/TodoListPage"));

const AppRouter = () => {
  return (
    <Router>
      <TodoProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <SideBarLayout>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/list/:id" element={<TodoListPage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </SideBarLayout>
        </Suspense>
      </TodoProvider>
    </Router>
  );
};

export default AppRouter;
