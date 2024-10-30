import { combineReducers } from 'redux';

import appReducer from '../slices/appSlice';

const rootReducer = combineReducers({
  app: appReducer,
  // Add other reducers here
});

export default rootReducer;
