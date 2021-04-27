import React from 'react';
import {useState, useEffect} from 'react';
import {SERVER_URL} from '../api';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { funct } from '../constants/functions';
import Icon from 'react-native-vector-icons/Feather';
import {Color} from '../constants';
import HomeHeader from '../components/home/Header';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import VillaCard from '../components/home/VillaCard';

const HomeScreen = () => {
  const [isLoadingRecommendFavorite, setIsLoadingRecommendFavorite] = useState([]);
  const [isLoadingAreaFavorite, setIsLoadingAreaFavorite] = useState([]);
  const [selectedArea, setSelectedArea] = useState('Canggu');
  const [searchVillaName, setSearchVillaName] = useState('');
  const [favoriteVilla, setFavoriteVilla] = useState(["Villa Kayajiwa", "The Iman Villa"]);
  const [villasDataByArea, setvillasDataByArea] = useState([]);
  const [recomendedVillas, setRecomendedVillas] = useState([]);

  const getVillas = async () => {
    let response = await fetch(`${SERVER_URL}/villa/list`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      const responseJSON = await response.json();
      const {data} = responseJSON.message;
      
      const filterByArea = data.filter((item) => {
        return item.area === selectedArea;
      });
      
      const recommendedVillaData = data.sort((a, b) => b.rating - a.rating);

      const villasDataByArea = funct.shuffleArr(filterByArea);

      const isLoadingAreaFavoriteInit = [];
      for (var i = 1; i <= filterByArea.length; i++) {
        isLoadingAreaFavoriteInit.push(false);
      };

      const isLoadingRecommendFavoriteInit = [];
      for (var i = 1; i <= recommendedVillaData.length; i++) {
        isLoadingRecommendFavoriteInit.push(false);
      };

      setIsLoadingAreaFavorite(isLoadingAreaFavoriteInit);
      setIsLoadingRecommendFavorite(isLoadingRecommendFavoriteInit);
      setvillasDataByArea(villasDataByArea);
      setRecomendedVillas(recommendedVillaData);
    } else {
      alert(response.message);
    }
    return response;
  };

  const onUpdateIsLoadingAreaFavorite = (value, index) => {
    let newArr = [...isLoadingAreaFavorite];
    newArr[index] = value;
    setIsLoadingAreaFavorite(newArr);
    return newArr;
  }

  const onUpdateIsLoadingRecommendFavorite = (value, index) => {
    let newArr = [...isLoadingRecommendFavorite];
    newArr[index] = value;
    setIsLoadingRecommendFavorite(newArr);
    return newArr;
  }

  const areaFavoriteVillaHandler = (name, index) => {
    onUpdateIsLoadingAreaFavorite(true, index);
    const isExist = favoriteVilla.includes(name);
    let newFavoriteVilla = favoriteVilla;
    
    if(isExist) {
      newFavoriteVilla = newFavoriteVilla.filter(str => str !== name);
    } else {
      newFavoriteVilla = newFavoriteVilla.concat(name);
    };
    setFavoriteVilla(newFavoriteVilla);

    setTimeout(() => {
      onUpdateIsLoadingAreaFavorite(false, index);
    }, 600);
  };

  const recommendFavoriteVillaHandler = (name, index) => {
    onUpdateIsLoadingRecommendFavorite(true, index);
    const isExist = favoriteVilla.includes(name);
    let newFavoriteVilla = favoriteVilla;
    
    if(isExist) {
      newFavoriteVilla = newFavoriteVilla.filter(str => str !== name);
    } else {
      newFavoriteVilla = newFavoriteVilla.concat(name);
    };
    setFavoriteVilla(newFavoriteVilla);

    setTimeout(() => {
      onUpdateIsLoadingRecommendFavorite(false, index);
    }, 600);
  };

  

  useEffect(() => {
    getVillas();
  }, []);

  const onSelectArea = () => {
    console.log('Open select area modal');
  };

  const goToScreen = screenName => {
    console.log(`Go to ${screenName} screen`);
  };

  const goToVillaDetailScreen = data => {
    console.log(`Go to Villa detail screen with villa _id : ${data._id}`);
  };

  const onMoreFilter = () => {
    console.log('Open more filter modal');
  };

  const renderSelectedAreaVillas = ({item, index}) => {
    if (item.area === selectedArea && index < 4) {
      const villaName = item.name.toLowerCase();
      const folderName = villaName.split(" ").join("_");
      const imageURL = `${SERVER_URL}/villas/${folderName}/banner.jpg`;
      const address = item.overview.find(o => o.title === 'ADDRESS');
      const isFavorited = favoriteVilla.includes(item.name);

      return (
        <VillaCard 
          type="area"
          item={item}
          onPress={() => goToVillaDetailScreen(item)}
          imageURL={imageURL}
          address={address.description}
          isLoadingFavorite={isLoadingAreaFavorite[index]}
          isFavorited={isFavorited}
          favoriteVillaHandler={() => areaFavoriteVillaHandler(item.name, index)}
        />
      );
    } else {
      return null;
    }
  };

  const renderRecommendedVillas = ({item, index}) => {
    if (index < 5) {
      const villaName = item.name.toLowerCase();
      const folderName = villaName.split(" ").join("_");
      const imageURL = `${SERVER_URL}/villas/${folderName}/banner.jpg`;
      const isFavorited = favoriteVilla.includes(item.name);

      return (
        <VillaCard 
          type="recommended"
          item={item}
          onPress={() => goToVillaDetailScreen(item)}
          imageURL={imageURL}
          isLoadingFavorite={isLoadingRecommendFavorite[index]}
          isFavorited={isFavorited}
          favoriteVillaHandler={() => recommendFavoriteVillaHandler(item.name, index)}
        />
      );
    } else {
      return null;
    }
  };



  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          translucent={false}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <HomeHeader
          selectedArea={selectedArea}
          onPressProfileImage={() => goToScreen('Profile')}
          onPressSelectArea={onSelectArea}
        />
        <TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 10,
            }}>
            <View style={styles.searchInputContainer}>
              <Icon name="search" size={20} color={Color.gray} />
              <TextInput
                value={searchVillaName}
                onChange={({nativeEvent}) => setSearchVillaName( nativeEvent.text )}
                autoCompleteType="off"
                autoCorrect={false}
                autoCapitalize='words'
                style={{paddingLeft: 10}}
                placeholder="Search villa name"
              />
            </View>
            <TouchableOpacity
              onPress={onMoreFilter}
              style={styles.moreFilterBtnWrapper}>
              <IconMaterial name="tune" style={styles.moreFilterIcon} />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        {/* FILTER BY AREA RESULT */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionTitleWrapper}>
            <Text style={styles.sectionTitle}>Best villas in {selectedArea}</Text>
            <Text style={styles.seeMoreText}>Show all</Text>
          </View>
          <FlatList
            style={{paddingVertical: 20, paddingLeft: 1}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={villasDataByArea}
            renderItem={renderSelectedAreaVillas}
            keyExtractor={item => item._id}
          />
        </View>
        {/* FILTER BY AREA RESULT */}

        {/* RECOMENDED VILLAS */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionTitleWrapper}>
            <Text style={styles.sectionTitle}>Recommended for you</Text>
            <Text style={styles.seeMoreText}>Show all</Text>
          </View>
          <FlatList
            style={{paddingVertical: 20, paddingLeft: 1}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={recomendedVillas}
            renderItem={renderRecommendedVillas}
            keyExtractor={item => item._id}
          />
        </View>
        {/* RECOMENDED VILLAS */}
      </ScrollView>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  sectionWrapper: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  sectionTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Color.black,
  },
  seeMoreText: {
    color: Color.grayText,
    fontWeight: '500',
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: Color.light,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  moreFilterBtnWrapper: {
    height: 50,
    width: 50,
    backgroundColor: Color.black,
    borderRadius: 10,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreFilterIcon: {
    color: Color.white,
    fontSize: 25,
  }
});

export default HomeScreen;
