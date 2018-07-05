import React from 'react';
import PropTypes from 'prop-types';
import { flagSvg, getFullMonth, makeStarElements, truncateWords } from '../../../../helpers/clientHelpers';
import '../../css/reviewListEntry.css';

const starClassNames = {
  containerClass: 'star-ratings user-rating',
  fullStarClass: 'full-star user-rating',
  pointFiveClass: 'point-five-star user-rating',
  zeroStarClass: 'zero-star user-rating',
  halfStarClass: 'half-star user-rating',
  hiddenHalfStarClass: 'hidden-half-star user-rating',
};

const truncateThreshold = 300;

class ReviewListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textTruncated: this.props.review.text.length > truncateThreshold,
      truncatedText: (
        (this.props.review.text.length > truncateThreshold)
          ? truncateWords(this.props.review.text, truncateThreshold)
          : null
      ),
    };
    this.date = new Date(this.props.review.date);
  }


  render() {
    return (
      <div className="review-list-entry">
        <div className="user-profile">
          <div className="avatar">
            <a href={this.props.review.avatar}>
              <img
                src={this.props.review.avatar}
                alt={`${this.props.review.userName} User Profile`}
                title={`${this.props.review.userName} User Profile`}
              />
            </a>
          </div>
          <div className="name-and-date">
            <span className="username">{this.props.review.userName}</span>
            <br />
            <span className="review-date">
              {`${getFullMonth(this.date)} ${this.date.getFullYear()}`}
            </span>
          </div>
          <div className="flag">
            <button className="flag-button">
              {flagSvg}
            </button>
          </div>
        </div>
        <div className="user-star">{makeStarElements(this.props.review.aggregateRate / 5, 5, starClassNames)}</div>
        <div className="review-text">{
          this.state.textTruncated
            ? (
              <span>
                {this.state.truncatedText}
                <button
                  className="read-more"
                  onClick={() => { this.setState({ textTruncated: false }); }}
                >
                  Read more
                </button>
              </span>
            )
            : (
              <span>
                {this.props.review.text}
              </span>
          )
        }
        </div>
        <div className="review-break" />
      </div>
    );
  }
}

ReviewListEntry.propTypes = {
  review: PropTypes.shape({
    avatar: PropTypes.string,
    userName: PropTypes.string,
    date: PropTypes.string,
    aggregateRate: PropTypes.number,
    text: PropTypes.string,
  }).isRequired,
};

export default ReviewListEntry;
