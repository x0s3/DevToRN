import { Article, FetchedArticle } from '@interfaces/*';
import { from, of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { isActionOf, RootEpic } from 'typesafe-actions';
import {
  fetchPublishedArticle,
  fetchPublishedArticles
} from '../actions/publishedArticles.actions';

const fetchPublishedArticles$: RootEpic = (
  action$,
  store$,
  { ajax, options: { mainURL } }
) =>
  action$.pipe(
    filter(isActionOf(fetchPublishedArticles.request)),
    switchMap(_ =>
      from(
        ajax.getJSON<Article[]>(
          `${mainURL}/articles?page=${store$.value.publishedArticles.page}`
        )
      ).pipe(
        map(fetchPublishedArticles.success),
        catchError(
          pipe(
            fetchPublishedArticles.failure,
            of
          )
        )
      )
    )
  );

const fetchPublishedArticle$: RootEpic = (
  action$,
  _,
  { ajax, options: { mainURL } }
) =>
  action$.pipe(
    filter(isActionOf(fetchPublishedArticle.request)),
    switchMap(({ payload: id }) =>
      from(ajax.getJSON<FetchedArticle>(`${mainURL}/articles/${id}`)).pipe(
        map(fetchPublishedArticle.success),
        catchError(
          pipe(
            fetchPublishedArticle.failure,
            of
          )
        ),
        takeUntil(
          action$.pipe(filter(isActionOf(fetchPublishedArticle.cancel)))
        )
      )
    )
  );

export default {
  fetchPublishedArticles$,
  fetchPublishedArticle$
} as const;
