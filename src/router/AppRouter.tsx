import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { TodoProvider } from "../state/TodoProvider";
import ErrorBoundary from "../components/ErrorBoundary";

const App = lazy(() => import("../App"));
const SideBarLayout = lazy(() => import("../components/SideBarLayout"));
const TodoListPage = lazy(() => import("../pages/TodoListPage"));

const AppRouter = () => {
  return (
    <Router>
      <TodoProvider>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <SideBarLayout>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/list/:id" element={<TodoListPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </SideBarLayout>
          </Suspense>
        </ErrorBoundary>
      </TodoProvider>
    </Router>
  );
};

export default AppRouter;
