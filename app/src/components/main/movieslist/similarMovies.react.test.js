import React from 'react';
import SimilarMovies from './similarMovies.react.js';
import configurationMock from 'test_data/configuration.json';
import moviesMock from 'test_data/movies.json';

describe('SimilarMovies component', () => {

    it('should render properly', () => {

        const wrapper = shallow(<SimilarMovies
            conf={configurationMock}
            simiralMovies={moviesMock} />);
        expect(wrapper.is('.similar-movies')).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    it('should render the default image', () => {

        let movies = moviesMock.slice();
        movies[0].backdrop_path = null;

        const wrapper = mount(<SimilarMovies
            conf={configurationMock}
            simiralMovies={movies} />);
        expect(wrapper).toMatchSnapshot();

        wrapper.unmount();
    });

    it('should render without movies', () => {

        const wrapper = shallow(<SimilarMovies />);
        expect(wrapper).toMatchSnapshot();
    });
});
