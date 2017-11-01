import React from 'react';
import Main from './main.react.js';
import nock from 'nock';
import genresMock from 'test_data/genres.json';
import configurationMock from 'test_data/configuration.json';
import moviesMock from 'test_data/movies.json';
import PubSub from 'pubsub-js';

describe('Main component', () => {

    beforeAll(() => {
        nock.disableNetConnect();
        nock('http://localhost:3000')
            .persist()
            .get(/\/api\/genres/)
            .reply(200, genresMock)
            .get(/\/api\/configuration/)
            .reply(200, configurationMock)
            .get(/\/api\/movies\/intheater/)
            .reply(200, moviesMock)
            .get(/\/api\/movies\/search/)
            .reply(200, moviesMock);
    });

    afterAll(() => {
        nock.cleanAll();
        nock.enableNetConnect();
    });

    test('should have correct initial values', async () => {
        const wrapper = mount(<Main />);

        await delayTest(1000);

        expect(wrapper.find('.main-container').length).toEqual(1);
        expect(wrapper.find('.list-title').length).toEqual(1);
        expect(wrapper.state().lastExpandedMovieIndex).toEqual(-1);
        expect(wrapper.state().expandedMovieIndex).toEqual(-1);
        expect(wrapper.state().genres).toBeInstanceOf(Array);
        expect(wrapper.state().genres.length).toBeGreaterThan(0);
        expect(wrapper.state().genres[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String)
        }));
        expect(wrapper.state().configuration).toBeInstanceOf(Object);
        expect(wrapper.state().configuration).toEqual(expect.objectContaining({
            images: expect.objectContaining({
                backdrop_sizes: expect.arrayContaining([
                    expect.any(String)
                ]),
                base_url: expect.any(String)
            })
        }));
        expect(wrapper.state().movies).toBeInstanceOf(Array);
        expect(wrapper.state().movies.length).toBeGreaterThan(0);
        expect(wrapper.state().movies[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            genre_ids: expect.any(Array),
            vote_average: expect.any(Number)
        }));
        expect(wrapper.instance().lastPage).toEqual(0);
        expect(wrapper.instance().mounted).toEqual(true);
        expect(wrapper.instance().search_query).toBeUndefined();
        expect(wrapper).toMatchSnapshot();

        wrapper.unmount();
    });

    test('should change state after search term is changed', async () => {
        const wrapper = mount(<Main />);

        await delayTest(1000);

        PubSub.publish('SEARCH QUERY CHANGED', '');
        await delayTest(1000);
        expect(wrapper.instance().search_query).toEqual('');

        PubSub.publish('SEARCH QUERY CHANGED', 'fight');
        await delayTest(1000);
        expect(wrapper.instance().search_query).toEqual('fight');

        PubSub.publish('SEARCH QUERY CHANGED', 'lord');
        await delayTest(1000);
        expect(wrapper.instance().search_query).toEqual('lord');
        expect(wrapper.instance().modeChanged).toEqual(false);
        expect(wrapper.instance().lastPage).toEqual(0);

        expect(wrapper).toMatchSnapshot();

        wrapper.unmount();
    });

    test('should change state after a movie is clicked', async () => {
        const wrapper = mount(<Main />);

        await delayTest(1000);

        PubSub.publish('MOVIE CLICKED', {
            movieIndex: 0
        });
        await delayTest(1000);

        expect(wrapper.state().expandedMovieIndex).toEqual(0);
        expect(wrapper).toMatchSnapshot();

        PubSub.publish('MOVIE CLICKED', {
            movieIndex: 0
        });
        await delayTest(1000);

        expect(wrapper.state().expandedMovieIndex).toEqual(-1);
        expect(wrapper).toMatchSnapshot();

        wrapper.unmount();
    });
});

describe('Main component without network', () => {

    beforeAll(() => {
        nock.disableNetConnect();
    });

    afterAll(() => {
        nock.enableNetConnect();
    });

    test('should render blank page', async () => {
        const wrapper = mount(<Main />);

        await delayTest(1000);

        expect(wrapper.state().genres).toBeInstanceOf(Array);
        expect(wrapper.state().genres.length).toEqual(0);
        expect(wrapper.state().configuration).toBeInstanceOf(Object);
        expect(wrapper.state().configuration).toEqual(expect.objectContaining({
            images: expect.objectContaining({
                backdrop_sizes: expect.arrayContaining([
                    expect.any(String)
                ]),
                base_url: expect.any(String)
            })
        }));
        expect(wrapper.state().movies).toBeInstanceOf(Array);
        expect(wrapper.state().movies.length).toEqual(0);
        expect(wrapper).toMatchSnapshot();

        wrapper.unmount();
    });
});
