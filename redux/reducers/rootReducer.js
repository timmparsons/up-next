import { combineReducers } from 'redux';

import appReducer from '../slices/appSlice';
import friendReducer from '../slices/friendSlice';
import movieReducer from '../slices/movieSlice';

const rootReducer = combineReducers({
  profile: appReducer,
  friendsList: friendReducer,
  moviesList: movieReducer,
});

export default rootReducer;
