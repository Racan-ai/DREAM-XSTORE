import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyEmailTokenPage = () => {
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("Please check your email for a verification link.");
  const navigate = useNavigate();
  const location = useLocation();

  // Simulate auth context login
  const login = (token: string, user: { id: string; username: string; email: string }) => {
    localStorage.setItem("dreamx_user", JSON.stringify({
      firstName: user.username,
      email: user.email,
      avatarUrl: undefined,
      token,
    }));
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const email = localStorage.getItem("pendingVerificationEmail");

    if (!token && !email) {
      setError("No verification in progress. Please sign up first.");
      setVerifying(false);
      return;
    }

    if (token) {
      // If token is present, verify
      const verifyEmail = async () => {
        // @ts-ignore
        const apiUrl = import.meta.env.VITE_NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
        try {
          const response = await fetch(`${apiUrl}/auth/verify-email`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token })
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Verification failed");
          }
          // Clear pending email and login
          localStorage.removeItem("pendingVerificationEmail");
          login(data.token, data.user);
          setMessage("Email verified successfully! Redirecting to your profile...");
          setTimeout(() => navigate("/profile"), 2000);
        } catch (err: any) {
          setError(err.message || "Verification failed");
        } finally {
          setVerifying(false);
        }
      };
      verifyEmail();
    } else {
      // Just show waiting message if we have pending email but no token
      setMessage("Please check your email for the verification link.");
      setVerifying(false);
    }
  }, [location, navigate]);

  // Periodically check verification status if waiting
  useEffect(() => {
    if (verifying) return;
    const email = localStorage.getItem("pendingVerificationEmail");
    if (!email) return;

    const checkVerificationStatus = async () => {
      // @ts-ignore
      const apiUrl = import.meta.env.VITE_NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
      try {
        const response = await fetch(`${apiUrl}/auth/check-verification-status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email })
        });
        if (response.ok) {
          const data = await response.json();
          if (data.isVerified) {
            localStorage.removeItem("pendingVerificationEmail");
            login(data.token, data.user);
            navigate("/profile");
          }
        }
      } catch (error) {
        // Ignore polling errors
      }
    };
    const interval = setInterval(checkVerificationStatus, 5000);
    return () => clearInterval(interval);
  }, [verifying, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-lg">
        <div className="text-center">
          {verifying ? (
            <>
              <h1 className="text-2xl font-bold mb-4">Verifying your email...</h1>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
            </>
          ) : error ? (
            <>
              <h1 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h1>
              <p className="text-gray-600 mb-4">{error}</p>
              <div className="mt-4">
                <button
                  className="text-purple-600 hover:text-purple-700 underline"
                  onClick={() => navigate('/signup')}
                >
                  Return to signup
                </button>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4 text-green-600">
                {message.includes('verified') ? 'Email Verified!' : 'Verify Your Email'}
              </h1>
              <p className="text-gray-600">{message}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailTokenPage;
