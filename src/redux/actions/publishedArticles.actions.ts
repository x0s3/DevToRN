import { Article } from '@interfaces/';
import { createAsyncAction, createAction } from 'typesafe-actions';

export const updateTagList = createAction(
  'PUBLISHED_ARTICLES_UPDATE_TAG_LIST',
  action => (tag: string) => action(tag)
);

export const fetchPublishedArticles = createAsyncAction(
  'PUBLISHED_ARTICLES_REQUEST',
  'PUBLISHED_ARTICLES_SUCCESS',
  'PUBLISHED_ARTICLES_ERROR',
  'PUBLISHED_ARTICLES_CANCEL'
)<undefined, Article[], undefined, undefined>();
