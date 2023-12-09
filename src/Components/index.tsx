import React, {useContext} from 'react';
import {Text, FlatList, View} from 'react-native';
import {AppIndexTypes} from './types';
import {AppContext, AppContextProvider} from './AppContext';
import NewsList from './NewsList';

const AppIndex: React.FC<AppIndexTypes> = ({}) => {
  return (
    <AppContextProvider>
      <NewsList />
    </AppContextProvider>
  );
};

export default AppIndex;
