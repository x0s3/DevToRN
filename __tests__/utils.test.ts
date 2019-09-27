import { loadIcons } from '../src/utils/getIcon';

jest.mock('react-native-vector-icons/MaterialIcons', () => ({
  getImageSource: () => ({ name: 'test' })
}));

describe('UTILS', () => {
  it('[LOAD ICONS] should return an array of ICONS', async () => {
    const icons = await loadIcons([{ name: 'home' }, { name: 'settings' }]);
    expect(icons).toHaveLength(2);
    expect(icons[0].name).toEqual('test');
  });
});
