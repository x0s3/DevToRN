import React from 'react';
import { View } from 'react-native';

const componentJSON = [
  {
    components: [
      require('react-native-paper').Text,
      require('@components/index').DarkModeButton
    ],
    props: [
      [
        {
          children: 'Enable dark mode:',
          key: 'textTheme',
          testID: 'enableTextID',
          style: { color: '#000' }
        }
      ],
      [{ testID: 'changeThemeButtonID', disabled: false, key: 'darkButton' }]
    ]
  }
];

function Options() {
  return (
    <>
      {componentJSON.map((child, y) => (
        <View
          key={`part-${y}`}
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginTop: 20,
            padding: 5
          }}
        >
          {child.components.map((x, i) =>
            React.createElement(x, { ...child.props[i][0] })
          )}
        </View>
      ))}
    </>
  );
}

export default Options;
