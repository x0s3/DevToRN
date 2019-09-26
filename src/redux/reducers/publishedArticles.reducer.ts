import { Article } from '@interfaces/';
import { createReducer, RootAction } from 'typesafe-actions';
import { fetchPublishedArticles } from '../actions/publishedArticles.actions';

interface State {
  articles: Article[];
  page: number;
  selected_tags?: string[];
  fetching: boolean;
  error?: any;
}

export const publishedArticlesReducer = createReducer<State, RootAction>({
  page: 1,
  articles: [],
  selected_tags: [],
  fetching: false
})
  .handleAction(fetchPublishedArticles.request, state => ({
    ...state,
    fetching: true
  }))
  .handleAction(fetchPublishedArticles.success, (state, { payload }) => ({
    ...state,
    articles: [...state.articles, ...payload],
    fetching: false,
    error: false,
    page: state.page + 1
  }))
  .handleAction(fetchPublishedArticles.failure, state => ({
    ...state,
    fetching: false,
    error: true
  }))
  .handleAction(fetchPublishedArticles.cancel, state => ({
    ...state,
    fetching: false,
    error: false
  }));
