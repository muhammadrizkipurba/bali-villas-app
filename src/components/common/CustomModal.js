import React from 'react';
import {View, Modal, StyleSheet, SafeAreaView} from 'react-native';
import { Color } from '../../constants';

const CustomModal = ({ modalVisible, transparentBackground, onCloseModal, children }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={transparentBackground ? transparentBackground : false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          onCloseModal();
        }}
      >
        <SafeAreaView style={{ flex: 0, backgroundColor: Color.white }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
          { children }
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});

export default CustomModal;
