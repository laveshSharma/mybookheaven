import React from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";

// Load Stripe with the public key
const stripePromise = loadStripe('pk_test_51Qvb9nG4cQOVMnxSE2GdvH3pTeXTYp6Q5bDvQij3ramnGtTG8gk4fvAWwOAgtRjE2Tx7dpmXrmKGLzRGEM4xim6Y00aV1fDIyX');

const Checkout = () => {
    return (
        <section className="checkout-wrapper">
            {/* Ensure user authentication before checkout */}
            <Authenticator>
                {/* Provide Stripe Elements context */}
                <Elements stripe={stripePromise}>
                    <section>
                        <h2>Time to Checkout?</h2>
                        <CheckoutForm />
                    </section>
                </Elements>
            </Authenticator>
        </section>
    );
};

export default Checkout;
