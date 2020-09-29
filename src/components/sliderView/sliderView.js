import React from 'react'
import RenderPhotos from '../renderPhotos/renderPhotos'
import NextButton from '../button/nextButton'
import './sliderView.css'
import Axios from 'axios'

class SliderView extends React.Component {
    state = {
        Urls: [],
        UrlDisplayed: [],
        WholeArray: []
    }

    componentDidMount(){          
        const displayedSlugs = [];
        
        fetch('https://picsum.photos/v2/list')
        .then(res => res.json())
        .then(data =>  {
        const urls = data.map(photo =>
                ({
                    id: photo.id,
                    slug: (photo.url).slice(photo.url.lastIndexOf('/') + 1),
                    download: photo.download_url
                })
            );      
            urls.forEach((item, i) => {
                item.id = i++;
            }); 
            this.setState({WholeArray: [...urls]})

            for (let i = 0; i < 3; i++) {
                let newElement = urls.shift();
                displayedSlugs.push(newElement);
            };
            this.setState({Urls: urls}); 
            this.setState({UrlDisplayed: displayedSlugs});    
            
        })
        .catch(error => console.log(error))   
    }

    nextImages(){
        const displayedSlugs = [];
        
        const urls = this.state.Urls
        for (let i = 0; i < 3; i++) {
            let newElement = urls.shift();
            displayedSlugs.push(newElement);
        }
        this.setState({Urls: urls}); 
        this.setState({UrlDisplayed: displayedSlugs}); 
    
        if (urls <=0){
            this.setState({Urls: [...this.state.WholeArray]}) ;
        }
    }

    download(response, slug){
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${slug}.png`)
        document.body.appendChild(link)
        link.click()
    }

    downloadFoto (downloadURL, slug){
      Axios({
        method: 'get',
        url: downloadURL,
        responseType: 'arraybuffer'
      })
      .then(response => {
        this.download(response, slug)  
      })
      .catch(() => console.log('error'))
    }

    render () {        
        const urlsToRender = this.state.UrlDisplayed.map(e => {
            return <RenderPhotos element={e}  key={e.id} clickDownload={this.downloadFoto.bind(this)} />
        })
        const button = <NextButton clickButton={this.nextImages.bind(this)} />
        
        return (
            <main id="sliderView">
                <ul>
                    {urlsToRender} 
                </ul>
                {button}
            </main>
        )
    }
}

export default SliderView;