import { Article } from '@interfaces/*';
import { from, of, pipe } from 'rxjs';
import { catchError, filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { isActionOf, RootEpic } from 'typesafe-actions';
import { fetchPublishedArticles } from '../actions/publishedArticles.actions';

const fetchPublishedArticles$: RootEpic = (
  action$,
  store$,
  { ajax, options: { mainURL, headers } }
) =>
  action$.pipe(
    filter(isActionOf(fetchPublishedArticles.request)),
    switchMap(_ =>
      from(
        ajax.getJSON<Article[]>(
          `${mainURL}/articles?page=${store$.value.publishedArticles.page}`,
          { ...headers }
        )
      ).pipe(
        map(fetchPublishedArticles.success),
        catchError(
          pipe(
            fetchPublishedArticles.failure,
            of
          )
        ),
        takeUntil(
          action$.pipe(filter(isActionOf(fetchPublishedArticles.cancel)))
        )
      )
    )
  );

export default { fetchPublishedArticles$ } as const;
