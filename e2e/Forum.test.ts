import { expect } from 'detox';
import {
  FLATLIST_FILTERS_TEST,
  FLATLIST_PUB_ARTICLES_TEST,
  FORUM_BOTTOM_TEST
} from '../src/navigation/testIDs';
import actions from './Utils';

const { elementById, sleep } = actions;

describe('FORUM SCREEN', () => {
  it('should render filter lists correctly', async () => {
    await expect(elementById(FLATLIST_FILTERS_TEST)).toBeVisible();
  });

  it('should render articles lists correctly scroll it and ref to top', async () => {
    const postId = 'article-0';

    await sleep(500);
    await expect(elementById(FLATLIST_PUB_ARTICLES_TEST)).toBeVisible();
    await expect(elementById(postId)).toBeVisible();
    await elementById(FLATLIST_PUB_ARTICLES_TEST).scroll(500, 'down');

    await expect(elementById(postId)).toBeNotVisible();

    await elementById(FORUM_BOTTOM_TEST).tap();

    await expect(elementById(postId)).toBeVisible();
  });

  it('should tap filter item correctly', async () => {
    await elementById('javascript').tap();
  });
});
