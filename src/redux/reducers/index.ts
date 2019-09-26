import { combineReducers } from 'redux';
import { publishedArticlesReducer } from './publishedArticles.reducer';

export const rootReducer = combineReducers({
  publishedArticles: publishedArticlesReducer
});
