import { Navigation } from 'react-native-navigation';
import { loadIcons } from '../utils';
import {
  BOTTOM_TABS_SCREEN,
  FORUM_SCREEN,
  OPTIONS_SCREEN,
  PROFILE_SCREEN
} from './constants';

export async function homeStack(): Promise<void> {
  const icons = await loadIcons([
    { name: 'home' },
    { name: 'search' },
    { name: 'person' },
    { name: 'settings' }
  ]);

  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: BOTTOM_TABS_SCREEN,
        options: {
          bottomTabs: {
            backgroundColor: '#1B2E63',
            testID: require('./testIDs').BOTTOM_TABS_TEST
          },
          topBar: {
            visible: true
          }
        },
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: FORUM_SCREEN,
                    options: {
                      topBar: {
                        testID: require('./testIDs').FORUM_HEADER_TEST,
                        title: {
                          text: 'Forum'
                        },
                        rightButtons: [
                          {
                            color: '#F7F9FC',
                            icon: icons[1],
                            id: 'SEARCH_FILTERS_ICON',
                            testID: require('./testIDs')
                              .SEARCH_FILTERS_ICON_TEST
                          }
                        ]
                      }
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  icon: icons[0],
                  testID: require('./testIDs').FORUM_BOTTOM_TEST
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: PROFILE_SCREEN,
                    options: {
                      topBar: {
                        testID: require('./testIDs').YOUR_ACCOUNT_HEADER_TEST,
                        title: { text: 'Account' }
                      }
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  icon: icons[2],
                  testID: require('./testIDs').YOUR_ACCOUNT_BOTTOM_TEST
                }
              }
            }
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: OPTIONS_SCREEN,
                    options: {
                      topBar: {
                        testID: require('./testIDs').OPTIONS_HEADER_TEST,
                        title: { text: 'Options' }
                      }
                    }
                  }
                }
              ],
              options: {
                bottomTab: {
                  testID: require('./testIDs').OPTIONS_BOTTOM_TEST,
                  icon: icons[3]
                }
              }
            }
          }
        ]
      }
    }
  });
}

export function initialStack(): void {
  Navigation.setDefaultOptions({
    popGesture: true,
    statusBar: {
      visible: true,
      style: 'light',
      backgroundColor: '#293157'
    },
    bottomTab: {
      iconColor: '#F7F9FC',
      selectedIconColor: '#42AAFF'
    },
    topBar: {
      background: { color: '#1B2E63' },
      title: {
        fontSize: 30,
        alignment: 'center',
        fontFamily: 'opensans-bold',
        color: '#F7F9FC'
      },
      backButton: {
        color: '#F7F9FC'
      }
    },
    layout: {
      orientation: ['portrait']
    }
  });
  homeStack();
}
