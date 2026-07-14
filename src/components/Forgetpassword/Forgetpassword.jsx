import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Forgetpassword() {
  const navigate = useNavigate();

  // step: 1 = enter email, 2 = enter code, 3 = enter new password
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  function sendCode(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        setSuccessMsg("A reset code has been sent to your email");
        setStep(2);
      })
      .catch((error) => {
        setLoading(false);
        console.dir(error);
        setErrorMsg(
          error.response?.data?.message || "Something went wrong while sending the code"
        );
      });
  }

  // Step 2: verify the code
  function verifyCode(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        setSuccessMsg("Code verified successfully");
        setStep(3);
      })
      .catch((error) => {
        setLoading(false);
        console.dir(error);
        setErrorMsg(
          error.response?.data?.message || "Invalid code, please try again"
        );
      });
  }

  // Step 3: set new password
  function resetPassword(e) {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword,
      })
      .then((response) => {
        setLoading(false);
        console.log(response);
        setSuccessMsg("Password changed successfully, redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((error) => {
        setLoading(false);
        console.dir(error);
        setErrorMsg(
          error.response?.data?.message || "Something went wrong while resetting the password"
        );
      });
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Forgot Password</h2>

      {errorMsg ? (
        <div className="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 mb-4">
          {errorMsg}
        </div>
      ) : null}

      {successMsg ? (
        <div className="bg-green-100 border border-green-200 text-sm text-green-800 rounded-lg p-4 mb-4">
          {successMsg}
        </div>
      ) : null}

      {/* Step 1: Email */}
      {step === 1 && (
        <form onSubmit={sendCode}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Send Code"
            )}
          </button>
        </form>
      )}

      {/* Step 2: Verify Code */}
      {step === 2 && (
        <form onSubmit={verifyCode}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">Reset Code</label>
            <input
              type="text"
              placeholder="Enter the code sent to your email"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Verify Code"
            )}
          </button>
        </form>
      )}

      {/* Step 3: New Password */}
      {step === 3 && (
        <form onSubmit={resetPassword}>
          <div className="mb-4">
            <label className="block mb-2 font-medium">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
