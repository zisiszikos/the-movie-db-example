import React from 'react';
import Header from './header.react.js';

describe('Header component', () => {

    it('should render properly', () => {

        const header = shallow(<Header />);
        expect(header.is('.header')).toBe(true);
        expect(header.find('.header-title').length).toBe(1);
        expect(header.find('.header-title').text()).toEqual('The Movie DB');
        expect(header).toMatchSnapshot();
    });
});
