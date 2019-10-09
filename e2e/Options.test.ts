import { expect } from 'detox';
import {
  OPTIONS_BOTTOM_TEST,
  OPTIONS_HEADER_TEST
} from '../src/navigation/testIDs';
import actions from './Utils';

const { elementByLabel, elementById, sleep } = actions;

describe('OPTIONS SCREEN', () => {
  it('should have visible OPTIONS HEADER on tab OPTIONS', async () => {
    await elementById(OPTIONS_BOTTOM_TEST).tap();

    await expect(elementById(OPTIONS_HEADER_TEST)).toBeVisible();
    await expect(elementByLabel('Options')).toBeVisible();
  });

  it('should change dark theme on tab OPTIONS', async () => {
    await expect(elementById('enableTextID')).toBeVisible();

    await expect(elementById('changeThemeButtonID')).toHaveValue('0');

    await elementById('changeThemeButtonID').tap();

    await expect(elementById('changeThemeButtonID')).toHaveValue('1');
  });
});
