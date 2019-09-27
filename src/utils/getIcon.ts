import Icon from 'react-native-vector-icons/MaterialIcons';

interface IIcon {
  readonly name: string;
  readonly size?: number;
  readonly color?: string;
}

export const loadIcons = (icons: IIcon[]) =>
  Promise.all(
    icons.map((icon: IIcon) =>
      Icon.getImageSource(icon.name, icon.size || 30, icon.color || 'black')
    )
  )
    .then(sources => sources)
    .catch(error => error);
