import React, {Component} from 'react';
import Movie from './movie.react';

class MoviesList extends Component {

    constructor(props) {

        super(props);
    }

    render() {

        return (
            <div className='movieslist'>
                {this.props.movies.map((movie, index) => {

                    return <Movie
                        key={index}
                        index={index}
                        conf={this.props.configuration}
                        movie={movie} />;
                })}
            </div>
        );
    }
}

export default MoviesList;
