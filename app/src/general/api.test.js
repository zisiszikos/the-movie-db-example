import API from './api.js';
import nock from 'nock';
import genresMock from 'test_data/genres.json';
import configurationMock from 'test_data/configuration.json';
import moviesMock from 'test_data/movies.json';
import trailersMock from 'test_data/trailers.json';
import reviewsMock from 'test_data/reviews.json';

describe('API', () => {
    let movieId;

    beforeAll(() => {
        nock.disableNetConnect();
        nock('http://localhost:3000')
            .persist()
            .get(/\/api\/movies\/intheater/)
            .reply(200, moviesMock)
            .get(/\/api\/movies\/search/)
            .reply(200, moviesMock)
            .get(/\/api\/configuration/)
            .reply(200, configurationMock)
            .get(/\/api\/genres/)
            .reply(200, genresMock)
            .get(/\/api\/movies\/movie\/.*\/trailers/)
            .reply(200, trailersMock)
            .get(/\/api\/movies\/movie\/.*\/reviews/)
            .reply(200, reviewsMock)
            .get(/\/api\/movies\/movie\/.*\/similar/)
            .reply(200, moviesMock);
    });

    afterAll(() => {
        // return closeServer();
        nock.cleanAll();
        nock.enableNetConnect();
    });

    it('should fetch in theater movies succesfully', async () => {

        let result = await API.fetchInTheaterMovies(0);

        expect(result).toBeInstanceOf(Array);
        expect(result.length > 0).toBe(true);
        expect(result[0]).toBeInstanceOf(Object);
        expect(result[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            genre_ids: expect.any(Array),
            vote_average: expect.any(Number)
        }));
        movieId = result[0].id;
    });

    it('should fetch genres succesfully', async () => {

        let result = await API.fetchGenres();

        expect(result).toBeInstanceOf(Array);
        expect(result.length > 0).toBe(true);
        expect(result[0]).toBeInstanceOf(Object);
        expect(result[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String)
        }));
    });

    it('should fetch configuration succesfully', async () => {

        let result = await API.fetchConfiguration();

        expect(result).toBeInstanceOf(Object);
        expect(result).toEqual(expect.objectContaining({
            images: expect.objectContaining({
                backdrop_sizes: expect.arrayContaining([
                    expect.any(String)
                ]),
                base_url: expect.any(String)
            })
        }));
    });

    it('should fetch search movie succesfully', async () => {

        let result = await API.fetchSearchMovie(0, 'fight');

        expect(result).toBeInstanceOf(Array);
        expect(result.length > 0).toBe(true);
        expect(result[0]).toBeInstanceOf(Object);
        expect(result[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            genre_ids: expect.any(Array),
            vote_average: expect.any(Number)
        }));
    });

    it('should fetch movie trailers succesfully', async () => {

        let result = await API.fetchMovieTrailers(movieId);

        expect(result).toBeInstanceOf(Array);
        if (result.length > 0) {
            expect(result[0]).toBeInstanceOf(Object);
            expect(result[0]).toEqual(expect.objectContaining({
                id: expect.any(String),
                key: expect.any(String),
                name: expect.any(String),
                site: expect.any(String),
                type: expect.any(String)
            }));
        }
    });

    it('should fetch movie reviews succesfully', async () => {

        let result = await API.fetchMovieReviews(movieId);

        expect(result).toBeInstanceOf(Array);
        if (result.length > 0) {
            expect(result[0]).toBeInstanceOf(Object);
            expect(result[0]).toEqual(expect.objectContaining({
                id: expect.any(String),
                author: expect.any(String),
                content: expect.any(String),
                url: expect.any(String)
            }));
        }
    });

    it('should fetch similar movies succesfully', async () => {

        let result = await API.fetchSimilarMovies(movieId);

        expect(result).toBeInstanceOf(Array);
        if (result.length > 0) {
            expect(result[0]).toBeInstanceOf(Object);
            expect(result[0]).toEqual(expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                genre_ids: expect.any(Array),
                vote_average: expect.any(Number)
            }));
        }
    });
});

describe('API errors', () => {

    beforeAll(() => {
        nock.disableNetConnect();
    });

    afterAll(() => {
        nock.enableNetConnect();
    });

    it('should fetch none in theater movies succesfully', async () => {

        let result = await API.fetchInTheaterMovies(-1);

        expect(result).toBeInstanceOf(Array);
        expect(result.length === 0).toBe(true);
    });

    it('should fetch none genres succesfully', async () => {

        let result = await API.fetchGenres();

        expect(result).toBeInstanceOf(Array);
        expect(result.length === 0).toBe(true);
    });

    it('should fetch default configuration succesfully', async () => {

        let result = await API.fetchConfiguration();

        expect(result).toBeInstanceOf(Object);
        expect(result).toEqual(expect.objectContaining({
            images: expect.objectContaining({
                backdrop_sizes: expect.arrayContaining([
                    expect.any(String)
                ]),
                base_url: expect.any(String)
            })
        }));
    });

    it('should fetch none search movie succesfully', async () => {

        let result = await API.fetchSearchMovie(-1, 'fight');

        expect(result).toBeInstanceOf(Array);
        expect(result.length === 0).toBe(true);
    });

    it('should fetch none movie trailers succesfully', async () => {

        let result = await API.fetchMovieTrailers(-1);

        expect(result).toBeInstanceOf(Array);
        expect(result.length === 0).toBe(true);
    });

    it('should fetch none movie reviews succesfully', async () => {

        let result = await API.fetchMovieReviews(-1);

        expect(result).toBeInstanceOf(Array);
        expect(result.length === 0).toBe(true);
    });

    it('should fetch none similar movies succesfully', async () => {

        let result = await API.fetchSimilarMovies(-1);

        expect(result).toBeInstanceOf(Array);
        expect(result.length === 0).toBe(true);
    });
});
