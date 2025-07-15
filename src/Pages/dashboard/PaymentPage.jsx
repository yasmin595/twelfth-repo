import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CheckoutForm from "./CheckoutForm";

// ✅ Load Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { id } = useParams(); // Make sure route path is /dashboard/payment/:id
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch participant's registered camp info using TanStack Query
  const {
    data: camp,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["camp-payment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camp/${id}`);
      return res.data;
    },
    enabled: !!id, // ensures the query runs only when `id` exists
  });

  // ✅ Handle loading state
  if (isLoading) return <p className="text-center py-10">⏳ Loading payment details...</p>;

  // ✅ Handle error state
  if (isError)
    return (
      <p className="text-center text-red-600 py-10">
        ❌ Error: {error?.message || "Something went wrong!"}
      </p>
    );

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">💳 Complete Payment</h2>

      <div className="bg-white border border-green-300 p-4 rounded shadow-sm mb-6">
        <p><strong>Camp:</strong> {camp.campName}</p>
        <p><strong>Doctor:</strong> {camp.doctor}</p>
        <p><strong>Location:</strong> {camp.location}</p>
        <p><strong>Fees:</strong> ${camp.campFees}</p>
        <p><strong>Participant:</strong> {camp.participantName}</p>
      </div>

      {/* ✅ Stripe Elements Wrapper */}
      <Elements stripe={stripePromise}>
        <CheckoutForm camp={camp} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
