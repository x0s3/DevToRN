import { Share, Alert } from 'react-native';

interface ShareProps {
  url: string;
  title: string;
  message: string;
}

export async function shareItem({ url, message, title }: ShareProps) {
  try {
    const result = await Share.share({
      url,
      title,
      message
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    Alert.alert('Error sharing article');
  }
}
