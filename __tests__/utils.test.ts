import { loadIcons } from '../src/utils/getIcon';

jest.mock('react-native-vector-icons/MaterialIcons', () => ({
  getImageSource: (name: string) => ({ name })
}));

describe('UTILS', () => {
  it('[LOAD ICONS] should return an array of ICONS', async () => {
    const icons = await loadIcons([{ name: 'home' }, { name: 'settings' }]);
    expect(icons).toHaveLength(2);
    expect(icons[0].name).toEqual('home');
    expect(icons[1].name).toEqual('settings');
  });
});
