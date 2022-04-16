import {useState, useEffect} from 'react';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import "../styles.css"
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from "../api/fetchImage";


export default function App () {
  const [showModal, setShowModal] = useState(false);
  const [hits, setHits] = useState([]);
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('idle');
  const [activeIndex, setActiveIndex] = useState(0);
  const [page, setPage] = useState(1);



  
  const fetchImage = async () => {
    
    try {
      
      let hits = await  fetchImages(value, page);
      
         if (page > 1) {
                setHits(prevHits => [...prevHits, ...hits.hits])
                
              }
              if (hits.totalHits === 0) {
                toast.info('No pictures found for your request');
                setStatus('idle')
                return;
              }
        
              if (page === 1) {
                setHits(hits.hits);
              }
        
              if (page > 1) {
                setHits(prev => [...prev, ...hits.hits]);
                window.scrollTo({
                  top: document.documentElement.scrollHeight,
                  behavior: 'smooth',
                });
              }
            } catch (error) {
              console.log(error);
              return Promise.reject(error);
            }
            setStatus('resolve')
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          };
        
          const handleFormSubmit = value => {
            setValue(value);
            setPage(1);
            setHits([]);
          };

        const  togleModal = () => {
          setStatus ('pending')
          setShowModal(!showModal)
          if(showModal){
          setStatus('resolve')}
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
          }

        const activeIdx = (activeIndex) =>{
          setActiveIndex(activeIndex)
          setStatus ('pending')
        };
          
        useEffect(() => {
          if (!value) {
            return;
          } 
          
          fetchImage();
          setStatus('pending')
      
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [value, page]);
    
        return (
          
          <div className='App'>
    
            <Searchbar  onSubmit={handleFormSubmit}/>
    
            {status === 'pending' && <Loader/>}
            
            {status === 'resolve' &&
            <ImageGallery onClick={togleModal} hits={hits} activeIdx={activeIdx}/>}
            
    
              
            {status === 'resolve' &&
              <Button onClick={() => setPage(prevPage => (prevPage + 1))}>Load more...</Button>}
    
            {showModal && <Modal onClose={togleModal}>
              
              <img src={hits[activeIndex].largeImageURL} alt={hits[activeIndex].tags} />
            </Modal>} 
    
            <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
    
          </div>
        )
            
}