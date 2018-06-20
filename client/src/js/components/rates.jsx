import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { queryReview } from '../actions/index';
import { chevronUpSVG, chevronDownSVG, makeStarElements } from '../../../../helpers/clientHelpers';
import '../../css/rates.css';

const starClassNames = {
  containerClass: 'star-ratings room-rating',
  fullStarClass: 'full-star room-rating',
  pointFiveClass: 'point-five-star room-rating',
  zeroStarClass: 'zero-star room-rating',
  halfStarClass: 'half-star room-rating',
  hiddenHalfStarClass: 'hidden-half-star room-rating',
};

const mapStateToProps = state => ({
  roomId: state.roomId,
  queryInput: state.queryInput,
  querySortBy: state.querySortBy,
  numberReviewsPerPage: state.numberReviewsPerPage,
  accuracy: state.overallRating.accuracy,
  communication: state.overallRating.communication,
  cleanliness: state.overallRating.cleanliness,
  location: state.overallRating.location,
  checkIn: state.overallRating.checkIn,
  value: state.overallRating.value,
});

const mapDispatchToProps = dispatch => ({
  queryReview: (roomId, queryInput, querySortBy, numberReviewsPerPage) => {
    dispatch(queryReview(roomId, queryInput, querySortBy, numberReviewsPerPage));
  },
});

class Rates extends React.Component {
  constructor(props) {
    super(props);
    this.rates = [
      [
        ['Accuracy', 'accuracy'],
        ['Communication', 'communication'],
        ['Cleanliness', 'cleanliness'],
      ],
      [
        ['Location', 'location'],
        ['Check-in', 'checkIn'],
        ['Value', 'value'],
      ],
    ];
  }

  handleLabelClick(label) {
    let sortBy;
    if (this.props.querySortBy.length && this.props.querySortBy[0] === label) {
      sortBy = {
        '-1': [label, 1],
        1: [],
      }[this.props.querySortBy[1]];
    } else {
      sortBy = [label, -1];
    }
    this.props.queryReview(
      this.props.roomId,
      this.props.queryInput,
      sortBy,
      this.props.numberReviewsPerPage,
    );
  }

  cheveronIcon(label) {
    if (this.props.querySortBy.length && (label === this.props.querySortBy[0])) {
      return (this.props.querySortBy[1] === -1) ? chevronDownSVG : chevronUpSVG;
    }
    return null;
  }

  render() {
    return (
      <div className="rates-list">
        {/* eslint-disable react/no-array-index-key */
        this.rates.map((column, index) => (
          <div className="rates-column" key={index}>
            {column.map(row => (
              <div className="rate-row" key={row[1]}>
                <button
                  className="rate-label"
                  onClick={() => { this.handleLabelClick(row[1]); }}
                >
                  <span>{row[0]}</span>
                  <span className="chevron-icon">{this.cheveronIcon(row[1])}</span>
                </button>
                <div className="rate-star">
                  {makeStarElements(this.props[row[1]] / 5, 5, starClassNames)}
                </div>
              </div>
            ))}
          </div>
        ))
        /* eslint-enable react/no-array-index-key */
        }
      </div>
    );
  }
}


Rates.propTypes = {
  roomId: PropTypes.number.isRequired,
  queryInput: PropTypes.string.isRequired,
  querySortBy: PropTypes.arrayOf(PropTypes.any).isRequired,
  numberReviewsPerPage: PropTypes.number.isRequired,
  queryReview: PropTypes.func.isRequired,
};


const ConnectedRates = connect(mapStateToProps, mapDispatchToProps)(Rates);
export default ConnectedRates;
