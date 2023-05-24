import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import Stripe from "stripe";
import express from "express";

import cors from "cors";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173", //change this
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/payment", async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return res.status(200).send(paymentIntent);
  } catch (error) {
    console.log({ error });

    return res.status(404).send(error);
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on a port 3000");
});
