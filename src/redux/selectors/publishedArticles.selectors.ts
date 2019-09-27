import { RootState } from 'typesafe-actions';
import { createSelector } from 'reselect';

export const getPublishedArticles = (state: RootState) =>
  state.publishedArticles.articles;

export const isFetchingArticles = (state: RootState) =>
  state.publishedArticles.fetching;

export const getSelectedTags = (state: RootState) =>
  state.publishedArticles.selected_tags || [];

export const filterArticlesBySelectedTags = createSelector(
  [getPublishedArticles, getSelectedTags],
  (articles, tags) => {
    const filteredArticles = articles.filter(
      article => article.tag_list.filter(tag => tags.includes(tag)).length > 0
    );
    return filteredArticles.length > 0 ? filteredArticles : articles;
  }
);
