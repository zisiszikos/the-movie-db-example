import React, {Component} from 'react';
import Search from './search.react';

class AppHeader extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        return (
            <div className='header'>
                <div className='left'>
                    <h2 className='header-title'>The Movie DB</h2>
                </div>
                <div className='right'>
                    <Search />
                </div>
            </div>
        );
    }
}

export default AppHeader;
