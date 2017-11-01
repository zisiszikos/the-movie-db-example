import React, {Component} from 'react';
import MoviesList from './movieslist/movieslist.react';
import PubSub from 'pubsub-js';
import {scrollTo, debounce} from 'general/helpers';
import api from 'general/api';

class Main extends Component {

    constructor(props) {

        super(props);
        this.state = {
            lastExpandedMovieIndex: -1,
            expandedMovieIndex: -1,
            genres: [],
            configuration: {},
            movies: []
        };

        this.lastPage = 0;
        this.mounted = false;
        this.handleContainerScroll = this.handleContainerScroll.bind(this);
        this.handleScrollDebounced = debounce(async (scrollPercentage) => {

            if (scrollPercentage >= 75) {
                this.lastPage += 1;
                await this.doTheFetchMagic();
            }
        }, 100);
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve);
        });
    }

    handleContainerScroll(event) {

        var scrollPercentage = 100 * event.target.scrollTop /
            (event.target.scrollHeight - event.target.clientHeight);

        this.handleScrollDebounced(scrollPercentage);
    }

    async onSearchQueryChanged(msg, data) {

        if ((!this.search_query && !!data) ||
            (this.search_query)) {
            this.modeChanged = true;
            this.lastPage = 0;
        }

        this.search_query = data;

        var el = this.node.querySelector('.main-container');
        scrollTo(el, 0, 200);

        await this.doTheFetchMagic();
    }

    async onMovieClicked(msg, data) {

        if (data.movieIndex === this.state.expandedMovieIndex) {
            var movies = this.state.movies.slice();
            movies[data.movieIndex].isExpanded = false;
            await this.setStateAsync({
                lastExpandedMovieIndex: this.state.expandedMovieIndex,
                expandedMovieIndex: -1,
                movies: movies
            });
        } else {
            await this.setStateAsync({
                expandedMovieIndex: data.movieIndex,
                movies: this.state.movies.map((movie, index) => {

                    movie.isExpanded = data.movieIndex === index;
                    return movie;
                })
            });
        }
    }

    componentDidUpdate() {

        var el = this.node.querySelector('.main-container');
        var movieEl;
        if (this.state.expandedMovieIndex > -1) {
            movieEl = el.querySelector('.movie[data-index="' +
            this.state.expandedMovieIndex + '"]');
            scrollTo(el, movieEl.offsetTop - el.offsetTop, 200);
        } else if (this.state.lastExpandedMovieIndex > -1) {
            movieEl = el.querySelector('.movie[data-index="' +
            this.state.lastExpandedMovieIndex + '"]');
            scrollTo(el, movieEl.offsetTop - el.offsetTop, 200);
        }
    }

    componentWillMount() {

        this.searchQueryToken = PubSub.subscribe('SEARCH QUERY CHANGED', this.onSearchQueryChanged.bind(this));
        this.movieClickedToken = PubSub.subscribe('MOVIE CLICKED', this.onMovieClicked.bind(this));
    }

    async componentDidMount() {

        var [conf, genres] = await Promise.all([
            api.fetchConfiguration(),
            api.fetchGenres()
        ]);

        await this.setStateAsync({
            configuration: conf,
            genres: genres
        });
        this.mounted = true;

        await this.doTheFetchMagic();
    }

    componentWillUnmount() {

        PubSub.unsubscribe(this.searchQueryToken);
        PubSub.unsubscribe(this.movieClickedToken);
    }

    shouldComponentUpdate() {

        return this.mounted;
    }

    async doTheFetchMagic() {

        let moviesNew;
        let movies = await this.fetchMovies();

        if (movies.length) {
            if (this.modeChanged) {
                this.modeChanged = false;
                moviesNew = movies;
            } else {
                moviesNew = this.state.movies.concat(movies);
            }

            for (var k = 0; k < moviesNew.length; k++) {

                let movie = moviesNew[k];
                movie.isExpanded = false;

                movie.genre_names = [];

                for (var i = 0; i < movie.genre_ids.length; i++) {

                    let genre = this.state.genres.filter(genre_item => {

                        return genre_item.id === movie.genre_ids[i];
                    })[0];

                    if (genre) {
                        movie.genre_names.push(genre.name);
                    }
                }
            }

            await this.setStateAsync({
                lastExpandedMovieIndex: -1,
                expandedMovieIndex: -1,
                movies: moviesNew
            });

        } else {
            await this.setStateAsync({
                lastExpandedMovieIndex: -1,
                expandedMovieIndex: -1,
                movies: []
            });
        }
    }

    async fetchMovies() {

        let movies;
        if (!this.search_query) {
            movies = await api.fetchInTheaterMovies(this.lastPage);
        } else {
            movies = await api.fetchSearchMovie(this.lastPage, this.search_query);
        }

        return movies;
    }

    render() {

        let listTitle = !this.search_query
            ? 'In Theaters'
            : 'Movie search results';

        var movieList;
        if (this.state.movies.length) {
            movieList = <MoviesList {...this.state}/>;
        } else {
            movieList = <h3 className='empty-movies-list'>No movies found</h3>
        }

        return (
            <div ref={node => this.node = node} className='main'>
                <div className='list-title'>
                    <h4>{listTitle}</h4>
                </div>
                <div className='main-container'
                    onScroll={this.handleContainerScroll}>
                    {this.mounted && movieList}
                </div>
            </div>
        );
    }
}

export default Main;
