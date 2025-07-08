
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = (): JSX.Element => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Simulate login context
  const login = (token: string, user: { id: string; username: string; email: string }) => {
    // Store user in localStorage for demo
    localStorage.setItem("dreamx_user", JSON.stringify({
      firstName: user.username,
      email: user.email,
      avatarUrl: undefined,
      token,
    }));
    window.dispatchEvent(new Event("storage"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });
      console.log(response)

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Invalid email or password');
      }

      const data = await response.json();
      console.log(data);
      // Save token separately for checkout flow
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      // Use the login function from auth context
      login(data.token, {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email
      });
      navigate('/trending');
    } catch (err: any) {
        console.log("Login error:", err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  // Google Sign-In handler (from provided code)
  const handleGoogleLogin = () => {
    // @ts-ignore
    const apiUrl = import.meta.env.VITE_NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Sign in to your account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email address"
            />
            <input
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          <span className="mx-2 text-gray-400 dark:text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <button
          type="button"
          onClick={() => handleGoogleLogin()}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_17_40)">
              <path d="M47.5 24.5C47.5 22.6 47.3 20.8 47 19H24V29.5H37.4C36.7 33.1 34.2 36 30.7 37.8V43H38.5C43.1 39 47.5 32.5 47.5 24.5Z" fill="#4285F4"/>
              <path d="M24 48C30.6 48 36.2 45.8 40.2 42.2L32.7 36.8C30.7 38.1 28.1 38.9 24 38.9C17.7 38.9 12.2 34.7 10.3 29.2H2.5V34.8C6.5 42.1 14.6 48 24 48Z" fill="#34A853"/>
              <path d="M10.3 29.2C9.7 27.9 9.3 26.5 9.3 25C9.3 23.5 9.7 22.1 10.3 20.8V15.2H2.5C0.9 18.2 0 21.5 0 25C0 28.5 0.9 31.8 2.5 34.8L10.3 29.2Z" fill="#FBBC05"/>
              <path d="M24 9.1C28.1 9.1 30.7 10.8 32.1 12.1L40.3 4.1C36.2 0.7 30.6-1.5 24-1.5C14.6-1.5 6.5 4.4 2.5 11.7L10.3 17.3C12.2 11.8 17.7 7.6 24 7.6V9.1Z" fill="#EA4335"/>
            </g>
            <defs>
              <clipPath id="clip0_17_40">
                <rect width="48" height="48" fill="white"/>
              </clipPath>
            </defs>
          </svg>
          Sign in with Google
        </button>
        <div className="text-center mt-4">
          <p>
            Don't have an account?{' '}
            <button className="text-indigo-600 dark:text-indigo-400 hover:underline" onClick={() => navigate('/signup')}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
