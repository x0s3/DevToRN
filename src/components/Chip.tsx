import React, { useState, useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Chip as PaperChip } from 'react-native-paper';

interface ChipProps {
  text: string;
  action: (t: string) => void;
  style?: StyleProp<ViewStyle>;
}

export const Chip = React.memo<ChipProps>(({ text, action, style = {} }) => {
  const [selected, setSelected] = useState<boolean>(false);
  const onPressChipAction = useCallback(() => {
    setSelected(s => !s);
    action(text);
  }, [selected, text, action]);

  return (
    <PaperChip
      icon={''}
      style={style}
      testID={text}
      selected={selected}
      onPress={onPressChipAction}
    >
      {text}
    </PaperChip>
  );
});
