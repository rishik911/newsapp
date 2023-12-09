import React, {useContext, useRef} from 'react';
import {ListItemsTypes} from './types';
import {Text, View, Image, Pressable, Animated} from 'react-native';
import {styles} from './styles';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {AppContext} from './AppContext';

const ListItem: React.FC<ListItemsTypes> = ({
  title,
  imageUrl,
  description,
  id,
  isPinned,
  object,
}) => {
  const {deleteItem, pinItem, removePin} = useContext(AppContext);

  const swipeRef = useRef(null);

  const removedFromPinned = () => {
    removePin(object);
  };

  const deleteCurrentItem = () => {
    deleteItem(id);
    swipeRef.current?.close();
  };

  const pinCurrentItem = () => {
    swipeRef.current?.close();
    pinItem(object);
  };

  const renderLeftActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-30, -20, 0, 1],
    });

    if (!isPinned)
      return (
        <RectButton style={{}} onPress={deleteCurrentItem}>
          <Animated.View
            style={[
              {
                transform: [{translateX: trans}],
              },
              styles?.swipableButtonDelete,
            ]}>
            <Icon name="delete" color="white" size={30} />
          </Animated.View>
        </RectButton>
      );
  };

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 10, 10, 10],
    });
    if (!isPinned)
      return (
        <RectButton style={{}} onPress={pinCurrentItem}>
          <Animated.View
            style={[
              {
                transform: [{translateX: trans}],
              },
              styles?.swipableButton,
            ]}>
            <Icon name="pushpino" color="white" size={30} />
          </Animated.View>
        </RectButton>
      );
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      ref={swipeRef}>
      <View style={styles.holder}>
        <Image
          source={imageUrl ? {uri: imageUrl} : require('../assets/noImage.jpg')}
          style={styles.imageStyle}
        />
        <View style={styles.textHolder}>
          <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
            {title}
          </Text>
          <Text
            style={styles.descripton}
            numberOfLines={2}
            ellipsizeMode="tail">
            {description}
          </Text>
        </View>
        {isPinned && (
          <AnimatedTouchable
            onPress={removedFromPinned}
            style={styles.pinContainer}>
            <Icon name="pushpin" size={20} color="black" />
          </AnimatedTouchable>
        )}
      </View>
    </Swipeable>
  );
};

const areProprEqual = (prevProps, nextProps) => {
  return (
    prevProps?.id === nextProps?.id &&
    prevProps?.isPinned === nextProps?.isPinned
  );
};

export default React.memo(ListItem, areProprEqual);
