import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthRedirect from "./components/AuthRedirect";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import Dashboard from "./pages/Dashboard";
import AuthorityDashboard from "./pages/AuthorityDashboard";
import AddComplaint from "./pages/AddComplaint";
import ComplaintsFeed from "./pages/ComplaintsFeed";

import RoleProtectedRoute from "./components/RoleProtectedRoute";


function App() {
  return (
    <Router>
      <Navbar />
      <AuthRedirect />

      {/* Push content below fixed navbar */}
      <div style={{ paddingTop: "80px" }}>
        <Routes>
          {/* 🌍 PUBLIC */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complaints" element={<ComplaintsFeed />} />

          {/* 👤 CITIZEN */}
          <Route
            path="/dashboard"
            element={
              <RoleProtectedRoute allowedRole="citizen">
                <Dashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="/add-complaint"
            element={
              <RoleProtectedRoute allowedRole="citizen">
                <AddComplaint />
              </RoleProtectedRoute>
            }
          />
          

          {/* 🏛️ AUTHORITY */}
          <Route
            path="/authority"
            element={
              <RoleProtectedRoute allowedRole="authority">
                <AuthorityDashboard />
              </RoleProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
