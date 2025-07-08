import React from "react";

const VerifyEmailPage = () => {
  const email = localStorage.getItem("pendingVerificationEmail");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Verify your email</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {email ? (
            <>A verification link has been sent to <span className="font-semibold">{email}</span>. Please check your inbox and follow the instructions to activate your account.</>
          ) : (
            <>A verification link has been sent to your email. Please check your inbox and follow the instructions to activate your account.</>
          )}
        </p>
        <p className="text-gray-500 text-sm">Didn't receive the email? Check your spam folder or try signing up again.</p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
