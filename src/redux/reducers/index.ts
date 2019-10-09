import { combineReducers } from 'redux';
import { publishedArticlesReducer } from './publishedArticles.reducer';
import { optionsReducer } from './options.reducer';

export const rootReducer = combineReducers({
  publishedArticles: publishedArticlesReducer,
  options: optionsReducer
});
