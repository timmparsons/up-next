import { combineReducers } from 'redux';

import appReducer from '../slices/appSlice';
import friendReducer from '../slices/friendSlice';
import genreReducer from '../slices/genreSlice';
import movieReducer from '../slices/movieSlice';

const rootReducer = combineReducers({
  profile: appReducer,
  friendsList: friendReducer,
  moviesList: movieReducer,
  genreList: genreReducer,
});

export default rootReducer;
