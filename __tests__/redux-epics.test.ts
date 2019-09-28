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
          actions.publishedArticlesActions.fetchPublishedArticles.failure().type
        );
      });
    });
  });

  describe('EPIC PUBLISHED ARTICLE ACTIONS', () => {
    it('should fetch epic published article success', async () => {
      const actions$ = ActionsObservable.of(
        actions.publishedArticlesActions.fetchPublishedArticle.success([])
      );
      const actionReceived = await actions$.toPromise();
      expect(actionReceived.type).toBe(
        actions.publishedArticlesActions.fetchPublishedArticle.success([]).type
      );
      expect(actionReceived.payload.length).toBe([].length);
    });

    it('should fetch epic published article error', () => {
      const actions$ = ActionsObservable.of(
        actions.publishedArticlesActions.fetchPublishedArticle.request(1)
      );

      actions$.toPromise().catch(actionReceived => {
        expect(actionReceived.type).toBe(
          actions.publishedArticlesActions.fetchPublishedArticle.cancel().type
        );
      });
    });

    it('should fetch epic published article cancel', async () => {
      // @ts-ignore
      const actions$ = ActionsObservable.of(
        actions.publishedArticlesActions.fetchPublishedArticle.request(1),
        // @ts-ignore
        actions.publishedArticlesActions.fetchPublishedArticle.cancel()
      );

      const actionReceived = await actions$.toPromise();
      expect(actionReceived.type).toBe(
        actions.publishedArticlesActions.fetchPublishedArticle.cancel().type
      );
    });
  });
});
