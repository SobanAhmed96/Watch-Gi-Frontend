import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Check = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`/api/v1/isLogin`, {
          withCredentials: true, // Needed if cookie is HTTP-only
        });

        if (!res.data.success) {
          navigate("/Login");
        }
      } catch (error) {
        console.log("Not Authenticated");
        navigate("/Login"); // Redirect even on error
      }
    };

    checkAuth();
  }, [navigate]);

  return null; // No need to render an empty div
};

export default Check;
