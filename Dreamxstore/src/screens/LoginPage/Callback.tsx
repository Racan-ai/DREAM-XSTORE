import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userData = searchParams.get("user");

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        localStorage.setItem("dreamx_user", JSON.stringify({
          ...user,
          token,
        }));
        window.dispatchEvent(new Event("storage"));
        navigate("/", { replace: true });
      } catch (error) {
        navigate("/signup?error=invalid-user-data", { replace: true });
      }
    } else {
      navigate("/signup?error=google-auth-failed", { replace: true });
    }
    // eslint-disable-next-line
  }, [navigate, searchParams]);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Processing...</h2>
      <p>Please wait while we complete your signup.</p>
      {typeof window !== "undefined" && (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => navigate("/")}
        >
          Go to Home
        </button>
      )}
    </div>
  );
}

export default Callback;
