import PreviewMusic from "./PreviewMusic"
import PreviewVideos from "./PreviewVideos"
import PreviewShop from "./PreviewShop"
import Subscribe from "./Subscribe"
import useTitle from "../../hooks/useTitle"

function Home() {

    useTitle()

    return (
        <div>
            <PreviewMusic />
            <PreviewShop />
            <PreviewVideos />
            <Subscribe />
        </div>
    )
}

export default Home