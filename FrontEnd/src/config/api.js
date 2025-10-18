// API Configuration
export const API_CONFIG = {
  // BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://hackathonbackend-omega.vercel.app/api",
  ENDPOINTS: {
    // Authentication endpoints
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    VERIFY_OTP: "/auth/verifyOtp",
    RESEND_OTP: "/auth/resendOtp",
    FORGOT_PASSWORD_OTP: "/auth/forgotPasswordOtp",
    VERIFY_FORGOT_PASSWORD_OTP: "/auth/verifyforgotPasswordOtp",
    REQUEST_PASSWORD: "/auth/requestPassword",
    CHANGE_PASSWORD: "/auth/changePassword",

    // User endpoints
    GET_USER: "/users/profile",
    UPDATE_USER: "/users/profile",
    USER_ANALYTICS: "/users/analytics",

    // Family member endpoints
    FAMILY_MEMBERS: "/family-members",
    FAMILY_MEMBER_BY_ID: "/family-members/:id",
  },
};

export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

export const API_BASE_URL = API_CONFIG.BASE_URL;
export const API_ENDPOINTS = API_CONFIG.ENDPOINTS;
