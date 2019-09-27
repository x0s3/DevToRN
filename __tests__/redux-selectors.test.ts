import { filterArticlesBySelectedTags } from '../src/redux/selectors';
import { mockedArticles } from './mockedData';

describe('REDUX SELECTORS', () => {
  describe('PUBLISHED ARTICLES SELECTORS', () => {
    it('should have filtered articles by filtering articles with reselector', () => {
      const actual = filterArticlesBySelectedTags.resultFunc(mockedArticles, [
        'history'
      ]);
      const expected = mockedArticles;
      expect(actual).toEqual(expected);
    });

    it('should have return an empty array by filtering articles with reselector', () => {
      const actual = filterArticlesBySelectedTags.resultFunc(mockedArticles, [
        ''
      ]);
      const expected = mockedArticles;
      expect(actual).toEqual(expected);
    });
  });
});
