import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import AlumniDashboard from "../pages/Dashboard/AlumniDashboard";
import StudentDashboard from "../pages/Dashboard/StudentDashboard";
import Profile from "../pages/Alumni/Profile";
import Education from "../pages/Alumni/Education";
import WorkExperience from "../pages/Alumni/WorkExperience";
import EventsList from "../pages/Events/EventsList";
import EventDetail from "../pages/Events/EventDetail";
import JobsList from "../pages/Jobs/JobsList";
import JobCreate from "../pages/Jobs/JobCreate";
import Donate from "../pages/Donations/Donate";
import DonationsList from "../pages/Donations/DonationsList";
import Feed from "../pages/Messages/Feed";
import AdminOnly from "../components/AdminOnly";
import { useAuth } from "../hooks/useAuth";

export default function RoutesIndex() {
  const { role } = useAuth();
  const dash =
    role === "admin" ? (
      <AdminDashboard />
    ) : role === "alumni" ? (
      <AlumniDashboard />
    ) : (
      <StudentDashboard />
    );

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<ProtectedRoute>{dash}</ProtectedRoute>} />

      <Route
        path="/alumni/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumni/education"
        element={
          <ProtectedRoute>
            <Education />
          </ProtectedRoute>
        }
      />
      <Route
        path="/alumni/work"
        element={
          <ProtectedRoute>
            <WorkExperience />
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute>
            <EventsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/events/:id"
        element={
          <ProtectedRoute>
            <EventDetail />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <JobsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/jobs/create"
        element={
          <ProtectedRoute>
            <JobCreate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/donations"
        element={
          <ProtectedRoute>
            <DonationsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/donate"
        element={
          <ProtectedRoute>
            <Donate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/messages"
        element={
          <ProtectedRoute>
            <Feed />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminOnly>
              <AdminDashboard />
            </AdminOnly>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
