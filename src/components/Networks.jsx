import useFetch from '../hooks/useFetch'

function Networks({className}) {

    const { loading, data } = useFetch('https://portfolio-trebor-strapi.herokuapp.com/api/networks?populate=icon,iconWhite')

    return (
        loading === true ? (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        ) : (
        <div className={className} >
            <ul className='networks'>
                {data.data.map(item => 
                    (<li key={`link-${item.id}`}>
                        <a href={item.attributes.link} rel="noreferrer" target="_blank">
                        <img    className="networks__logo" key={`img-${item.id}`} 
                                src={className === "footer__networks" ? `${item.attributes.iconWhite.data.attributes.url}` : `${item.attributes.icon.data.attributes.url}`}
                                alt={item.attributes.name} />
                        </a>
                    </li>)
                    )}
            </ul>
        </div>)
    )
}

export default Networks