import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import {debounce} from 'general/helpers';

class Search extends Component {

    constructor(props) {

        super(props);

        this.state = {
            query: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearchDebounced = debounce(function () {

            PubSub.publish('SEARCH QUERY CHANGED', this.state.query);
        }, 500);
    }

    handleChange(event) {

        this.setState({query: event.target.value});
        this.handleSearchDebounced();
    }

    render() {

        return (
            <div className='search'>
                <i className='material-icons'>search</i>
                <input type='text' placeholder='Search for movies...' onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Search;
