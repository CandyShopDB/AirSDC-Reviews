import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../css/reviews.css';
import Header from './header';
import Rates from './rates';
import ReviewList from './reviewList';
import { selectARoom } from '../actions/index';

const mapStateToProps = state => ({
  roomIsFetching: state.roomIsFetching,
  pageHasErrored: state.pageHasErrored,
  roomHasErrored: state.roomHasErrored,
  numberReviewsPerPage: state.numberReviewsPerPage,
  roomId: state.roomId,
});

const mapDispatchToProps = dispatch => ({
  selectARoom: (roomId, numberReviewsPerPage) => {
    dispatch(selectARoom(roomId, numberReviewsPerPage));
  },
});

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = null;
  }

  componentDidMount() {
    this.props.selectARoom(this.props.roomId, this.props.numberReviewsPerPage);
  }

  render() {
    if (this.props.roomHasErrored || this.props.pageHasErrored) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(
        this.props.selectARoom.bind(this, this.props.roomId, this.props.numberReviewsPerPage),
        5000,
      );
      return null;
    }
    return (
      <div>
        <div className={this.props.roomIsFetching ? 'loader' : ''} />
        <div className={`reviews${this.props.roomIsFetching ? ' grey-out' : ''}`}>
          <Header />
          <Rates />
          <ReviewList />
        </div>
      </div>
    );
  }
}

Reviews.propTypes = {
  roomHasErrored: PropTypes.bool.isRequired,
  pageHasErrored: PropTypes.bool.isRequired,
  roomIsFetching: PropTypes.bool.isRequired,
  roomId: PropTypes.number.isRequired,
  numberReviewsPerPage: PropTypes.number.isRequired,
  selectARoom: PropTypes.func.isRequired,
};

const ConnectedReviews = connect(mapStateToProps, mapDispatchToProps)(Reviews);

export default ConnectedReviews;
