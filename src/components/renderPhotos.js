import React from 'react'
import './renderPhotos.css'
import './buttons.css'

const renderPhoto = props => {
    return (<li className="photo">
                <div className="imageWrapper">
                    <img src={`http://source.unsplash.com/${props.element.slug}`} className="imgInSlide" alt="" /> 
                    <div className="imageOverlay">
                        <button onClick={() => props.clickDownload(props.element.download, props.element.slug)}>Download</button>
                    </div>
                </div>
            </li>)
}

export default renderPhoto;