import '../styles.css';
import { ThreeDots } from  'react-loader-spinner'

const Loader = () => {
    return ( 
        <div className='Loader'>
        <ThreeDots color="#dc06f0" height={80} width={80} />
        </div>
    )
}

export default Loader

