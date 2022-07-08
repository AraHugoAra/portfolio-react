import { useState } from 'react'
import useTitle from '../../hooks/useTitle'
import Checkout from './Checkout'

function Cart({cart, updateCart}) {

    const [isOpen, setIsOpen] = useState(false)
    const initialTotal = 0
    const totalCart = cart.reduce((acc, currItem) => acc + (currItem.price * currItem.amount), initialTotal)
  
    useTitle(totalCart)

    return (
        <>
        <div className={isOpen ? "cart active" : "cart"}>
        <div className='cart__top'>
            <img    className='cart__top--button-close'
                    onClick={() => setIsOpen(false)}
                    src="https://portfolio-trebor.s3.eu-west-3.amazonaws.com/thumbnail_close_1_c80dcc1c65_7997aa0b0c.png?width=512&height=512"
                    alt="button-close-cart"/>
            <h2 className='cart__top--title'>Cart</h2>
        </div> 
            <div className='cart__list'>
            {cart.length === 0 ? (
                <div className='cart__list--empty'>Cart is empty.</div>
                ):(
                <> 
                    <ul>
                    {cart.map(item => 
                        <li key={`item-${item.name}`}>
                            <img src={`${item.url}`} alt={`icon-${item.name}`} /><div>{item.name}<br />{item.price}€ x{item.amount}</div>
                        </li>
                    )}
                    </ul>
                    <h3 className='cart__list--total'>Total: {totalCart}€</h3>
                    <div className='cart__buttons'>
                        <button className='cart__buttons--empty' onClick={() => updateCart([])} >Empty cart</button>
                        <Checkout cart={cart} />
                    </div>
                </>
                )}
            </div>
        </div>
        <div className={!isOpen ? 'cart__button-open' : 'cart__button-open active'}>
            <img    onClick={() => setIsOpen(true)}
                    src="https://portfolio-trebor.s3.eu-west-3.amazonaws.com/thumbnail_shopping_bag_48a98e1ee0_6a0885f244.png?width=512&height=512"
                    alt="button-open-cart"/>
            <span className={cart.length === 0 ? "dot--hidden" : "dot--cart"} ></span> 
        </div>
        </>
    ) 
}

export default Cart