import React, { FunctionComponent, useEffect, useState } from "react"


interface InstagramPostProps {

}

const InstagramPost: FunctionComponent<InstagramPostProps> = () => {
    const [photos, setPhotos] = useState([]);
    const url = `https://www.instagram.com/web/search/topsearch/context=blended&query=kopfsache.by.stephan`


    return (
        <div className="post-wrapper">
            {/* map through our posts here */}
        </div>
    )
}

export default InstagramPost;

