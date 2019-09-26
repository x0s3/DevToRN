import { ActionsObservable } from 'redux-observable';
import actions from '../src/redux/actions';

describe('REDUX EPIC ACTIONS', () => {
  describe('EPIC PUBLISHED ARTICLES ACTIONS', () => {
    it('should fetch epic published articles success', async () => {
      const actions$ = ActionsObservable.of(
        actions.publishedArticlesActions.fetchPublishedArticles.success([])
      );
      const actionReceived = await actions$.toPromise();
      expect(actionReceived.type).toBe(
        actions.publishedArticlesActions.fetchPublishedArticles.success([]).type
      );
      expect(actionReceived.payload.length).toBe([].length);
    });

    it('should fetch epic published articles error', () => {
      const actions$ = ActionsObservable.of(
        actions.publishedArticlesActions.fetchPublishedArticles.request()
      );

      actions$.toPromise().catch(actionReceived => {
        expect(actionReceived.type).toBe(
          actions.publishedArticlesActions.fetchPublishedArticles.cancel().type
        );
      });
    });

    it('should fetch epic published articles cancel', async () => {
      const actions$ = ActionsObservable.of(
        actions.publishedArticlesActions.fetchPublishedArticles.request(),
        {
          type: 'PUBLISHED_ARTICLES_CANCEL'
        }
      );

      const actionReceived = await actions$.toPromise();
      expect(actionReceived.type).toBe(
        actions.publishedArticlesActions.fetchPublishedArticles.cancel().type
      );
    });
  });
});
