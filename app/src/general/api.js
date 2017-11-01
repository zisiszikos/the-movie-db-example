import axios from 'axios';
const API = {};
const _csrf = document.head.querySelector("meta[name=_csrf]").content;
axios.defaults.headers.common['x-csrf-token'] = _csrf;

API.fetchInTheaterMovies = (page) => {

    return axios
        .get('/api/movies/intheater?page=' + (page + 1))
        .then(response => response.data)
        .catch(() => []);
};

API.fetchGenres = () => {

    return axios
        .get('/api/genres')
        .then(response => response.data)
        .catch(() => []);
};

API.fetchConfiguration = () => {

    return axios
        .get('/api/configuration')
        .then(response => response.data)
        .catch(() => {

            // fallback values
            return {
                images: {
                    backdrop_sizes: [
                        'w300',
                        'w780'
                    ],
                    base_url: 'http://image.tmdb.org/t/p/'
                }
            };
        });
};

API.fetchSearchMovie = (page, query) => {

    return axios
        .get('/api/movies/search?page=' + (page + 1) + '&query=' + query)
        .then(response => response.data)
        .catch(() => []);
};

API.fetchMovieTrailers = (id) => {

    return axios
        .get('/api/movies/movie/' + id + '/trailers')
        .then(response => response.data)
        .catch(() => []);
};

API.fetchMovieReviews = (id) => {

    return axios
        .get('/api/movies/movie/' + id + '/reviews')
        .then(response => response.data)
        .catch(() => []);
};

API.fetchSimilarMovies = (id) => {

    return axios
        .get('/api/movies/movie/' + id + '/similar')
        .then(response => response.data)
        .catch(() => []);
};

export default API;
