import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  holder: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'grey',
    paddingBottom: 4,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    elevation: 3,
    height: 140,
    backgroundColor: 'white',
  },
  imageStyle: {
    borderRadius: 12,
    margin: 8,
    width: 120,
    height: 120,
  },
  textHolder: {
    flex: 1,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  descripton: {
    fontSize: 14,
    fontWeight: '600',
    color: 'grey',
    paddingTop: 8,
  },
  swipableButton: {
    backgroundColor: 'green',
    height: 85,
    width: 50,
    borderRadius: 12,
    marginLeft: 20,
    marginTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipableButtonDelete: {
    backgroundColor: 'red',
    height: 85,
    width: 50,
    borderRadius: 12,
    marginLeft: 20,
    marginTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginTop: height / 2.2,
  },
  pinContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: '#E8DCDC',
    borderBottomEndRadius: 50,
    marginTop: 1,
    borderTopLeftRadius: 8,
    marginLeft: 1,

    paddingLeft: 12,
    paddingTop: 12,
    top: 0,
  },
  appContainer: {
    height: height,
    backgroundColor: '#fff',
  },
});
