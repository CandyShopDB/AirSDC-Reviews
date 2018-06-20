import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { queryReview } from '../actions/index';
import { chevronDownSVG, chevronUpSVG, searchIconSvg, calculateOverallRates, makeStarElements } from '../../../../helpers/clientHelpers';
import '../../css/header.css';

const starClassNames = {
  containerClass: 'star-ratings overall-rating',
  fullStarClass: 'full-star overall-rating',
  pointFiveClass: 'point-five-star overall-rating',
  zeroStarClass: 'zero-star overall-rating',
  halfStarClass: 'half-star overall-rating',
  hiddenHalfStarClass: 'hidden-half-star overall-rating',
};

const mapStateToProps = state => ({
  roomId: state.roomId,
  roomTotalReviewNumber: state.roomTotalReviewNumber,
  overallRating: calculateOverallRates(state.overallRating),
  numberReviewsPerPage: state.numberReviewsPerPage,
  queryInput: state.queryInput,
  querySortBy: state.querySortBy,
});

const mapDispatchToProps = dispatch => ({
  queryReview: (roomId, queryInput, querySortBy, numberReviewsPerPage) => {
    dispatch(queryReview(roomId, queryInput, querySortBy, numberReviewsPerPage));
  },
});

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.queryInput,
      inputFocus: false,
    };

    this.queryReview = this.props.queryReview.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleRatingClick = this.handleRatingClick.bind(this);
  }

  handleKeyDown(event) {
    if (event.which === 13) {
      this.queryReview(
        this.props.roomId,
        event.target.value,
        this.props.querySortBy,
        this.props.numberReviewsPerPage,
      );
    }
  }

  handleSearchChange(event) {
    this.setState({
      input: event.target.value,
    });
  }

  handleRatingClick() {
    let sortBy;
    if (this.props.querySortBy.length && this.props.querySortBy[0] === 'aggregateRate') {
      sortBy = {
        '-1': ['aggregateRate', 1],
        1: [],
      }[this.props.querySortBy[1]];
    } else {
      sortBy = ['aggregateRate', -1];
    }
    this.props.queryReview(
      this.props.roomId,
      this.props.queryInput,
      sortBy,
      this.props.numberReviewsPerPage,
    );
  }

  chevronIcon() {
    if (this.props.querySortBy.length && (this.props.querySortBy[0] === 'aggregateRate')) {
      return (this.props.querySortBy[1] === -1) ? chevronDownSVG : chevronUpSVG;
    }
    return null;
  }

  render() {
    return (
      <div className="header-banner">
        <h4 className="review-total">
          <span>{this.props.roomTotalReviewNumber} Reviews</span>
          <button
            className="aggregate-rating"
            onClick={this.handleRatingClick}
          >
            <div className="total-rate-star">{makeStarElements(this.props.overallRating / 5, 5, starClassNames)}</div>
            <span className="chevron-icon">{this.chevronIcon()}</span>
          </button>
        </h4>
        <div className={`search-bar${this.state.inputFocus ? ' darker' : ''}`}>
          <div className="search-icon">
            {searchIconSvg}
          </div>
          <div className="search-input">
            <input
              type="text"
              placeholder="Search reviews"
              value={this.state.input}
              onChange={this.handleSearchChange}
              onKeyDown={this.handleKeyDown}
              onFocus={() => { this.setState({ inputFocus: true }); }}
              onBlur={() => { this.setState({ inputFocus: false }); }}
            />
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  roomId: PropTypes.number.isRequired,
  roomTotalReviewNumber: PropTypes.number.isRequired,
  overallRating: PropTypes.number.isRequired,
  numberReviewsPerPage: PropTypes.number.isRequired,
  queryInput: PropTypes.string.isRequired,
  querySortBy: PropTypes.arrayOf(PropTypes.any).isRequired,
  queryReview: PropTypes.func.isRequired,
};

const ConnectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);
export default ConnectedHeader;
