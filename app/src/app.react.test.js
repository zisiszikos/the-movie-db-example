import React from 'react';
import App from './app.react.js';
import AppHeader from './components/header/header.react';
import Main from './components/main/main.react';
import VideoModal from './components/global/videoModal.react';

describe('App component', () => {

    it('should render properly', () => {

        const app = shallow(<App />);
        expect(app.is('.app')).toEqual(true);
        expect(app.find(AppHeader).length).toEqual(1);
        expect(app.find(Main).length).toEqual(1);
        expect(app.find(VideoModal).length).toEqual(1);
    });
});
