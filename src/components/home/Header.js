import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Color, DefaultUserImage} from '../../constants';

const HomeHeader = ({ selectedArea, onPressSelectArea, onPressProfileImage }) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.areaText}>Select area</Text>
        <TouchableOpacity
          style={styles.selectAreaButton}
          onPress={onPressSelectArea}
				>
          <Text style={styles.selectedAreaText}>{selectedArea}</Text>
          <Icon name="chevron-down" size={20} color={Color.black} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={onPressProfileImage}
        style={styles.userImageWrapper}>
        <Image
          style={styles.userImage}
          source={DefaultUserImage}
          width={50}
          height={50}
        />
      </TouchableOpacity>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
	header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  areaText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.grayText,
  },
  selectAreaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 3,
    width: windowWidth * 0.4,
  },
  selectedAreaText: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
    color: Color.black,
  },
  userImageWrapper: {
    height: "100%",
  },
  userImage: {
    borderRadius: 25
  }
});

//make this component available to the app
export default HomeHeader;
