import genresMock from '../../app/test_data/genres.json';
import configurationMock from '../../app/test_data/configuration.json';
import moviesMock from '../../app/test_data/movies.json';
import trailersMock from '../../app/test_data/trailers.json';
import reviewsMock from '../../app/test_data/reviews.json';

describe('The Movie DB app', () => {
    beforeEach(() => {
        cy.server();
        cy
            .route({
                method: 'GET',
                url: /\/api\/movies\/intheater/,
                status: 200,
                response: moviesMock
            })
            .as('getIntheater');
        cy
            .route({
                method: 'GET',
                url: /\/api\/configuration/,
                status: 200,
                response: configurationMock
            })
            .as('getConfiguration');
        cy
            .route({
                method: 'GET',
                url: /\/api\/genres/,
                status: 200,
                response: genresMock
            })
            .as('getGenres');
        cy
            .route({
                method: 'GET',
                url: /\/api\/movies\/movie\/\d+\/trailers/,
                status: 200,
                response: trailersMock
            })
            .as('getTrailers');
        cy
            .route({
                method: 'GET',
                url: /\/api\/movies\/movie\/\d+\/reviews/,
                status: 200,
                response: reviewsMock
            })
            .as('getReviews');
        cy
            .route({
                method: 'GET',
                url: /\/api\/movies\/movie\/\d+\/similar/,
                status: 200,
                response: moviesMock
            })
            .as('getSimilar');
        cy.visit('http://localhost:3000');
    });

    it('should load movies', () => {
        cy.title().should('include', 'The Movie DB');

        cy
            .wait('@getIntheater')
            .its('responseBody')
            .should('deep.equal', moviesMock);

        cy
            .wait('@getConfiguration')
            .its('responseBody')
            .should('deep.equal', configurationMock);

        cy
            .wait('@getGenres')
            .its('responseBody')
            .should('deep.equal', genresMock);

        var movieYear = new Date(moviesMock[0].release_date).getFullYear();

        cy.get('.movie').should('exist');

        cy.get('.movie').should('have.length', 20);

        cy
            .get('.movie')
            .find('.movie-title')
            .eq(0)
            .should('have.text', moviesMock[0].title + ' (' + movieYear + ')');

        cy
            .get('.movie')
            .find('.movie-reviews')
            .should('not.exist');
        cy
            .get('.movie')
            .find('.trailers-carousel')
            .should('not.exist');
        cy
            .get('.movie')
            .find('.similar-movies')
            .should('not.exist');
    });

    it('should load movie details after click on movie', () => {
        cy
            .get('.movie')
            .eq(0)
            .click();

        cy
            .wait('@getTrailers')
            .its('responseBody')
            .should('deep.equal', trailersMock);

        cy
            .wait('@getReviews')
            .its('responseBody')
            .should('deep.equal', reviewsMock);

        cy
            .wait('@getSimilar')
            .its('responseBody')
            .should('deep.equal', moviesMock);

        cy
            .get('.movie')
            .find('.movie-reviews')
            .should('exist');

        cy
            .get('.movie')
            .find('.trailers-carousel')
            .should('exist');

        cy
            .get('.movie')
            .find('.similar-movies')
            .should('exist');
    });

    it('should load more movies after scroll to bottom', () => {
        cy
            .wait('@getIntheater')
            .its('responseBody')
            .should('deep.equal', moviesMock);

        cy.get('.main-container').scrollTo('bottom');

        cy
            .wait('@getIntheater')
            .its('responseBody')
            .should('deep.equal', moviesMock);

        cy.get('.movie').should('have.length', 40);
    });
});
