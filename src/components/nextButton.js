import React from 'react'
import './buttons.css'

const nextPhotos = props => {
    return(
        <div id="buttonWrapper">
            <button id="next" onClick={() => props.clickButton()}>Next</button>
        </div>
    )
}

export default nextPhotos;