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
  Pressable,
} from 'react-native';
import { funct } from '../constants/functions';
import Icon from 'react-native-vector-icons/Feather';
import {Color} from '../constants';
import HomeHeader from '../components/home/Header';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import VillaCard from '../components/home/VillaCard';
import CustomModal from '../components/common/CustomModal';
import GestureRecognizer from 'react-native-swipe-gestures';

const areaOptions = [
  { value: 'Canggu', label: 'Canggu' },
  { value: 'Jimbaran', label: 'Jimbaran' },
  { value: 'Nusa Dua', label: 'Nusa Dua' },
  { value: 'Tabanan', label: 'Tabanan' },
  { value: 'Ubud', label: 'Ubud' }
];

const HomeScreen = () => {
  const [isLoadingRecommendFavorite, setIsLoadingRecommendFavorite] = useState([]);
  const [isLoadingAreaFavorite, setIsLoadingAreaFavorite] = useState([]);
  const [isOpenAreaModal, setisOpenAreaModal] = useState(false);
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

  const closeAreaModalHandler = () => {
    getVillas();
    setisOpenAreaModal(false);
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

  const renderAreaOptions = () => {
    const _View = areaOptions.map((item, idx) => (
      <TouchableOpacity 
        key={`options-${idx+1}`} 
        style={{
          ...styles.optionsContainer,
          borderColor: item.value === selectedArea ? Color.red : Color.gray,
          backgroundColor: item.value === selectedArea ? Color.red : Color.white
        }}
        onPress={() => setSelectedArea(item.value)}
      >
        <IconMaterial 
          name={item.value === selectedArea ? 'radio-button-checked' : 'radio-button-unchecked'} 
          style={{
            ...styles.radioButton,
            color: item.value === selectedArea ? Color.white : Color.gray
          }}  
        />
        <Text 
          style={{
            ...styles.optionLabel, 
            color: item.value === selectedArea ? Color.white : Color.black
          }}
        >{item.label}</Text>
      </TouchableOpacity>
    ));

    return _View;
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
          onPressSelectArea={() => setisOpenAreaModal(true)}
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

        {/* SELECT MODAL */}
        <GestureRecognizer
          onSwipeDown={closeAreaModalHandler}
        >
          <CustomModal 
            modalVisible={isOpenAreaModal}
            onCloseModal={closeAreaModalHandler}
            transparentBackground={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.header}>
                <View style={{width: "100%"}}>
                  <View style={styles.modalTopBarContainer}>
                    <View style={styles.modalTopBar}></View>
                  </View>
                  <View style={{justifyContent: 'space-between'}}>
                    <View style={{flexGrow: 2}}>
                      <Text style={styles.areaText}>Select area</Text>
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {renderAreaOptions()}
                      </ScrollView>
                    </View>
                    <View style={{flexGrow: 1}}>
                      <Pressable style={styles.findVillaButton}>
                        <Text>Find Villas</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </CustomModal>
        </GestureRecognizer>
        {/* SELECT MODAL */}
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
  },
  modalContainer: {
    height: '100%', 
    backgroundColor: Color.white, 
    borderRadius: 20,
    marginTop: 10,
    shadowColor: Color.gray,
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 1,
  },
  modalTopBarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25
  },
  modalTopBar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.grayText,
    height: 5,
    width: 50,
    borderRadius: 20
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  areaText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Color.black,
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 2,
    borderRadius: 8,
    elevation: 2,
    marginTop: 20
  },
  radioButton: {
    fontSize: 20
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10
  }
});

export default HomeScreen;
