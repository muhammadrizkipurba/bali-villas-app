import React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import {SERVER_URL} from '../api';
import VillaCard from '../components/home/VillaCard';
import {Color} from '../constants';

const SearchResultScreen = ({navigation, route}) => {
  const [data, setData] = useState([]);

  const goToVillaDetailScreen = data => {
    console.log('go to villa details screen');
  };

  useEffect(() => {
    const {data} = route.params;
    setData(data);
  }, [route]);

  const renderVilla = () => {
    return data.map((item, idx) => {
      const villaName = item.name.toLowerCase();
      const folderName = villaName.split(' ').join('_');
      const imageURL = `${SERVER_URL}/villas/${folderName}/banner.jpg`;
      return (
        <View key={`villa-card-${idx + 1}`}>
          <VillaCard
            type="recommended"
            item={item}
            customCardStyle={styles.card}
            onPress={() => goToVillaDetailScreen(item)}
            imageURL={imageURL}
            customBannerImgStyle={styles.customBannerImgStyle}
            // isLoadingFavorite={isLoadingAreaFavorite[index]}
            // isFavorited={isFavorited}
            // favoriteVillaHandler={() => areaFavoriteVillaHandler(item.name, index)}
          />
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={{backgroundColor: Color.white}}>
      <View style={styles.container}>
        {data.length > 0 ? (
          <ScrollView
            style={styles.villaRenderWrapper}
            showsVerticalScrollIndicator={false}>
            {renderVilla()}
          </ScrollView>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  villaRenderWrapper: {
    paddingHorizontal: 20,
  },
  card: {
    marginBottom: 20,
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.gray,
    shadowColor: Color.gray,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1,
  },
  customBannerImgStyle: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default SearchResultScreen;
