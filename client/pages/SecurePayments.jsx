import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SecurePayments = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      toast.success("Payment successful! (Simulated)");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-black font-medium px-3 py-2 rounded transition-colors border border-gray-200 bg-white shadow-sm self-start"
      >
        <span className="mr-2 text-lg">&#8592;</span> Back
      </button>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Secure Payments</h1>
        <p className="text-gray-600 mb-6 text-center">
          Make payments securely and with confidence. (Demo payment gateway)
        </p>
        <button
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition mb-2 disabled:opacity-60"
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? "Processing..." : "Pay Now"}
        </button>
      </div>
    </div>
  );
};

export default SecurePayments; 