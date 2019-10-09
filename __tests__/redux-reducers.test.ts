import {
  fetchPublishedArticles,
  fetchPublishedArticle,
  updateTagList
} from '../src/redux/actions/publishedArticles.actions';
import { changeTheme } from '../src/redux/actions/options.actions';
import { publishedArticlesReducer } from '../src/redux/reducers/publishedArticles.reducer';
import { optionsReducer } from '../src/redux/reducers/options.reducer';

describe('REDUX REDUCERS', () => {
  it('should return the initial state', () => {
    expect(publishedArticlesReducer(undefined, {})).toEqual({
      articles: [],
      fetchingArticle: false,
      fetchingArticles: false,
      page: 1,
      selected_tags: []
    });
  });

  describe('PUBLISHED REDUCER', () => {
    describe('PUBLISHED ARTICLES', () => {
      let initialState;

      beforeEach(() => {
        initialState = {
          articles: [],
          fetchingArticle: false,
          fetchingArticles: false,
          page: 1,
          selected_tags: []
        };
      });

      it('should handle PUBLISHED_ARTICLES_REQUEST', () => {
        expect(
          publishedArticlesReducer(undefined, fetchPublishedArticles.request())
        ).toEqual(Object.assign({}, initialState, { fetchingArticles: true }));
      });

      it('should handle PUBLISHED_ARTICLES_SUCCESS', () => {
        expect(
          publishedArticlesReducer(undefined, fetchPublishedArticles.request())
        ).toEqual(Object.assign({}, initialState, { fetchingArticles: true }));

        expect(
          publishedArticlesReducer(
            undefined,
            fetchPublishedArticles.success(
              require('./mockedData').mockedArticles
            )
          )
        ).toEqual(
          Object.assign({}, initialState, {
            fetchingArticles: false,
            page: 2,
            articles: require('./mockedData').mockedArticles
          })
        );
      });

      it('should handle PUBLISHED_ARTICLES_ERROR', () => {
        expect(
          publishedArticlesReducer(undefined, fetchPublishedArticles.request())
        ).toEqual(Object.assign({}, initialState, { fetchingArticles: true }));

        expect(
          publishedArticlesReducer(undefined, fetchPublishedArticles.failure())
        ).toEqual(
          Object.assign({}, initialState, {
            fetchingArticles: false,
            errorArticles: true
          })
        );
      });
    });

    describe('PUBLISHED ARTICLE', () => {
      let initialState;

      beforeEach(() => {
        initialState = {
          articles: [],
          fetchingArticle: false,
          fetchingArticles: false,
          page: 1,
          selected_tags: []
        };
      });

      it('should handle PUBLISHED_ARTICLE_REQUEST', () => {
        expect(
          publishedArticlesReducer(undefined, fetchPublishedArticle.request(1))
        ).toEqual(Object.assign({}, initialState, { fetchingArticle: true }));
      });

      it('should handle PUBLISHED_ARTICLE_SUCCESS', () => {
        expect(
          publishedArticlesReducer(undefined, fetchPublishedArticle.request(1))
        ).toEqual(Object.assign({}, initialState, { fetchingArticle: true }));

        expect(
          publishedArticlesReducer(
            undefined,
            fetchPublishedArticle.success(
              require('./mockedData').mockedArticles[0]
            )
          )
        ).toEqual(
          Object.assign({}, initialState, {
            fetchingArticle: false,
            fetchedArticle: require('./mockedData').mockedArticles[0]
          })
        );
      });

      it('should handle PUBLISHED_ARTICLE_CANCEL', () => {
        expect(
          publishedArticlesReducer(undefined, fetchPublishedArticle.request(1))
        ).toEqual(Object.assign({}, initialState, { fetchingArticle: true }));

        expect(
          publishedArticlesReducer(undefined, fetchPublishedArticle.cancel())
        ).toEqual(Object.assign({}, initialState, { fetchingArticle: false }));
      });

      it('should handle PUBLISHED_ARTICLE_ERROR', () => {
        expect(
          publishedArticlesReducer(undefined, fetchPublishedArticle.request(1))
        ).toEqual(Object.assign({}, initialState, { fetchingArticle: true }));

        expect(
          publishedArticlesReducer(undefined, fetchPublishedArticle.failure())
        ).toEqual(
          Object.assign({}, initialState, {
            fetchingArticle: false,
            errorArticle: true
          })
        );
      });
    });

    describe('TAG LIST', () => {
      it('should handle PUBLISHED_ARTICLES_UPDATE_TAG_LIST', () => {
        expect(
          publishedArticlesReducer(undefined, updateTagList('tag'))
        ).toEqual({
          articles: [],
          fetchingArticle: false,
          fetchingArticles: false,
          page: 1,
          selected_tags: ['tag']
        });
      });
    });
  });

  describe('OPTIONS REDUCER', () => {
    let initialState;

    beforeEach(() => {
      initialState = {
        darkTheme: false
      };
    });

    it('should handle CHANGE_APP_THEME to true', () => {
      expect(optionsReducer(undefined, changeTheme())).toEqual(
        Object.assign({}, initialState, { darkTheme: true })
      );
    });

    it('should handle CHANGE_APP_THEME to false', () => {
      initialState.darkTheme = true;
      expect(optionsReducer(initialState, changeTheme())).toEqual(
        Object.assign({}, initialState, { darkTheme: false })
      );
    });
  });
});
