import { expect, device } from 'detox';
import {
  ARTICLE_TOP_BAR_TEST,
  BOTTOM_TABS_TEST,
  SHARE_ARTICLE_BUTTON_TEST,
  FLATLIST_FILTERS_TEST,
  FLATLIST_PUB_ARTICLES_TEST,
  FORUM_BOTTOM_TEST
} from '../src/navigation/testIDs';
import actions from './Utils';

const { elementById, elementByLabel, sleep, tapBackIos } = actions;

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
    await elementById('typescript').tap();

    await sleep(500);

    await elementById('typescript').tap();
  });

  it('should tap article and open article screen correctly', async () => {
    const postId = 'article-0';

    await sleep(500);

    await elementById(postId).tap();

    await sleep(1000);

    await expect(elementById('articleFetching')).toNotExist();
    await expect(elementById('articleRootView')).toExist();
    await expect(elementById('articleRootView')).toBeVisible();

    await expect(elementById(BOTTOM_TABS_TEST)).toBeNotVisible();
    await expect(elementById(FLATLIST_PUB_ARTICLES_TEST)).toBeNotVisible();

    await expect(elementById(SHARE_ARTICLE_BUTTON_TEST)).toBeVisible();

    await expect(elementById(ARTICLE_TOP_BAR_TEST)).toBeVisible();
    await expect(elementByLabel('Article')).toBeVisible();
  });

  it('should tap back to forum view from article view', async () => {
    const postId = 'article-0';

    await expect(elementById(BOTTOM_TABS_TEST)).toBeNotVisible();
    await expect(elementById(FLATLIST_PUB_ARTICLES_TEST)).toBeNotVisible();

    await expect(elementById(ARTICLE_TOP_BAR_TEST)).toBeVisible();
    await expect(elementByLabel('Article')).toBeVisible();

    if (device.getPlatform() === 'android') {
      await device.pressBack();
    } else {
      await tapBackIos();
    }

    await expect(elementById(postId)).toBeVisible();
    await expect(elementById(BOTTOM_TABS_TEST)).toBeVisible();
    await expect(elementById(FLATLIST_PUB_ARTICLES_TEST)).toBeVisible();
  });
});
