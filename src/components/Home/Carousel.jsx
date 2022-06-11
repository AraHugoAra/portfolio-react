import ButtonCarousel from './ButtonCarousel'
import { useState, useEffect, useRef } from 'react'

function Carousel() {

    const [state, setState] = useState({isFetching: true})
    const [current, setCurrent] = useState(1)
    const [displayed, setDisplayed] = useState(true)
    const vidRef = useRef(null)

    useEffect(() => {
        fetch('http://localhost:1337/api/videos?populate=video,poster')
            .then(res => res.json())
            .then(json => setState({
                            videos: json,
                            isFetching: false}))
        }, [])

    function handleMute() {
        vidRef.current.muted=false;
        vidRef.current.volume=0.6;
        setDisplayed(false)

    }

    return (<div  className='preview-videos__carousel'>
            {state.isFetching === true ? (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            ) : (
            <div  className='preview-videos__videos'>
                {state.videos.data.map((item, index) => index === current && 
                    <div className='preview-videos__videos--current' key={index}>
                        <video  ref={vidRef} 
                                width="600px" heigth="600px" 
                                controls autoPlay
                                muted={true} 
                                poster={`http://localhost:1337${item.attributes.poster.data.attributes.url}`} >
                            <source src={`http://localhost:1337${item.attributes.video.data.attributes.url}`} />
                        </video>
                    </div>)
                }
                {state.videos.data.map((item, index) => (current === 0) ? 
                    ((index === current +1 || index === 5) &&
                        <div className={index === current +1 ? "preview-videos__videos--next" : "preview-videos__videos--prev"} key={index}>
                            <video  width="400px" heigth="400px" 
                                    muted={true}
                                    poster={`http://localhost:1337${item.attributes.poster.data.attributes.url}`}  >
                                <source src={`http://localhost:1337${item.attributes.video.data.attributes.url}`} />
                            </video>
                        </div>
                    ) : (
                    (index === current +1 || index === current -1) && 
                        <div className={index === current +1 ? "preview-videos__videos--next" : "preview-videos__videos--prev"} key={index}>
                            <video  width="400px" heigth="400px" 
                                    muted={true} 
                                    poster={`http://localhost:1337${item.attributes.poster.data.attributes.url}`}  >
                                <source src={`http://localhost:1337${item.attributes.video.data.attributes.url}`} />
                            </video>
                        </div>)
                    )
                }
            </div>
            )}
            <button className="preview-videos__button--mute" onClick={handleMute} hidden={!displayed} >🔉</button>
            <ButtonCarousel action="+" current={current} setCurrent={setCurrent} setDisplayed={setDisplayed} />
            <ButtonCarousel action="-" current={current} setCurrent={setCurrent} setDisplayed={setDisplayed} />
    </div>)
}

export default Carousel