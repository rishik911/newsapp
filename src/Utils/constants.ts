import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {handleError} from './ErrorHandler';

export const STORAGE_KEYS = {
  PIN_LIST: 'pinned-list',
  DATA_LIST: 'list',
};

export const updateCurrentDataLst = (
  currState: Object[],
  newState: Object[],
): Object[] => {
  const array = [...currState];
  if (currState?.length > 0 && newState?.length > 0) {
    newState?.forEach((item, index) => {
      array[index] = item;
    });
  }
  return appendIdToList(array);
};

export const appendIdToList = (list: Object[]) => {
  list.forEach(curr => {
    curr.isPinned = false;
    curr.id = uuidv4();
  });
  return list;
};

export const deleteItemFromList = (id: string | number, list: Object[]) => {
  const newArr = list.filter(curr => curr?.id !== id);
  return newArr;
};

export const writeToStorage = async (
  data: Object[],
  key = STORAGE_KEYS.DATA_LIST,
) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    // handle error
    handleError('Error', 'Error in writing values');
  }
};

export const readFromStorage = async (key = STORAGE_KEYS.DATA_LIST) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    } else return [];
  } catch (e) {
    // error reading value
    handleError('Error', 'Error in reading values');
  }
};

export const ERROR_OBJECT = {
  title: 'Something went wrong!',
  msg: 'Try again after some time!',
};
