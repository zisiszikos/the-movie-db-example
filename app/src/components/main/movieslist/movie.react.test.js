import React from 'react';
import Movie from './movie.react.js';
import nock from 'nock';
import configurationMock from 'test_data/configuration.json';
import moviesMock from 'test_data/movies.json';
import trailersMock from 'test_data/trailers.json';
import reviewsMock from 'test_data/reviews.json';

describe('Movie component', () => {

    beforeAll(() => {
        nock.disableNetConnect();
        nock('http://localhost:3000')
            .persist()
            .get(/\/api\/movies\/movie\/.*\/trailers/)
            .reply(200, trailersMock)
            .get(/\/api\/movies\/movie\/.*\/reviews/)
            .reply(200, reviewsMock)
            .get(/\/api\/movies\/movie\/.*\/similar/)
            .reply(200, moviesMock);
    });

    afterAll(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });

    test('should have correct initial values', async () => {
        const wrapper = mount(<Movie
            key={0}
            index={0}
            conf={configurationMock}
            movie={moviesMock[0]} />);

        await delayTest(1000);

        expect(wrapper.find('.movie').length).toEqual(1);
        expect(wrapper.find('.movie.expanded').length).toEqual(0);
        expect(wrapper.props().index).toEqual(0);
        expect(wrapper.props().movie).toBeInstanceOf(Object);
        expect(wrapper.props().movie).toMatchObject(moviesMock[0]);
        expect(wrapper.props().conf).toBeInstanceOf(Object);
        expect(wrapper.props().conf).toMatchObject(configurationMock);

        expect(wrapper.state().movieDetails).toBeNull();

        expect(wrapper.instance().getMovieIndex()).toEqual(0);

        expect(wrapper.instance().createBackdropImageUrl())
            .toEqual('http://image.tmdb.org/t/p/w780/wBzMnQ01R9w58W6ucltdYfOyP4j.jpg');

        expect(wrapper).toMatchSnapshot();

        wrapper.setProps({
            key: 1,
            index: 1,
            movie: {
                ...moviesMock[0],
                id: 2222,
                backdrop_path: null
            }
        });
        expect(wrapper.props().movie.id).toEqual(2222);
        expect(wrapper.instance().getMovieIndex()).toEqual(1);

        expect(wrapper).toMatchSnapshot();

        wrapper.unmount();
    });

    test('should expand movie', async () => {
        const wrapper = mount(<Movie
            key={0}
            index={0}
            conf={configurationMock}
            movie={moviesMock[0]} />);

        await delayTest(1000);

        wrapper.setProps({
            key: 1,
            index: 1,
            movie: {
                ...moviesMock[0],
                isExpanded: true
            }
        });

        await delayTest(1000);

        expect(wrapper.state().movieDetails).toBeInstanceOf(Object);
        expect(wrapper.state().movieDetails.trailers)
            .toEqual(expect.arrayContaining(trailersMock));
        expect(wrapper.state().movieDetails.reviews)
            .toEqual(expect.arrayContaining(reviewsMock));
        expect(wrapper.state().movieDetails.simiralMovies)
            .toEqual(expect.arrayContaining(moviesMock));

        expect(wrapper).toMatchSnapshot();

        wrapper.unmount();
    });
});
