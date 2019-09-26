import { expect, device, element, by } from 'detox';

describe('MAIN SCREEN', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show STEP ONE text correctly', async () => {
    await expect(element(by.id('stepOne'))).toBeVisible();
  });
});
