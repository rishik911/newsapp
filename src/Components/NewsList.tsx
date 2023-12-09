import React, {useCallback, useContext, useRef} from 'react';
import {NewsListTypes} from './types';
import {FlatList, View, ActivityIndicator, RefreshControl} from 'react-native';
import {AppContext} from './AppContext';
import ListItem from './ListItem';
import {styles} from './styles';

const ITEM_HEIGHT = 140;

const NewsList: React.FC<NewsListTypes> = ({}) => {
  const {dataList, pinnedList, resetList, handleRefresh, refreshState} =
    useContext(AppContext);

  const listRef = useRef(null);

  const handleListEnd = () => {
    resetList();
    listRef?.current?.scrollToOffset({animated: true, offset: 0});
  };

  const renderItem = useCallback((curr: object) => {
    const {item} = curr || {};
    return (
      <ListItem
        title={item?.title}
        description={item?.description}
        imageUrl={item?.urlToImage}
        id={item?.id}
        isPinned={item?.isPinned}
        object={item}
      />
    );
  }, []);

  const renderEmptyView = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  };

  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FlatList
      ref={listRef}
      keyExtractor={item => item?.id}
      initialNumToRender={10}
      scrollEventThrottle={20}
      data={pinnedList.concat(dataList)}
      decelerationRate="fast"
      renderItem={renderItem}
      getItemLayout={getItemLayout}
      refreshControl={
        <RefreshControl refreshing={refreshState} onRefresh={handleRefresh} />
      }
      onEndReached={handleListEnd}
      ListEmptyComponent={renderEmptyView}
    />
  );
};

export default NewsList;
