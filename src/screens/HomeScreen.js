import React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const HomeScreen = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpenAreaPicker, setIsOpenAreaPicker] = useState(false);
  
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => setIsOpenAreaPicker(false)}>
        <View style={{flex: 1, width: "100%", justifyContent: 'center', alignItems: 'center'}}>
          <Text>Home Screen</Text>
          <TouchableOpacity onPress={() => setIsOpenAreaPicker(true)}>
            <Text>Select Area</Text>
          </TouchableOpacity>
          <Text>{selectedValue}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Picker
        selectedValue={selectedValue}
        style={{...styles.dropdownPicker, display: isOpenAreaPicker ? 'flex' : 'none'}}
        onValueChange={(value) => {
          setSelectedValue(value);
        }}
        dropdownIconColor="red"
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
        <Picker.Item label="Node.js" value="nodejs" />
        <Picker.Item label="Node.js" value="nodejs" />
        <Picker.Item label="Node.js" value="nodejs" />
        <Picker.Item label="Node.js" value="nodejs" />
        <Picker.Item label="Node.js" value="nodejs" />
        <Picker.Item label="Node.js" value="nodejs" />
        <Picker.Item label="Node.js" value="nodejs" />
        <Picker.Item label="Node.js" value="nodejs" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFF',
  },
  dropdownPicker: {
    flex: 1,
    backgroundColor: 'gray',
    zIndex: 3,
    width: "100%",
    position: 'absolute',
    bottom: 0,
  }
});

export default HomeScreen;