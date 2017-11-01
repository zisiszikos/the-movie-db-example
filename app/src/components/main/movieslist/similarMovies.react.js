import React, {Component} from 'react';

class SimilarMovies extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        return (
            <div className='similar-movies'>
                <h3 className='similar-movies-header-title'>Similar movies</h3>
                <div className='similar-movies-list'>
                    {this.props.simiralMovies && this.props.simiralMovies.map((movie, index) => {

                        return <SimilarMovie
                            key={index}
                            conf={this.props.conf}
                            movie={movie} />
                    })}
                </div>
            </div>
        );
    }
}

function SimilarMovie (props) {

    var imgUrl;
    if (!props.movie.backdrop_path) {
        imgUrl = '/movie-default.jpg';
    } else {
        var imageSize = props.conf.images.backdrop_sizes[1];
        imgUrl = props.conf.images.base_url +
            imageSize + props.movie.backdrop_path;
    }

    var movieYear = (new Date(props.movie.release_date)).getFullYear();

    return (
        <div className='similar-movie'>
            <div
                className='left-block'
                style={{backgroundImage: 'url(' + imgUrl + ')'}}></div>
            <div className='right-block'>
                <h4 className='similar-movie-title'>{props.movie.title}</h4>
                <p className='score'>{props.movie.vote_average.toFixed(1)}</p>
                <p className='year'>({movieYear})</p>
            </div>
        </div>
    );
}

export default SimilarMovies;
