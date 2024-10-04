import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";
import UsersPage from "./pages/UsersPage";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create/:type" element={<CreatePage />} />
        <Route path="dashboard/users" element={<UsersPage />} />
      </Routes>
    </>
  );
};

export default App;
