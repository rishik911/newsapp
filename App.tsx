import React, {useEffect} from 'react';
import AppIndex from './src/Components';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaView} from 'react-native';
import {styles} from './src/Components/styles';
import Toast, {ErrorToast} from 'react-native-toast-message';

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 16,
        color: '#000',
        fontWeight: '600',
      }}
    />
  ),
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView>
      <SafeAreaView style={styles.appContainer}>
        <AppIndex />
        <Toast config={toastConfig} />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
