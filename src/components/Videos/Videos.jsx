import useFetch from "../../hooks/useFetch"
import useTitle from "../../hooks/useTitle"
import VideoItem from "./VideoItem"

function Videos() {

    const { loading, data } = useFetch('https://portfolio-trebor-back.herokuapp.com/videos')

    useTitle()

    return (
        loading ? (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        ) : (
        <div className = "videos">
            <ul className = "videos__list">
            {data.data.map(item => 
                <li key={item.id}>
                    <VideoItem  itemName={item.attributes.title} 
                                itemVideo={item.attributes.video.data.attributes.url}
                                itemPoster={item.attributes.poster.data.attributes.url} />
                </li>
            )}
            </ul>
        </div>
        )
    )
}

export default Videos