import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReviewListEntry from './reviewListEntry';
import { selectAPage } from '../actions/index';
import { displayPages } from '../../../../helpers/clientHelpers';
import '../../css/reviewList.css';

const mapStateToProps = state => ({
  pageIsFetching: state.pageIsFetching,
  pageHasErrored: state.pageHasErrored,
  roomId: state.roomId,
  numberReviewsPerPage: state.numberReviewsPerPage,
  currentPage: state.currentPage,
  selectedPages: displayPages(state.currentPage, state.pages),
  reviews: state.reviews,
});

const mapDispatchToProps = dispatch => ({
  selectAPage: (roomId, currentPage, numberReviewsPerPage) => {
    dispatch(selectAPage(roomId, currentPage, numberReviewsPerPage));
  },
});

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.timeout = null;
  }

  handlePageClick(currentPage) {
    this.props.selectAPage(this.props.roomId, currentPage, this.props.numberReviewsPerPage);
  }

  render() {
    if (this.props.pageHasErrored) {
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(
        this.props.selectAPage.bind(
          this,
          this.props.roomId,
          this.props.currentPage,
          this.props.numberReviewsPerPage,
        ),
        5000,
      );
      return null;
    }
    return (
      <div>
        <div className={this.props.pageIsFetching ? 'loader' : ''} />
        <div className={this.props.pageIsFetching ? 'grey-out' : ''}>
          <div className="review-list">
            {this.props.reviews.map(review => (
              <ReviewListEntry review={review} key={`${review.userName}_${review.date}`} />
            ))}
          </div>
          <div className="pagination">
            {this.props.selectedPages.map((item, index) => {
              /* eslint-disable react/no-array-index-key */
              if (item[0] === '...') {
                return (
                  <div className="page-spread" key={`...${index}`}>...</div>
                );
              }
              /* eslint-enable react/no-array-index-key */
              if (item[0] === '<') {
                return (
                  <button
                    className="page-button prev-page"
                    key={item[0]}
                    onClick={() => { this.handlePageClick(item[1][0]); }}
                  >
                    &#9664;
                  </button>
                );
              }
              if (item[0] === '>') {
                return (
                  <button
                    className="page-button next-page"
                    key={item[0]}
                    onClick={() => { this.handlePageClick(item[1][0]); }}
                  >
                    &#9654;
                  </button>
                );
              }
              if (item[0] === this.props.currentPage) {
                return (
                  <button
                    className="page-button active"
                    key={item[0]}
                  >
                    {item[0]}
                  </button>
                );
              }
              return (
                <button
                  className="page-button numbered"
                  key={item[0]}
                  onClick={() => { this.handlePageClick(item[0]); }}
                >
                  {item[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

ReviewList.propTypes = {
  pageHasErrored: PropTypes.bool.isRequired,
  pageIsFetching: PropTypes.bool.isRequired,
  roomId: PropTypes.number.isRequired,
  numberReviewsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  selectedPages: PropTypes.arrayOf(PropTypes.array).isRequired,
  reviews: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectAPage: PropTypes.func.isRequired,
};

const ConnectedReviewList = connect(mapStateToProps, mapDispatchToProps)(ReviewList);

export default ConnectedReviewList;
