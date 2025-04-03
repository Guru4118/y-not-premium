import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import Navbar from "./Navbar";
import QuickLinks from "./Quicklinks";

const stripePromise = loadStripe("your-publishable-key-here");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/payment/create-payment-intent`, {
        amount: 1000, // Example amount, replace dynamically
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      setError("Payment failed. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen"> 
      <div className="bg-gray-900">
        <div className="container mx-auto p-6">
          <Navbar />
          <h2 className="text-2xl font-bold text-center mb-6">Payment</h2>

          {success ? (
            <p className="text-green-600 text-center">Payment Successful!</p>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-lg">
              <CardElement className="p-4 border rounded-md" />
              {error && <p className="text-red-600 mt-2">{error}</p>}
              <button
                type="submit"
                className="w-full mt-4 bg-blue-500 text-white py-2 rounded-md"
                disabled={!stripe || loading}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="mt-auto"> {/* Pushes QuickLinks to the bottom */}
        <QuickLinks />
      </div>
    </div>
  );
};

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
