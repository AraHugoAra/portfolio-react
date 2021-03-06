function MusicItem({itemName, itemCover, itemLink, className}) {

    return (
        <div className={className !== "latest" ? "music-item" : "music-latest"}>
            <img    className={className === "latest" ? "music-latest__cover" : "music-item__cover"} 
                    src={`${itemCover}`} alt={`${itemName}-cover`} />
            <div className={className === "latest" ? "music-latest__infos" : "music-item__infos"}>
                <h2 className={className === "latest" ? "music-latest__infos--title" : "music-item__infos--title"} >{itemName}</h2>
                <a href={itemLink} rel="noreferrer" target="_blank"><button>Stream Now</button></a>
            </div>
        </div>
    )
}

export default MusicItem