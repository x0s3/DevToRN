import { Article } from '@interfaces/';
import { RootState } from 'typesafe-actions';
import { createSelector } from 'reselect';

export const getPublishedArticles = (state: RootState) =>
  state.publishedArticles.articles;

export const isFetchingArticles = (state: RootState) =>
  state.publishedArticles.fetchingArticles;

export const hasErrorArticles = (state: RootState) =>
  state.publishedArticles.errorArticles || false;

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

export const isFetchingArticle = (state: RootState) =>
  state.publishedArticles.fetchingArticle;

export const getPublishedArticle = (state: RootState) =>
  state.publishedArticles.fetchedArticle as Article;

export const hasErrorArticle = (state: RootState) =>
  state.publishedArticles.errorArticle || false;
