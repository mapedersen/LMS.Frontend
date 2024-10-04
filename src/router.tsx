import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import UsersPage from "./pages/UsersPage";
import AddCourse from "./components/AddCourse";
import AddModule from "./components/AddModule";
import AddActivity from "./components/AddActivity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <App />, // Use App as the layout component
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "create/:type",
        element: <CreatePage />,
      },
      {
        path: "add-course",
        element: <AddCourse />,
      },
      {
        path: "add-module/:courseId",
        element: <AddModule />,
      },
      {
        path: "add-activity/:moduleId",
        element: <AddActivity />,
      },
    ],
  },
]);

export default router;
