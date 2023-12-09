import Toast from 'react-native-toast-message';

export const handleError = (title: string, msg: string) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: msg,
    position: 'top',
  });
};
