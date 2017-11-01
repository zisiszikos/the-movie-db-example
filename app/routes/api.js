const express = require('express');
const router = express.Router();
const axios = require('axios');
const baseUrl = 'https://api.themoviedb.org/3/';
const errors = require('http-errors');
const MOVIE_DB_KEY = process.env.MOVIE_DB_KEY || '';

function handleAxiosError (err) {

    if (err.response) {
        return {
            errorCode: err.response.status,
            message: err.response.data
        };
    } else {
        return new errors.BadRequest();
    }
}

router.get('/movies/intheater', (req, res, next) => {

    let page = req.query.page || 1;

    let url = baseUrl +
        'movie/now_playing?language=en-US&api_key=' +
        MOVIE_DB_KEY +
        '&page=' + page;

    axios.get(url)
        .then(response => {

            let result = response &&
                        response.data &&
                        response.data.results ? response.data.results : [];

            res.json(result);
        })
        .catch(err => {

            next(handleAxiosError(err));
        });
});

router.get('/movies/search', (req, res, next) => {

    let page = req.query.page || 1;
    let query = req.query.query || '';

    let url = baseUrl +
        'search/movie?language=en-US&include_adult=false&api_key=' +
        MOVIE_DB_KEY +
        '&page=' + page +
        '&query=' + query;

    axios.get(url)
        .then(response => {

            let result = response &&
                        response.data &&
                        response.data.results ? response.data.results : [];

            res.json(result);
        })
        .catch(err => {

            next(handleAxiosError(err));
        });
});

router.get('/movies/movie/:id/trailers', (req, res, next) => {

    let url = baseUrl +
        'movie/' + req.params.id + '/videos?language=en-US&api_key=' +
        MOVIE_DB_KEY;

    axios.get(url)
        .then(response => {

            let result = response &&
                        response.data &&
                        response.data.results ? response.data.results : [];

            res.json(result);
        })
        .catch(err => {

            next(handleAxiosError(err));
        });
});

router.get('/movies/movie/:id/reviews', (req, res, next) => {

    let url = baseUrl +
        'movie/' + req.params.id + '/reviews?language=en-US&api_key=' +
        MOVIE_DB_KEY +
        '&page=1';

    axios.get(url)
        .then(response => {

            let result = response &&
                        response.data &&
                        response.data.results ? response.data.results : [];

            res.json(result);
        })
        .catch(err => {

            next(handleAxiosError(err));
        });
});

router.get('/movies/movie/:id/similar', (req, res, next) => {

    let url = baseUrl +
        'movie/' + req.params.id + '/similar?language=en-US&api_key=' +
        MOVIE_DB_KEY +
        '&page=1';

    axios.get(url)
        .then(response => {

            let result = response &&
                        response.data &&
                        response.data.results ? response.data.results : [];

            res.json(result);
        })
        .catch(err => {

            next(handleAxiosError(err));
        });
});

router.get('/genres', (req, res, next) => {

    let url = baseUrl +
        'genre/movie/list?language=en-US&api_key=' +
        MOVIE_DB_KEY;

    axios.get(url)
        .then(response => {

            let result = response &&
                        response.data &&
                        response.data.genres ? response.data.genres : [];

            res.json(result);
        })
        .catch(err => {

            next(handleAxiosError(err));
        });
});


router.get('/configuration', (req, res, next) => {

    let url = baseUrl +
        'configuration?language=en-US&api_key=' +
        MOVIE_DB_KEY;

    axios.get(url)
        .then(response => {

            let result = response &&
                        response.data ? response.data : [];

            res.json(result);
        })
        .catch(err => {

            next(handleAxiosError(err));
        });
});

module.exports = router;
