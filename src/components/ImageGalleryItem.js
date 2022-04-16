import  {useState} from 'react';
import '../styles.css';


export default function ImageGalleryItem({activeIdx, hits, onClick}){
    const [activIndex, setActivIndex] = useState(0);
    

    const activeIndex = (activeIndex) =>{
        activeIdx(activeIndex)
        setActivIndex(activIndex)  
    }
    
    return (
        hits.map(({id, webformatURL, tags}, index) => (
            <li className="ImageGalleryItem" key={index} onClick={()=> activeIndex(index)}  >
                <img className="ImageGalleryItem-image" src={webformatURL} alt={tags}  onClick={onClick}/>
            </li>))
    )
}

