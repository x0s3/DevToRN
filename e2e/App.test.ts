import { by, device, element, expect } from 'detox';
import {
  FORUM_BOTTOM_TEST,
  FORUM_HEADER_TEST,
  OPTIONS_BOTTOM_TEST,
  OPTIONS_HEADER_TEST,
  SEARCH_FILTERS_ICON_TEST,
  YOUR_ACCOUNT_BOTTOM_TEST,
  YOUR_ACCOUNT_HEADER_TEST
} from '../src/navigation/testIDs';
import actions from './Utils';

const { elementByLabel, elementById } = actions;

describe('MAIN SCREEN BOTTOM NAVIGATION', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show STEP ONE text correctly', async () => {
    await expect(element(by.id('stepOne'))).toBeVisible();
  });

  it('should have visible FORUM and SEARCH ICON on tab FORUM', async () => {
    await expect(elementById(FORUM_HEADER_TEST)).toBeVisible();
    await expect(elementById(SEARCH_FILTERS_ICON_TEST)).toExist();
    await expect(elementByLabel('FORUM')).toBeVisible();
  });

  it('should tap on YOUR ACCOUNT tab from tab FORUM', async () => {
    await expect(elementById(FORUM_HEADER_TEST)).toBeVisible();
    await expect(elementById(SEARCH_FILTERS_ICON_TEST)).toExist();
    await expect(elementByLabel('FORUM')).toBeVisible();

    await elementById(YOUR_ACCOUNT_BOTTOM_TEST).tap();

    await expect(elementById(FORUM_HEADER_TEST)).toBeNotVisible();
    await expect(elementById(SEARCH_FILTERS_ICON_TEST)).toNotExist();

    await expect(elementById(YOUR_ACCOUNT_HEADER_TEST)).toBeVisible();
    await expect(elementByLabel('YOUR ACCOUNT')).toBeVisible();
  });

  it('should tap on OPTIONS tab from tab FORUM', async () => {
    await expect(elementById(FORUM_HEADER_TEST)).toBeVisible();
    await expect(elementById(SEARCH_FILTERS_ICON_TEST)).toExist();
    await expect(elementByLabel('FORUM')).toBeVisible();

    await elementById(OPTIONS_BOTTOM_TEST).tap();

    await expect(elementById(FORUM_HEADER_TEST)).toBeNotVisible();
    await expect(elementById(SEARCH_FILTERS_ICON_TEST)).toNotExist();

    await expect(elementById(OPTIONS_HEADER_TEST)).toBeVisible();
    await expect(elementByLabel('OPTIONS')).toBeVisible();
  });

  it('should tap on OPTIONS tab from tab FORUM and tap again to FORUM', async () => {
    await expect(elementById(FORUM_HEADER_TEST)).toBeVisible();
    await expect(elementById(SEARCH_FILTERS_ICON_TEST)).toExist();
    await expect(elementByLabel('FORUM')).toBeVisible();

    await elementById(OPTIONS_BOTTOM_TEST).tap();

    await expect(elementById(FORUM_HEADER_TEST)).toBeNotVisible();
    await expect(elementById(SEARCH_FILTERS_ICON_TEST)).toNotExist();

    await expect(elementById(OPTIONS_HEADER_TEST)).toBeVisible();
    await expect(elementByLabel('OPTIONS')).toBeVisible();

    await elementById(FORUM_BOTTOM_TEST).tap();

    await expect(elementById(FORUM_HEADER_TEST)).toBeVisible();
    await expect(elementById(SEARCH_FILTERS_ICON_TEST)).toExist();
    await expect(elementByLabel('FORUM')).toBeVisible();
  });
});
