import { Article, FetchedArticle } from '@interfaces/';
import { createAsyncAction, createAction } from 'typesafe-actions';

export const updateTagList = createAction(
  'PUBLISHED_ARTICLES_UPDATE_TAG_LIST',
  action => (tag: string) => action(tag)
);

export const fetchPublishedArticles = createAsyncAction(
  'PUBLISHED_ARTICLES_REQUEST',
  'PUBLISHED_ARTICLES_SUCCESS',
  'PUBLISHED_ARTICLES_ERROR'
)<undefined, Article[], undefined>();

export const fetchPublishedArticle = createAsyncAction(
  'PUBLISHED_ARTICLE_REQUEST',
  'PUBLISHED_ARTICLE_SUCCESS',
  'PUBLISHED_ARTICLE_ERROR',
  'PUBLISHED_ARTICLE_CANCEL'
)<number, FetchedArticle, undefined, undefined>();
