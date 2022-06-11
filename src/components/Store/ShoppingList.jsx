import { useEffect, useState } from "react"
import ShopItem from "./ShopItem"

function ShoppingList({activeCategory, cart, updateCart}) {

    const [state, setState] = useState({isFetching: true})

    useEffect(() => {
        fetch("http://localhost:1337/api/shop-items?populate=image,category")
            .then(data => data.json())
            .then(json => setState({items: json.data, isFetching: false}))
    }, [])

    return (
        <div>
            <ul className="items-list">
            {state.isFetching ? 
                (<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                ) : (
                activeCategory.length !== 0 ? (
                    state.items.map(item => activeCategory.indexOf(`${item.attributes.category.data.attributes.name}`) !== -1  && 
                        (<li key={item.id}> 
                            <ShopItem   itemUrl={item.attributes.image.data.attributes.url}
                                        itemName={item.attributes.name}
                                        itemId={item.id}
                                        itemPrice={item.attributes.price}
                                        itemInStock={item.attributes.inStock}
                                        cart={cart} 
                                        updateCart={updateCart}
                                        itemStripeApi={item.attributes.stripeApi}
                            />
                        </li>)
                )) : (
                    state.items.map(item => 
                        <li key={item.id}>
                            <ShopItem   itemUrl={item.attributes.image.data.attributes.url}
                                        itemName={item.attributes.name}
                                        itemId={item.id}
                                        itemPrice={item.attributes.price}
                                        itemInStock={item.attributes.inStock}
                                        cart={cart} 
                                        updateCart={updateCart}
                                        itemStripeApi={item.attributes.stripeApi}
                            />
                        </li>)
                )

            )}
            </ul>
        </div>
    )
}

export default ShoppingList