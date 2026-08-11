import { Routes, Route } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import TripPlanner from "./pages/TripPlanner";
import Profile from "./pages/Profile";
import ExpenseTracker from "./pages/ExpenseTracker";
import TripHistory from "./pages/TripHistory";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Explore from "./pages/Explore";
import DestinationDetails from "./pages/DestinationDetails";
import TripLive from "./pages/TripLive";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trip-planner"
        element={
          <ProtectedRoute>
            <TripPlanner />
          </ProtectedRoute>
        }
      />
      <Route
        path="/expense-tracker"
        element={
          <ProtectedRoute>
            <ExpenseTracker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trip-history"
        element={
          <ProtectedRoute>
            <TripHistory />
          </ProtectedRoute>
        }
      />
       <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore"
        element={
            <ProtectedRoute>
                <Explore />
            </ProtectedRoute>
        }
    />
    <Route

path="/destination"

element={

<ProtectedRoute>

<DestinationDetails/>

</ProtectedRoute>

}

/>

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="*" element={<NotFound />} />
      <Route
          path="/trip-live"
          element={<TripLive />}
      />
    </Routes>
  );
}

export default AppRoutes;