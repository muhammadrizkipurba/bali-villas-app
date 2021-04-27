import React from 'react';
import {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {Color, LogoTextColorImage, LoadingGifHorizontal} from '../constants';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home') // redirect to MainApp Display
    }, 1000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={LogoTextColorImage} style={styles.logo} />
      <View style={styles.loadingWrapper}>
        <Image source={LoadingGifHorizontal} style={styles.loading} />
      </View>
      <View style={styles.notesWrapper}>
        <Text style={styles.notesVersion}>v1.0.0</Text>
        <Text style={styles.notesAuthor}>Powered by Mhd Rizki Purba</Text>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: windowWidth * 0.5,
    height: 200,
    resizeMode: 'contain',
  },
  loadingWrapper: {
    height: 260,
    width: 220,
  },
  loading: {
    height: '50%',
    width: '100%',
  },
  notesWrapper: {
    fontSize: 15,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesVersion: {
    marginBottom: 5,
  },
});

export default SplashScreen;
