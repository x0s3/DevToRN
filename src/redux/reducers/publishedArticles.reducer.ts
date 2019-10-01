import { Article, FetchedArticle } from '@interfaces/';
import { createReducer, RootAction } from 'typesafe-actions';
import {
  fetchPublishedArticles,
  fetchPublishedArticle,
  updateTagList
} from '../actions/publishedArticles.actions';

interface State {
  articles: Article[];
  fetchedArticle?: FetchedArticle;
  page: number;
  selected_tags: string[];
  fetchingArticles: boolean;
  fetchingArticle: boolean;
  errorArticles?: any;
  errorArticle?: any;
}

export const publishedArticlesReducer = createReducer<State, RootAction>({
  page: 1,
  articles: [],
  selected_tags: [],
  fetchingArticles: false,
  fetchingArticle: false
})
  .handleAction(
    [fetchPublishedArticles.request, fetchPublishedArticle.request],
    (state, action) => ({
      ...state,
      ...(action.type.includes('_ARTICLES_')
        ? {
            fetchingArticles: true
          }
        : { fetchingArticle: true })
    })
  )
  .handleAction(fetchPublishedArticles.success, (state, { payload }) => ({
    ...state,
    articles: [...state.articles, ...payload],
    fetchingArticles: false,
    page: state.page + 1
  }))
  .handleAction(
    fetchPublishedArticle.success,
    (state, { payload: article }) => ({
      ...state,
      fetchedArticle: article,
      fetchingArticle: false
    })
  )
  .handleAction(
    [fetchPublishedArticles.failure, fetchPublishedArticle.failure],
    (state, action) => ({
      ...state,
      ...(action.type.includes('_ARTICLES_')
        ? {
            fetchingArticles: false,
            errorArticles: true
          }
        : {
            fetchingArticle: false,
            errorArticle: true
          })
    })
  )
  .handleAction(fetchPublishedArticle.cancel, state => ({
    ...state,
    fetchingArticle: false
  }))
  .handleAction(updateTagList, (state, { payload: payloadTag }) => {
    if (state.selected_tags.indexOf(payloadTag) > -1) {
      return {
        ...state,
        selected_tags: state.selected_tags.filter(tag => tag !== payloadTag)
      };
    }

    return {
      ...state,
      selected_tags: [...state.selected_tags, payloadTag]
    };
  });
