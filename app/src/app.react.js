import React, {Component} from 'react';
import AppHeader from 'components/header/header.react';
import Main from 'components/main/main.react';
import VideoModal from 'components/global/videoModal.react';

class App extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        return (
            <div className='app'>
                <AppHeader />
                <Main />
                <VideoModal />
            </div>
        );
    }
}

export default App;
