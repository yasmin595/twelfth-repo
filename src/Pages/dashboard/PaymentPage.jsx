import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// ✅ Load Stripe publishable key from env
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { campId } = useParams();
  const axiosSecure = useAxiosSecure();

  // ✅ Fetch camp data with TanStack Query
  const { data: camp, isLoading, isError, error } = useQuery({
   
    queryKey: ["camp-payment", campId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/registered-camp/${campId}`);
      return res.data;
    },
    enabled: !!campId, // prevent query if campId is missing
  });
 console.log(error);
  if (isLoading) {
    return <p className="text-center">🔄 Loading payment details...</p>;
  }

  if (isError || !camp || !camp.participantName) {
    return (
      <p className="text-center text-red-500">
        ⚠️ Failed to load camp details. Please try again later.
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-green-700">Complete Payment</h2>

      {/* ✅ Protect Elements and CheckoutForm with data check */}
      <Elements stripe={stripePromise}>
        <CheckoutForm camp={camp} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
