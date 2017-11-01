import React from 'react';
import TrailersCarousel from './trailersCarousel.react.js';
import trailersMock from 'test_data/trailers.json';

describe('TrailersCarousel component', () => {

    it('should render properly', () => {

        const wrapper = mount(<TrailersCarousel trailers={trailersMock} />);
        expect(wrapper).toMatchSnapshot();

        expect(wrapper.state().activeTrailer).toEqual(0);

        let stopPropagation = jest.fn();

        wrapper.find('.left-arrow').simulate('click', {
            stopPropagation
        });
        expect(wrapper).toMatchSnapshot();

        wrapper.find('.right-arrow').simulate('click', {
            stopPropagation
        });
        expect(wrapper).toMatchSnapshot();

        wrapper.find('.right-arrow').simulate('click', {
            stopPropagation
        });
        expect(wrapper).toMatchSnapshot();

        wrapper.find('.left-arrow').simulate('click', {
            stopPropagation
        });
        expect(wrapper).toMatchSnapshot();

        wrapper.find('.video-block').simulate('click', {
            stopPropagation
        });
        expect(wrapper).toMatchSnapshot();

        expect(stopPropagation).toHaveBeenCalledTimes(5);

        wrapper.unmount();
    });

    it('should render with only one trailer', () => {

        let trailers = trailersMock.slice(0, 1);

        const wrapper = mount(<TrailersCarousel trailers={trailers} />);
        expect(wrapper).toMatchSnapshot();

        wrapper.unmount();
    });

    it('should render without trailers', () => {

        const wrapper = mount(<TrailersCarousel />);
        expect(wrapper).toMatchSnapshot();

        wrapper.unmount();
    });
});
