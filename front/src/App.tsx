import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import { AuthProvider, useAuth } from "./services/Auth";
import IndexView from "./views/IndexView/IndexView";
import DashboardView from "./views/DashboardView/DashboardView";
import Register from "./pages/Register/Register";

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<IndexView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route element={<ProtectedRoute element={<DashboardView />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
