import { useEffect, useState } from "react";
import MusicItem from "./MusicItem";

function Music() {

    const [state, setState] = useState({isFetching: true})

    useEffect(() => {
        async function fetchAndSort() {
            const response = await fetch('http://localhost:1337/api/musics?populate=cover')
            const json = await response.json()
            // Trier les données en fonction de la date de sortie
            const sorted = await json.data.sort((a, b) => new Date(a.attributes.releaseDate) - new Date(b.attributes.releaseDate))
            // Ranger les données de la date la plus récente à la plus ancienne
            const reversed = await sorted.reverse()
            setState({music: reversed, isFetching: false})
        }
        fetchAndSort()
    }, [])

    return (
        state.isFetching ? (
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        ) : (
        <div className="music">
            <ul className="music__list">
            {state.music.map((item, index) => index === 0 ? (
                <div className='music-latest' key={item.id}>
                    <MusicItem  itemName={item.attributes.title} 
                                itemCover={item.attributes.cover.data.attributes.formats.small.url}
                                itemLink={item.attributes.link}
                                className="latest" />
                </div>
            ) : (
                    <li className="music__list--item" key={item.id}>
                        <MusicItem  itemName={item.attributes.title} 
                                    itemCover={item.attributes.cover.data.attributes.formats.small.url}
                                    itemLink={item.attributes.link} />
                    </li>
            )
            )}
            </ul>
        </div>
        )
    )
}

export default Music