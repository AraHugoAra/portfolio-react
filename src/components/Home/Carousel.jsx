import ButtonCarousel from './ButtonCarousel'
import { useState, useRef } from 'react'
import useFetch from '../../hooks/useFetch'

function Carousel() {

    const { loading, data } = useFetch('https://portfolio-trebor-back.herokuapp.com/videos')
    const [current, setCurrent] = useState(1)
    const [displayed, setDisplayed] = useState(true)
    const vidRef = useRef(null)

    function handleMute() {
        vidRef.current.muted=false;
        vidRef.current.volume=0.6;
        setDisplayed(false)

    }

    return (<div  className='preview-videos__carousel'>
            {loading  ? (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            ) : (
            <div  className='preview-videos__videos'>
                {data.data.map((item, index) => index === current && 
                    <div className='preview-videos__videos--current' key={index}>
                        <video  ref={vidRef} 
                                controls autoPlay
                                muted={true} 
                                poster={`${item.attributes.poster.data.attributes.url}`} >
                            <source src={`${item.attributes.video.data.attributes.url}`} />
                        </video>
                    </div>)
                }
                {data.data.map((item, index) => (current === 0) ? 
                    ((index === current +1 || index === 5) &&
                        <div className={index === current +1 ? "preview-videos__videos--next" : "preview-videos__videos--prev"} key={index}>
                            <video  muted={true}
                                    poster={`${item.attributes.poster.data.attributes.url}`}  >
                                <source src={`${item.attributes.video.data.attributes.url}`} />
                            </video>
                        </div>
                    ) : (
                    (index === current +1 || index === current -1) && 
                        <div className={index === current +1 ? "preview-videos__videos--next" : "preview-videos__videos--prev"} key={index}>
                            <video  muted={true} 
                                    poster={`${item.attributes.poster.data.attributes.url}`}  >
                                <source src={`${item.attributes.video.data.attributes.url}`} />
                            </video>
                        </div>)
                    )
                }
            </div>
            )}
            <div className='preview-videos__button'>
            <ButtonCarousel action="-" current={current} setCurrent={setCurrent} setDisplayed={setDisplayed} />
            <button className="preview-videos__button--mute" onClick={handleMute} hidden={!displayed} >🔉</button>
            <ButtonCarousel action="+" current={current} setCurrent={setCurrent} setDisplayed={setDisplayed} />
            </div>
    </div>)
}

export default Carousel