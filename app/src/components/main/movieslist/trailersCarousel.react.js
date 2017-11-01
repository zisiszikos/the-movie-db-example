import React, {Component} from 'react';
import PubSub from 'pubsub-js';

class TrailersCarousel extends Component {

    constructor(props) {

        super(props);
        this.state = {
            activeTrailer: 0,
            trailers: this.props.trailers || []
        };

        this.handleVideoBlockClick = this.handleVideoBlockClick.bind(this);
        this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
        this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    }

    handleLeftArrowClick(event) {

        var index = this.state.activeTrailer - 1;
        if (index === -1) {
            index = this.state.trailers.length - 1;
        }
        this.setState({
            activeTrailer: index
        });
        event.stopPropagation();
    }

    handleRightArrowClick(event) {

        var index = this.state.activeTrailer + 1;
        if (index === this.state.trailers.length) {
            index = 0;
        }
        this.setState({
            activeTrailer: index
        });
        event.stopPropagation();
    }

    handleVideoBlockClick(event) {

        PubSub.publish('TRAILER CLICKED', {
            videoId: this.state.trailers[this.state.activeTrailer].key
        });

        event.stopPropagation();
    }

    render() {

        var trailer = null;
        var thumbUrl = '';
        if (this.state.trailers.length) {
            trailer = this.state.trailers[this.state.activeTrailer];
            thumbUrl = 'http://img.youtube.com/vi/' + trailer.key + '/mqdefault.jpg';
        }
        var isOnlyOneTrailer = this.state.trailers.length === 1;

        return (
            <div className='trailers-carousel'>
                <h3 className='header-title'>Trailers</h3>
                <div className='carousel'>
                    <div className={'left-arrow ' + (isOnlyOneTrailer ? 'disabled' : '')}
                        onClick={this.handleLeftArrowClick}>
                        <i className='material-icons'>keyboard_arrow_left</i>
                    </div>
                    <div
                        className='video-block'
                        style={{backgroundImage: 'url(' + thumbUrl + ')'}}
                        onClick={this.handleVideoBlockClick}
                    >
                    <i className='material-icons play-icon'>play_circle_outline</i>
                    <p
                        title={trailer && trailer.name}
                        className='trailer-title'>{trailer && trailer.name}</p>
                    </div>
                    <div className={'right-arrow ' + (isOnlyOneTrailer ? 'disabled' : '')}
                        onClick={this.handleRightArrowClick}>
                        <i className='material-icons'>keyboard_arrow_right</i>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrailersCarousel;
