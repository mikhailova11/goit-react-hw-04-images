import { useEffect} from 'react';
import { createPortal } from 'react-dom';
import '../styles.css';


const modalRoot = document.querySelector('#modal-root')

export default function Modal({onClose, children}) {
    

    const handleOverlayClick = e => {
        if(e.currentTarget === e.target){
            onClose()
        }
        
    }


    useEffect(
        ()=>{
        const handleKeyDown = e => {
            if(e.code === 'Escape'){
                onClose()
            }
            
        }

        window.addEventListener('keydown', handleKeyDown)
    return () => {
        window.removeEventListener('keydown', handleKeyDown)
    }
 
   })

    return createPortal(
        <div className="Overlay" onClick={handleOverlayClick}>
            <div className="Modal">
                {children}
            </div>
        </div>,
        modalRoot
    )
}

