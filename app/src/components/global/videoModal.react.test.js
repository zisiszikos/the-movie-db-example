import React from 'react';
import VideoModal from './videoModal.react.js';

describe('VideoModal component', () => {

    it('should render properly', () => {

        const wrapper = shallow(<VideoModal />);
        expect(wrapper.is('.video-modal')).toBe(true);
        expect(wrapper.state().active).toEqual(false);
        expect(wrapper.state().videoId).toEqual(null);
        expect(wrapper).toMatchSnapshot();

        wrapper.instance().onTrailerClicked(null, {
            videoId: 1111
        });
        expect(wrapper.state().active).toEqual(true);
        expect(wrapper.state().videoId).toEqual(1111);

        wrapper.instance().closeModal(null, {
            videoId: 1111
        });
        expect(wrapper.state().active).toEqual(false);
        expect(wrapper.state().videoId).toEqual(null);

        wrapper.instance().handleVideoModalClick();
        expect(wrapper).toMatchSnapshot();

        wrapper.unmount();
    });
});
