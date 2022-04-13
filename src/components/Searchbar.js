import React, {Component} from 'react';
import {  toast } from 'react-toastify';
import Button from './Button'
import '../styles.css';


class Searchbar extends Component {
    state = {
        value: '',
    }
    handleValueChange = (e) => {
       this.setState({
           value: e.currentTarget.value.toLowerCase()
       })
    }
    handleSubmit =(e) => {
        const {value} = this.state;

        e.preventDefault();

        if(value.trim() === ''){
            toast.error('Enter the search word');
            return;
        }
        this.props.onSubmit(value)
        this.setState({
            value: "",
        })
    }

      render (){
          const {value} = this.state;
          
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <Button onClick={this.handleSubmit}>Search</Button>
                    <input
                    className="SearchForm-input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={value}
                    onChange={this.handleValueChange}
                    />
                </form>
            </header>
            )
      }
}

export default Searchbar