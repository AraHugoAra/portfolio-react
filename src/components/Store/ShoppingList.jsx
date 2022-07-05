import { useEffect, useState } from "react"
import ShopItem from "./ShopItem"

function ShoppingList({activeCategory, cart, updateCart}) {

    const [state, setState] = useState({isFetching: true})

    useEffect(() => {
        async function fetchAndSort() {
            const response = await fetch('https://portfolio-trebor-back.herokuapp.com/store')
            const json = await response.json()
            // Trier les données en fonction de l'id
            const sorted = await json.data.sort((a, b) => a.id - b.id)
            // Ranger les données de la date la plus récente à la plus ancienne
            const reversed = await sorted.reverse()
            setState({items: reversed, isFetching: false})
        }
        fetchAndSort()
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