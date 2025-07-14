// CheckoutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CheckoutForm = ({ camp }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [processing, setProcessing] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (formData) => {
    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    try {
      // 1. Create payment intent from backend
      const { data } = await axiosSecure.post("/create-payment-intent", {
        amount: camp.fees,
      });

      const clientSecret = data.clientSecret;

      // 2. Confirm payment with Stripe
      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        // 3. Save payment info to DB
        const paymentInfo = {
          campId: camp._id,
          email: formData.email,
          name: formData.name,
          transactionId: paymentIntent.id,
          amount: camp.fees,
          date: new Date(),
        };

        await axiosSecure.post("/payments", paymentInfo);

        toast.success("✅ Payment successful!");
        reset();
        setProcessing(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("❌ Something went wrong.");
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("name")}
        defaultValue={camp.participantName}
        className="input input-bordered w-full"
        readOnly
      />
      <input
        {...register("email")}
        defaultValue={camp.participantEmail}
        className="input input-bordered w-full"
        readOnly
      />
      <p className="text-lg font-medium text-gray-700">Amount: ${camp.fees}</p>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": { color: "#aab7c4" },
            },
            invalid: { color: "#9e2146" },
          },
        }}
      />

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn bg-green-700 text-white w-full"
      >
        {processing ? "Processing..." : `Pay $${camp.fees}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
