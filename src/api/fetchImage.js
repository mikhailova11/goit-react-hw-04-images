
import axios from "axios";

const API_KEY =  '24874837-d0558540b09f2ee4305703a66';
const BASE_URL = 'https://pixabay.com/api/';

    const fetchImages = async (value, page) => {
    const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${value}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`)
    const hits = await response.data
    
    return hits
}

export default fetchImages