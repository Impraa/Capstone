import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import Button from "../Button/Button";
import {
  FormContainer,
  PaymentButton,
  PaymentFormContainer,
} from "./PaymentForm.styles";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { selectCartTotal } from "../../store/cart/cart-selector";
import { selectCurrentUser } from "../../store/user/user-selector";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const cartTotal = useSelector(selectCartTotal);
  const user = useSelector(selectCurrentUser);

  const [isProcessingPayment, setIsProcessingPayment] =
    useState<boolean>(false);

  const paymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("http://localhost:3000/payment", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    }).then((res) => res.json());

    const { client_secret } = response;

    console.log(client_secret);

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
        billing_details: {
          name: (user ? user.displayName : "Guest") as string | undefined,
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment successful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer
        onSubmit={(e) => {
          paymentHandler(e);
        }}
      >
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          disabled={isProcessingPayment}
          buttonType="inverted"
          properties={{ type: "submit" }}
        >
          Pay now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
