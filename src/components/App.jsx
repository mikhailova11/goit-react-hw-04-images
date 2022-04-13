import React, {PureComponent} from 'react';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import "../styles.css"
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fetchImages from "../api/fetchImage";


class App extends PureComponent {
  state = {
    showModal: false,
    hits: [],
    value: '',
    status: 'idle',
    activeIndex: 0,
    error: null,
    page: 1
    
  }
//componentDidUpdate всегда делается через  проверку if... так как может зациклиться
   componentDidUpdate(prevProps, prevState) {

    const {value, page, hits} = this.state

    if (hits.length !== 0){
      this.setState({
        status: 'resolve'});
    } else {
      this.setState({ 
        status: 'idle'});
    }

    if(prevState.value !== value){

      this.setState({page: 1,
        status: 'resolve'});
        this.fetchImage()
        
      } else if(prevState.value === value && prevState.page !== page){
        this.setState({status: 'resolve'});
      this.fetchImage()
    }
  }
  

  async fetchImage  () {
    const { page, value } = this.state

    try {
      const hits = await fetchImages(value, page)
     
      console.log(hits.hits)

          if (page === 1) {
            return this.setState({hits: hits.hits})
            
          } else if (page > 1) {
            this.setState(prevState => ({
              hits: [...prevState.hits, ...hits.hits],
            }))
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            });
          }
      
        } catch (error) {
          toast.error('Unexpected error. Try again.');
          this.setState({ error,
            status: 'idle' });
        } 
    }
  

  togleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
      status: 'pending',
    }))
  };
  handleFormSubmit = (value) => {
    this.setState({value})
  };
  activeIdx = (activeIndex) =>{
    this.setState({activeIndex,
      status: 'pending'}) 
  };
  handleClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1}));
    console.log ('click')
  };
  

  
   
  render () {
    const {showModal, status, hits, activeIndex, error} = this.state
    const activeIdx = hits[activeIndex]

    return (
      <div className='App'>

        {error && <p>Whoops, something went wrong: {error.message}</p>}

        <Searchbar  onSubmit={this.handleFormSubmit}/>

        {status === 'pending' && <Loader/>}
        
        {status === 'resolve' && 
        <ImageGallery onClick={this.togleModal} hits={hits} activeIdx={this.activeIdx}/>
        }

        {status === 'resolve' &&   
        <Button onClick={this.handleClickLoadMore}>Load more...</Button>}

        
        {showModal && <Modal onClose={this.togleModal}>
          
          <img src={activeIdx.largeImageURL} alt={activeIdx.tags} />
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
    );
  }
};

export default App
