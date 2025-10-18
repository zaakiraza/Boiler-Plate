// Routes
import ProtectedRoutes from "./Routes/ProtectedRoutes";

// Navbars
import Navbar from "./components/PublicComponents/navbar/Navbar";
import DashboardNavbar from "./components/ProtectedComponents/dashboardNavbar/DashboardNavbar";

// Public Pages
import Home from "./pages/PublicPages/home/Home";
import About from "./pages/PublicPages/about/About";
import Services from "./pages/PublicPages/services/Services";
import Contact from "./pages/PublicPages/contact/Contact";
import VerifyOtp from "./pages/PublicPages/VerifyOtp/VerifyOtp";
import ForgotPassword from "./pages/PublicPages/forgotPassword/orgotPassword";
import SignIn from "./pages/PublicPages/login/ignin";
import Signup from "./pages/PublicPages/register/signup";
import Footer from "./components/PublicComponents/footer/Footer";

// Protected Pages
import Dashboard from "./pages/ProtectedPages/dashboard/Dashboard";
import ResetPassword from "./pages/ProtectedPages/ResetPassword/esetPassword";
import ProfilePage from "./pages/ProtectedPages/ProfilePage/ProfilePage";
import Settings from "./pages/ProtectedPages/settings/Settings";
// import PdfAnalyzer from "./components/PdfAnalyzer/PdfAnalyzer";

import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./styles/theme.css";

function App() {
  const navbarAllowed = [
    "/",
    "/about",
    "/services",
    "/contact",
    "/signin",
    "/signup",
  ];
  const allowFooter = ["/", "/home", "/about", "/services", "/contact"];
  const dashboardNavbarAllowed = [
    "/dashboard",
    "/analyze-pdf",
    "/profile",
    "/settings",
  ];

  const location = useLocation();
  const isNavbarAllowed = navbarAllowed.includes(location.pathname);
  const isDashboardNavbarAllowed = dashboardNavbarAllowed.includes(
    location.pathname
  );
  const isFooterAllowed = allowFooter.includes(location.pathname);
  return (
    <ThemeProvider>
      {isNavbarAllowed && <Navbar />}
      {isDashboardNavbarAllowed && <DashboardNavbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/VerifyOtp" element={<VerifyOtp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="/analyze-pdf" element={<PdfAnalyzer />} /> */}
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      {isFooterAllowed && <Footer />}
    </ThemeProvider>
  );
}

export default App;
