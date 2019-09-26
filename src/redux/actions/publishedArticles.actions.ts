import { Article } from '@interfaces/';
import { createAsyncAction } from 'typesafe-actions';

export const fetchPublishedArticles = createAsyncAction(
  'PUBLISHED_ARTICLES_REQUEST',
  'PUBLISHED_ARTICLES_SUCCESS',
  'PUBLISHED_ARTICLES_ERROR',
  'PUBLISHED_ARTICLES_CANCEL'
)<undefined, Article[], undefined, undefined>();
