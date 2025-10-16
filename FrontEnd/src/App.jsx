// Routes
import ProtectedRoutes from "./Routes/ProtectedRoutes";

// Navbars
import Navbar from "./components/PublicComponents/navbar/Navbar";
import DashboardNavbar from "./components/ProtectedComponents/dashboardNavbar/DashboardNavbar";

// Public Pages
import Home from "./pages/PublicPages/home/Home";
import VerifyOtp from "./pages/PublicPages/VerifyOtp/VerifyOtp";
import ForgotPassword from "./pages/PublicPages/forgotPassword/orgotPassword";
import SignIn from "./pages/PublicPages/login/ignin";
import Signup from "./pages/PublicPages/register/signup";
import Footer from "./components/PublicComponents/footer/Footer";

// Protected Pages
import Dashboard from "./pages/ProtectedPages/dashboard/Dashboard";
import ResetPassword from "./pages/ProtectedPages/ResetPassword/esetPassword";

import { Route, Routes, useLocation } from "react-router-dom";

function App() {
  const dashboardAllowed = ["/", "/signin", "/signup"];
  const allowFooter = ["/", "/home"];
  const dashboardNavbarAllowed = ["/dashboard"];

  const location = useLocation();
  const isDashboardAllowed = dashboardAllowed.includes(location.pathname);
  const isDashboardNavbarAllowed = dashboardNavbarAllowed.includes(
    location.pathname
  );
  const isFooterAllowed = allowFooter.includes(location.pathname);
  return (
    <>
      {isDashboardAllowed && <Navbar />}
      {isDashboardNavbarAllowed && <DashboardNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/VerifyOtp" element={<VerifyOtp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      {isFooterAllowed && <Footer />}
    </>
  );
}

export default App;
