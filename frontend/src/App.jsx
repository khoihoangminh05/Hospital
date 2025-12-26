import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import { Navbar } from "./components/Navbar";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Toaster } from "sonner";
import { Hero } from "./components/Hero";
import { Appointment } from "./components/Appointment";
import { AdminDashboard } from "./components/AdminDashboard";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const { user } = useAuth();

  useEffect(() => {
    
    const adminPages = ['admin-dashboard'];
    const doctorPages = ['doctor-dashboard'];
    const patientPages = ['patient-dashboard'];
    const cashierPages = ['cashier-dashboard'];

    if (adminPages.includes(currentPage) && (!user || user.role !== "admin")) {
      setCurrentPage("home");
    }

    if (currentPage === "profile" && !user) {
      setCurrentPage("login");
    }

    if (
      (currentPage === "login" || currentPage === "register") &&
      user
    ) {
      setCurrentPage("home");
    }
  }, [currentPage, user]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Hero setCurrentPage={setCurrentPage} />;
      case "login":
        return <Login setCurrentPage={setCurrentPage} />;
      case "register":
        return <Register setCurrentPage={setCurrentPage} />;
      case 'appointment':
        return <Appointment setCurrentPage={setCurrentPage} />;

      case 'admin-dashboard':
        return user?.role === 'admin' ? <AdminDashboard setCurrentPage={setCurrentPage} /> : <Hero setCurrentPage={setCurrentPage} />;
      default:
        return <Hero setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div >
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main>{renderPage()}</main>

      <Footer setCurrentPage={setCurrentPage} />
      <ScrollToTop />
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
     <AuthProvider>
      <AppContent />
     </AuthProvider>
  );
} 
