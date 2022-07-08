import useFetch from "../../hooks/useFetch"

function PreviewMusic() {

    const { loading, data } = useFetch('https://portfolio-trebor-strapi.herokuapp.com/api/musics?populate=cover')

    return (
        <div className='preview-music'>
        <h1 className='preview-music__title'>Music</h1>
            {loading ? (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            ) : (
            <div className='preview-music__content'>
                <div>
                    <img    className='preview-music__content--cover'
                            src={`${data.data[0].attributes.cover.data.attributes.formats.small.url}`} 
                            alt={`cover-${data.data[0].attributes.title}`} />
                </div>
                <div className='preview-music__content--infos'>
                    <h2>Available Now</h2>
                    <h1>{data.data[0].attributes.title}</h1>
                    <a href={data.data[0].attributes.link} rel="noreferrer" target="_blank" ><button>Stream</button></a>
                </div> 
            </div>)}
            <a className='preview-music__view-all' href="/music"><h2>View All Releases</h2></a>  
        </div>
    )
}

export default PreviewMusic