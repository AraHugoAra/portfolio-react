import useFetch from "../../hooks/useFetch"

function Categories({activeCategory, setActiveCategory}) {

    const { loading, data } = useFetch('https://portfolio-trebor-strapi.herokuapp.com/api/categories')

    function handleReset() {
        setActiveCategory([])
        document.getElementById('WAV').checked = false
        document.getElementById('CD').checked = false
        document.getElementById('Vinyl').checked = false
        document.getElementById('Photo').checked = false
    }

    function handleCheck(e) {
        const filteredCurrentCategory = activeCategory.filter((category) => category !== e.target.value )
        e.target.checked === true ? (
            setActiveCategory([...activeCategory, e.target.value])
        ) : (
            setActiveCategory(filteredCurrentCategory)
    )}

    return (
        loading ? (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        ) : (
        <div className="categories">
            {data.data.map((item) => (
            <div className="categories__input" key={item.id}>
                <input className="categories__input--checkbox" onChange={(e) => handleCheck(e)} type="checkbox" value={item.attributes.name} name={item.attributes.name} id={item.attributes.name} />
                <label htmlFor={item.attributes.name}>{item.attributes.name}</label>
            </div>))}
            <button className="categories__button-reset" onClick={() => handleReset()}>Reset</button>
        </div>
        )
    )
}

export default Categories