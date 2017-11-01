import React, {Component} from 'react';
import PubSub from 'pubsub-js';

class VideoModal extends Component {

    constructor(props) {

        super(props);
        this.state = {
            active: false,
            videoId: null
        };

        this.handleVideoModalClick = this.handleVideoModalClick.bind(this);
    }

    handleVideoModalClick() {

        this.closeModal();
    }

    closeModal() {

        this.setState({
            active: false,
            videoId: null
        });
    }

    onTrailerClicked(msg, data) {

        this.setState({
            active: true,
            videoId: data.videoId
        });
    }

    componentWillMount() {

        this.trailerClickedToken = PubSub.subscribe('TRAILER CLICKED', this.onTrailerClicked.bind(this));
    }

    componentWillUnmount() {

        PubSub.unsubscribe(this.trailerClickedToken);
    }

    render() {

        return (
            <div
                className={'video-modal ' + ((this.state.active) ? '' : 'inactive')}
                onClick={this.handleVideoModalClick}>
                <div className='inner-container'>
                    <div className='iframe-container'>
                        <i className='material-icons close-icon'>close</i>
                        {this.state.videoId &&
                            <iframe
                                id='video_frame'
                                type='text/html'
                                width='100%'
                                height='100%'
                                src={'//www.youtube.com/embed/' + this.state.videoId +
                                    '?rel=0&amp;enablejsapi=1&amp;version=3&amp;autoplay=1' +
                                    '&amp;showinfo=0&amp;controls=1&amp;autohide=1&amp;iv_load_policy=3'}
                                    frameBorder='0'
                                    allowFullScreen
                            ></iframe>
                        }
                        </div>
                </div>
            </div>
        );
    }
}

export default VideoModal;
