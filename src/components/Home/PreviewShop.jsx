import { useEffect, useState } from "react"

function PreviewShop() {

    const [state, setState] = useState({isFetching: true})
    const [display, setDisplay] = useState("notdisplayed")

    useEffect(() => {
        async function fetchAndSort() {
            const response = await fetch('https://portfolio-trebor-back.herokuapp.com/store')
            const json = await response.json()
            // Trier les données en fonction de l'id
            const sorted = await json.data.sort((a, b) => a.id - b.id)
            setState({items: sorted, isFetching: false})
        }
        fetchAndSort()
    }, [])

    const showButton = e => {
        e.preventDefault();
        setDisplay("displayed");
    };
    
    const hideButton = e => {
        e.preventDefault();
        setDisplay("notdisplayed");
    };

    return (
        <div className="preview-shop">
            <h1 className="preview-shop__title">Store</h1>
            {state.isFetching ? (
                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            ) : (
                <div className="preview-shop__content">
                        {state.items.map((item, index) => ((item.attributes.bestSale === true) || (index === state.items.length -1))  && (
                        <div    className="preview-shop__content--productbox"
                                key={`div-${item.id}`}  
                                onMouseEnter={e => showButton(e)}
                                onMouseLeave={e => hideButton(e)}>
                                <img className="preview-shop__content--cover" key={`img-${item.id}`} src={`${item.attributes.image.data.attributes.formats.medium.url}`} alt="displayed-items" />  
                                <a className={`preview-shop__content--${display}`} href="/store" key={`link-${item.id}`}><button>Buy Now</button></a>
                        </div>      
            ))}
                </div>
            )}
                <a className="preview-shop__view-all" href="/store"><h2>Shop All</h2></a>
        </div>
    )
}

export default PreviewShop