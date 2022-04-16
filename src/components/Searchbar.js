import {useState} from 'react';
import { toast } from 'react-toastify';
import Button from './Button'
import '../styles.css';


export default function Searchbar ({onSubmit}) {
    const [value, setValue] = useState('');

    const handleValueChange = (e) => {
        setValue(e.currentTarget.value.toLowerCase())
     }
    const handleSubmit =(e) => {
         e.preventDefault();
 
         if(value.trim() === ''){
             toast.error('Enter the search word');
             return;
         }
        onSubmit(value)
        setValue("")
    }
 
    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={handleSubmit}>
                <Button type='button' onClick={handleSubmit}>Search</Button>
                <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={value}
                    onChange={handleValueChange}
                />
            </form>
        </header>
    )
}
