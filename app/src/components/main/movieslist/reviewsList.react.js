import React, {Component} from 'react';

class ReviewsList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            maxReviewsShown: 2
        }
    }

    render() {

        var reviews = this.props.reviews.slice(0, this.state.maxReviewsShown);

        return (
            <div className='movie-reviews'>
                <h3 className='reviews-header-title'>Reviews</h3>
                <div className='reviews-container'>
                    {reviews.map((review, index) => {

                        return <div
                            className='review'
                            key={index}>
                            <p>{review.content}</p>
                            {index + 1 < this.state.maxReviewsShown &&
                                <p className='seperator'>***</p>
                            }
                        </div>
                    })}
                </div>
            </div>
        );
    }
}

export default ReviewsList;
