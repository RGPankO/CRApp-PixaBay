import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios'
import ImageResults from './../image-results/ImageResults';

class Search extends Component {

    state = {
        searchText: 'cute dog',
        amount: 5,
        apiURL: 'https://pixabay.com/api',
        apiKey: '8817172-ab60d77ed11db01fafc03179d',
        images: []
    }

    onTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, this.refreshImageList);
    }

    refreshImageList = () => {
        if(this.state.searchText.length){
            axios.get(`${this.state.apiURL}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}`)
            .then(this.updateImagesList)
            .catch(err => console.log(err))
        } else {
            this.setState({images: []})
        }
    }

    updateImagesList = res => this.setState({images: res.data.hits})

    onAmountChange = (e, index, value) => this.setState({amount: value}, this.refreshImageList);

    componentDidMount(){
        this.refreshImageList();
    }

  render() {
    console.log(this.state);
    return (
      <div>
        <TextField
            name="searchText"
            value={this.state.searchText}
            onChange={this.onTextChange}
            floatingLabelText="Search For Images"
            fullWidth={true}
        />
        <br/>
        <SelectField
            name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br/>
        {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}
      </div>
    )
  }
}

export default Search;