import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Title, Caption } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CommonErrorProps {
  retryAction?: () => void;
  description?: string;
}

export const CommonError = React.memo<CommonErrorProps>(
  ({ retryAction, description }) => (
    <View
      testID={'commonErrorView'}
      style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}
    >
      <Title style={{ color: '#000' }}>Ups seems like we have an error</Title>
      {description && <Text testID={'descriptionError'}>{description}</Text>}
      <Icon size={120} name={'sentiment-very-dissatisfied'} />
      {retryAction && (
        <TouchableOpacity testID={'retryActionButton'} onPress={retryAction}>
          <Caption style={{ color: '#000' }}>Tap here to retry action</Caption>
        </TouchableOpacity>
      )}
    </View>
  )
);
