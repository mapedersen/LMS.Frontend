import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import CreatePage from "./pages/CreatePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/create/:type" element={<CreatePage />} />
    </Routes>
  );
};

export default App;
