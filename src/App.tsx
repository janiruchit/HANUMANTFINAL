import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentMenu from "./pages/student/StudentMenu";
import StudentPayments from "./pages/student/StudentPayments";
import StudentComplaints from "./pages/student/StudentComplaints";
import StudentNotifications from "./pages/student/StudentNotifications";
import StudentProfile from "./pages/student/StudentProfile";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminStudents from "./pages/admin/AdminStudents";
import AdminFees from "./pages/admin/AdminFees";
import AdminMenu from "./pages/admin/AdminMenu";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminUpi from "./pages/admin/AdminUpi";

const queryClient = new QueryClient();

const AuthenticatedRoutes = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === 'admin') {
    return (
      <AppLayout>
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/fees" element={<AdminFees />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="/admin/upi" element={<AdminUpi />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/menu" element={<StudentMenu />} />
        <Route path="/student/payments" element={<StudentPayments />} />
        <Route path="/student/complaints" element={<StudentComplaints />} />
        <Route path="/student/notifications" element={<StudentNotifications />} />
        <Route path="/student/profile" element={<StudentProfile />} />
        <Route path="*" element={<Navigate to="/student" replace />} />
      </Routes>
    </AppLayout>
  );
};

const PublicRoutes = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/student'} replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  if (user) return <AuthenticatedRoutes />;
  return <PublicRoutes />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
