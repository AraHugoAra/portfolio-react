import ButtonCarousel from './ButtonCarousel'
import { useState, useEffect } from 'react'

function Carousel() {

    const [state, setState] = useState({isFetching: true})
    const [current, setCurrent] = useState(1)

    useEffect(() => {
        fetch('http://localhost:1337/api/videos?populate=video')
            .then(res => res.json())
            .then(json => setState({
                            videos: json,
                            isFetching: false}))
        }, [])


    return (<div>
            {state.isFetching === true ? (
            <div>
                Loading...
            </div> 
            ) : (
            <div>
                {state.videos.data.map((item, index) => index === current && 
                    <div key={index}>
                        <video width="600px" heigth="600px" controls>
                            <source src={`http://localhost:1337${item.attributes.video.data.attributes.url}`} />
                        </video>
                    </div>)
                } 
                <ButtonCarousel action="+" content="next" current={current} setCurrent={setCurrent} /* videosLength={state.videos.data.length} */ />
                <ButtonCarousel action="-" content="prev" current={current} setCurrent={setCurrent} /* videosLength={state.videos.data.length} */ />
            </div>
            )}
    </div>)
}

export default Carousel