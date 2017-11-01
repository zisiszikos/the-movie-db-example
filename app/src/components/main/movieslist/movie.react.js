import React, {Component} from 'react';
import PubSub from 'pubsub-js';
import TrailersCarousel from './trailersCarousel.react';
import ReviewsList from './reviewsList.react';
import SimilarMovies from './similarMovies.react';
import api from 'general/api';

class Movie extends Component {

    constructor(props) {

        super(props);

        this.state = {
            movieDetails: null
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.movie.id !== this.props.movie.id) {
            this.setState({
                movieDetails: null
            });
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    async componentDidUpdate() {

        if (this.props.movie.isExpanded && !this.state.movieDetails) {
            await Promise.all([
                api.fetchMovieTrailers(this.props.movie.id),
                api.fetchMovieReviews(this.props.movie.id),
                api.fetchSimilarMovies(this.props.movie.id)
            ]).then(async data => {

                await this.setStateAsync({
                    movieDetails: {
                        trailers: data[0],
                        reviews: data[1],
                        simiralMovies: data[2]
                    }
                });
            });
        }
    }

    handleClick() {

        PubSub.publish('MOVIE CLICKED', {
            movieIndex: this.props.index
        });
    }

    createBackdropImageUrl() {

        var imgUrl;
        if (!this.props.movie.backdrop_path) {
            imgUrl = '/movie-default.jpg';
        } else {
            var imageSize = this.props.conf.images.backdrop_sizes[1];
            imgUrl = this.props.conf.images.base_url +
                imageSize + this.props.movie.backdrop_path;
        }
        return imgUrl;
    }

    getMovieIndex() {

        var isEven = this.props.index % 2 == 0;
        return !isEven && this.props.movie.isExpanded ? this.props.index - 2 : this.props.index;
    }

    render() {

        var movieYear = (new Date(this.props.movie.release_date)).getFullYear();
        var genresString = this.props.movie.genre_names.join(', ');

        return (
            <div className={'movie ' + ((this.props.movie.isExpanded) ? 'expanded' : '')}
                data-index={this.props.index}
                style={{order: this.getMovieIndex()}}
                onClick={this.handleClick}>
                <div className='movie-box'
                    style={{backgroundImage: 'url(' + this.createBackdropImageUrl() + ')'}}>
                    <div className='tint'></div>
                    <div className='movie-score'>{this.props.movie.vote_average.toFixed(1)}</div>
                    <h3 className='movie-title'>{this.props.movie.title} ({movieYear})</h3>
                    <p className='movie-genres'>{genresString}</p>
                    <p className='movie-overview'>{this.props.movie.overview}</p>
                    {this.props.movie.isExpanded &&
                        this.state.movieDetails &&
                        this.state.movieDetails.reviews &&
                        this.state.movieDetails.reviews.length &&
                        <ReviewsList reviews={this.state.movieDetails.reviews} />
                    }
                    {this.props.movie.isExpanded &&
                        this.state.movieDetails &&
                        this.state.movieDetails.trailers &&
                        this.state.movieDetails.trailers.length &&
                        <TrailersCarousel
                            trailers={this.state.movieDetails.trailers} />
                    }
                    {this.props.movie.isExpanded &&
                        this.state.movieDetails &&
                        this.state.movieDetails.simiralMovies &&
                        this.state.movieDetails.simiralMovies.length &&
                        <SimilarMovies
                            conf={this.props.conf}
                            simiralMovies={this.state.movieDetails.simiralMovies} />
                    }
                </div>
            </div>
        );
    }
}

export default Movie;
