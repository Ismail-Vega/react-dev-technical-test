import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ErrorBoundary from "../components/ErrorBoundary";

const App = lazy(() => import("../App"));
const SideBarLayout = lazy(() => import("../components/SideBarLayout"));
const TodoContainer = lazy(() => import("../components/TodoContainer"));
const TodoListPage = lazy(() => import("../pages/TodoListPage"));

const AppRouter = () => {
  return (
    <Router>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <TodoContainer>
            <SideBarLayout>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/list/:id" element={<TodoListPage />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </SideBarLayout>
          </TodoContainer>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default AppRouter;
