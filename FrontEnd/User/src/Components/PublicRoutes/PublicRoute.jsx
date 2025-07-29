import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PublicRoute = ({ element }) => {
  const [isVerified, setIsVerified] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:3001/api/users/loggedInUser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.data && res.data.data.verified) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (e) {
        console.error(e.message);
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };
    checkUserStatus();
  }, []);

  if (isVerified) {
    return <Navigate to="/dashboard" />;
  }
  return element;
};

export default PublicRoute;
