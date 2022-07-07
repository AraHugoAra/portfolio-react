import { loadStripe } from "@stripe/stripe-js"
import { useState } from 'react'

function Checkout({cart}) {

    const [isLoading, setLoading] = useState(false)
    const [stripeError, setStripeError] = useState(null)
   
    const items = []

    const checkoutOptions = {
        lineItems: items,
        mode: "payment",
        successUrl: `${window.location.origin}/store/success`,
        cancelUrl: `${window.location.origin}/store/cancel`
    }

    const redirectToCheckout = async () => {
        // Disable button
        setLoading(true)
        if (cart.length === 0) {
            alert('cart is empty')
            setLoading(false)
            return
        }
        // Push items from cart to checkoutOption's lineItems
        cart.map(item => items.push(({price: item.stripeApi, quantity: item.amount})))
        // Load API key and redirectToCheckout
        const stripe = await loadStripe('pk_live_51L3zJ3JWSzv4jRsNjElaTh2SZ12YNclxkbQI9cS9PUxpg2z6de2FKolE5B78sDXvaC6ZZhMaiqQrzzuYSe2MDUzK007LNiFI2D')
        const { error } = await stripe.redirectToCheckout(checkoutOptions)
        console.log('Stripe checkout error ', error)
        // Error handling
        if (error) setStripeError(error.message)
        setLoading(false)
        if (stripeError) alert(stripeError)
    }

    return(<div>
        <button className="cart__buttons--checkout" onClick={redirectToCheckout} disabled={isLoading} >{!isLoading ? "Checkout" : "Loading..."}</button>
    </div>)
}

export default Checkout