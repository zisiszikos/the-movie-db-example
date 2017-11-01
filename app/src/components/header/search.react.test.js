import React from 'react';
import Search from './search.react.js';

describe('Search component', () => {

    it('should render properly', () => {

        const search = shallow(<Search />);
        expect(search.is('.search')).toBe(true);
        expect(search.state().query).toEqual('');
        expect(search).toMatchSnapshot();

        search.find('input').simulate('change', {
            target: {
                value: 'fight'
            }
        });
        expect(search.state().query).toEqual('fight');
    });
});
