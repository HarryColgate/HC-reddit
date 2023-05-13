import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';
import feedReducer from '../features/feed/feedSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    subreddits: subredditsReducer,
    feed: feedReducer,
  },
});
