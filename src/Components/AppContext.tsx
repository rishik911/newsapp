import React, {createContext, useEffect, useRef, useState} from 'react';
import {AppContextTypes} from './types';
import {getStories} from '../Utils/service';
import {
  ERROR_OBJECT,
  STORAGE_KEYS,
  appendIdToList,
  deleteItemFromList,
  readFromStorage,
  updateCurrentDataLst,
  writeToStorage,
} from '../Utils/constants';
import {handleError} from '../Utils/ErrorHandler';
import NetInfo from '@react-native-community/netinfo';

const initialState = {
  dataList: [],
  deleteItem: (id: string | number) => {},
  resetList: () => {},
  pinnedList: [],
  pinItem: (data: Object) => {},
  removePin: (data: Object) => {},
  handleRefresh: () => {},
  refreshState: false,
};

const AppContext = createContext(initialState);

const AppContextProvider: React.FC<AppContextTypes> = ({children}) => {
  const [dataList, setDataList] = useState([]);
  const [pinnedList, setPinnedList] = useState([]);
  const [refreshState, setRefreshState] = useState(false);
  const [isConnected, setConnectionStatus] = useState(true);
  const querry = useRef(1);

  const intervalRef = useRef(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (
        !state?.isInternetReachable &&
        state?.isInternetReachable !== isConnected
      ) {
        setConnectionStatus(prev => !prev);
      }
    });

    readFromStorage().then(data => {
      if (data?.length > 0) {
        setDataList(data);
        startBackgroundService();
      } else {
        makeInitialAPICall();
      }
    });
    readFromStorage(STORAGE_KEYS.PIN_LIST)
      .then(data => setPinnedList(data))
      .catch(E => handleError(ERROR_OBJECT.title, ERROR_OBJECT.msg));

    return () => {
      unsubscribe();
    };
  }, []);

  const makeInitialAPICall = (number = 100) => {
    if (!isConnected) {
      handleError('No internet', 'Connect to internet');
      return;
    }
    querry.current += 1;
    getStories(querry.current, number) //we are using a random query param in order to get new stories on every api call
      .then(response => {
        if (response?.data?.articles) {
          const updatedList = appendIdToList(response?.data?.articles);
          updateStateOfList(updatedList);
          setRefreshState(false);
          startBackgroundService();
        }
      })
      .catch(e => handleError(ERROR_OBJECT.title, ERROR_OBJECT.msg));
  };

  const updateStateOfList = (updatedList: Object[]) => {
    writeToStorage(updatedList)
      .then(success => {
        readFromStorage()
          .then(succ => setDataList(succ))
          .catch(e => handleError(ERROR_OBJECT.title, ERROR_OBJECT.msg));
      })
      .catch(e => handleError(ERROR_OBJECT.title, ERROR_OBJECT.msg));
  };

  const startBackgroundService = () => {
    if (!isConnected) {
      handleError('No internet', 'Connect to internet');
      return;
    }
    intervalRef.current = setInterval(() => {
      if (!isConnected) {
        clearInterval(intervalRef?.current);
      }
      getStories(querry?.current, 5) //we are using a random query param in order to get new stories on every api call
        .then(response => {
          if (response?.data?.articles) {
            setDataList(prev => {
              const data = updateCurrentDataLst(prev, response?.data?.articles);
              return data;
            });
            querry.current += 1;
          }
        })
        .catch(e => handleError(ERROR_OBJECT.title, ERROR_OBJECT.msg));
    }, 30000);
  };

  const deleteItem = (id: string | number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const newList = deleteItemFromList(id, dataList);
    updateStateOfList(newList);
    startBackgroundService();
  };

  const resetList = () => {
    setDataList([]);
    writeToStorage([])
      .then(succ => {
        makeInitialAPICall();
      })
      .catch(e => handleError('Something went wrng', 'Try again later'));
  };

  const pinItem = (item: Object) => {
    const pinnedArray = [...pinnedList];
    pinnedArray.push({...item, isPinned: true});
    writeToStorage(pinnedArray, STORAGE_KEYS.PIN_LIST);
    setPinnedList(pinnedArray);
    deleteItem(item?.id);
  };

  const removePin = (data: Object) => {
    const updatedArray = pinnedList.filter(curr => curr?.id !== data?.id);
    setPinnedList(updatedArray);
    writeToStorage(updatedArray, STORAGE_KEYS.PIN_LIST);
    const currList = [...dataList];
    currList.unshift({...data, isPinned: false});
    updateStateOfList(currList);
  };

  const handleRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (!isConnected) {
      handleError('No internet', 'Connect to internet');
      return;
    }
    setRefreshState(true);
    makeInitialAPICall(5);
  };

  return (
    <AppContext.Provider
      value={{
        dataList,
        deleteItem,
        resetList,
        pinnedList,
        pinItem,
        handleRefresh,
        removePin,
        refreshState,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export {AppContext, AppContextProvider};
