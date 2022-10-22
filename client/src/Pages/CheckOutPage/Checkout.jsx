import React, { useEffect } from 'react';
import { CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { GetCart } from '../../Actions/BuyA';
import { useDispatch } from 'react-redux'
const Checkout = ({TotalPrice,ProductsInCart}) => {
    const Stripe = useStripe()
    const Element = useElements();
    const Navigate = useNavigate();
    const [IntentId, setIntentId] = useState();
    const dispatch = useDispatch()
    const [AskConfirm, setAskConfirm] = useState(false)
    const [paymentRequest, setPaymentRequest] = useState(null);


    const [ClientSecret, setClientSecret] = useState();


    const appearance = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "#fff",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#fce883" },
                "::placeholder": { color: "#87bbfd" }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (AskConfirm) {
            return
        }
        if (!Element || !Stripe) {
            return;
        }

        const { error, paymentMethod } = await Stripe.createPaymentMethod({
            type: 'card',
            card: Element?.getElement(CardElement),
        });
        console.log(error, paymentMethod)

        await axios.post('/paymentIntent/confirm', { IntentId, ProductsInCart, Price: TotalPrice })
    };

    useEffect(() => {
        // Navigate('/login', { state: { path: window.location.pathname } })
    }, [Navigate])

   
    useEffect(() => {
        if (TotalPrice !== 0 && TotalPrice !== undefined) {
            axios.post('/paymentIntent/create',
                {
                    payment_method_types: ["card"], Price: TotalPrice
                })
                .then((res) => {
                    setClientSecret(res.data.client_secret)
                    setIntentId(res.data.id)
                })
                .catch((error) => { console.log(error) });

        }
    }, [TotalPrice])


    useEffect(() => {
        dispatch(GetCart())
    }, [dispatch])
    useEffect(() => {
        if (Stripe && TotalPrice) {
            const pr = Stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Demo total',
                    amount: TotalPrice,
                },
                requestPayerName: true,
                requestPayerEmail: true,
            })

            pr.canMakePayment().then(result => {
                if (result) {

                    setPaymentRequest(pr);
                }
            });
        }

    }, [Stripe, TotalPrice,]);

    useEffect(() => {
        // if (paymentRequest && ClientSecret && Stripe) {
            paymentRequest?.on('paymentmethod', async (ev) => {
                // Confirm the PaymentIntent without handling potential next actions (yet).
                const { paymentIntent, error: confirmError } = await Stripe.confirmCardPayment(
                    ClientSecret,
                    { payment_method: ev.paymentMethod.id },
                    { handleActions: false }
                );
                console.log(paymentIntent, confirmError)
                if (confirmError) {
                    // Report to the browser that the payment failed, prompting it to
                    // re-show the payment interface, or show an error message and close
                    // the payment interface.
                    ev.complete('fail');
                } else {
                    // Report to the browser that the confirmation was successful, prompting
                    // it to close the browser payment method collection interface.
                    ev.complete('success');
                    // Check if the PaymentIntent requires any actions and if so let Stripe.js
                    // handle the flow. If using an API version older than "2019-02-11"
                    // instead check for: `paymentIntent.status === "requires_source_action"`.
                    if (paymentIntent.status === "requires_action") {
                        // Let Stripe.js handle the rest of the payment flow.
                        const { error } = await Stripe.confirmCardPayment(ClientSecret);
                        if (error) {
                            // The payment failed -- ask your customer for a new payment method.
                        } else {
                            // The payment has succeeded.
                        }
                    } else {
                        // The payment has succeeded.
                    }
                }
            })
        // }

    }, [paymentRequest, ClientSecret, Stripe])

    useEffect(() => {

    }, [Stripe, paymentRequest, ClientSecret])
    // console.log(paymentRequest)
    return (
        <form onSubmit={handleSubmit} className='CheckoutForm'>

            {paymentRequest !== null && <PaymentRequestButtonElement options={{ paymentRequest }} />}
           


            <div>
                <CardElement options={appearance} />
                {!AskConfirm
                    ? <button onClick={() => { setAskConfirm(true) }} disabled={!Stripe || !Element}>
                        Pay
                    </button>
                    : <button type="submit" onClick={() => { setAskConfirm(false); }} disabled={!Stripe || !Element}>
                        Confirm Payment
                    </button>}
            </div>

        </form>
    )
}

export default Checkout