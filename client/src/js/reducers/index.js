// client/src/js/reducers/index.js

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_STATE': {
      return { ...state, ...action.state };
    }
    case 'UPDATE_QUERY_INPUT': {
      return { ...state, queryInput: action.queryInput };
    }
    case 'UPDATE_QUERY_SORTBY': {
      return { ...state, querySortBy: action.querySortBy };
    }
    default: {
      return state;
    }
  }
};

export default rootReducer;
