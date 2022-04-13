import React, {PureComponent} from 'react';
import '../styles.css';


class ImageGalleryItem extends PureComponent {
    state = {
        activeIndex: 0
    }

    activeIndex = (activeIndex) =>{
        this.props.activeIdx(activeIndex)
        this.setState({activeIndex})
        
    }


    render () {
        const {hits, onClick} = this.props
        

        return (
            hits.map(({id, webformatURL, tags}, index) => (
              <li className="ImageGalleryItem" key={id} onClick={()=> this.activeIndex(index)}  >
                  <img className="ImageGalleryItem-image" src={webformatURL} alt={tags}  onClick={onClick}/>
              </li>))
          )
    }
    
}

export default ImageGalleryItem