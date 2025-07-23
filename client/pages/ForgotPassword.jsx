import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      // Simulate an async call to your backend
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // On success
      toast.success("Reset link sent to your email!");
      console.log("Reset link sent to:", email);
    } catch (error) {
      toast.error("Failed to send reset email");
      console.error("Error sending reset email:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-lg">
              ✦
            </div>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900">Forgot password?</h2>
          <p className="mt-2 text-sm text-gray-600 text-center">
            No worries, we’ll send you reset instructions.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Reset password
          </button>
        </form>
        <div className="mt-6 text-center">
          <a href="/login" className="text-sm text-blue-600 hover:underline">
            ← Back to log in
          </a>
        </div>
      </div>
    </div>
  );
}
