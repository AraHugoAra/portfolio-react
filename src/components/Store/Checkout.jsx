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
        const stripe = await loadStripe(pk_test_51L3zJ3JWSzv4jRsNPi5xczPF4CttCtdPk4qCdgz0jqfZBwEebJ9t8zhANYED6xodsEVyVbe3FQBpTF391TUAmNDj00tUy9FSzF)
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