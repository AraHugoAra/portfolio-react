import { useEffect, useState } from "react"
import VideoItem from "./VideoItem"

function Videos() {

    const [state, setState] = useState({isFetching: true})

    useEffect(() => {
        fetch('https://portfolio-trebor-back.herokuapp.com/videos')
            .then(data => data.json())
            .then(json => setState({videos: json, isFetching: false}))
            .catch(err => console.log(err))
    }, [])

    return (
        state.isFetching ? (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        ) : (
        <div className = "videos">
            <ul className = "videos__list">
            {state.videos.data.map(item => 
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