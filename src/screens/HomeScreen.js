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
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {AirbnbRating} from 'react-native-ratings';
import {BedIcon, PeopleIcon, Color} from '../constants';
import HomeHeader from '../components/home/Header';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = () => {
  const [selectedArea, setSelectedArea] = useState('Canggu');
  const [villasData, setVillasData] = useState([]);

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
      setVillasData(data);
    } else {
      alert(response.message);
    }
    return response;
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

  const onMoreFilter = () => {
    console.log('Open more filter modal');
  };

  const renderSelectedAreaVillas = ({item, index}) => {
    if (item.area === selectedArea && index < 4) {
      const villaName = item.name.toLowerCase();
      const folderName = villaName.replace(' ', '_');
      const imageURL = `${SERVER_URL}/villas/${folderName}/banner.jpg`;
      const overview = item.overview.find(o => o.title === 'ADDRESS');
      return (
        <View style={styles.card}>
          <Image source={{uri: imageURL}} style={styles.villaBannerImage} />
          <View style={styles.cardBody}>
            <Text style={{fontSize: 18, fontWeight: '600'}}>{item.name}</Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 12, 
                marginTop: 5, 
                color: Color.grayText
              }}
            >
              {overview.description}
            </Text>
            <View style={styles.bedRoomWrapper}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <BedIcon height={18} width={18} fill={Color.black} />
                <Text 
                  style={{
                    marginLeft: 5, 
                    fontSize: 12, 
                    fontWeight: '400'
                  }}
                >
                  {item.bedroom} bedrooms
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <PeopleIcon height={18} width={18} fill={Color.black} />
                <Text 
                  style={{
                    marginLeft: 5, 
                    fontSize: 12, 
                    fontWeight: '400'
                  }}
                >
                  {item.minCapacity} - {item.maxCapacity} people
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
              <AirbnbRating 
                count={5}
                showRating={false}
                size={15}
                defaultRating={4.5}
                fractions={1}
                isDisabled
              />
              <View style={styles.ratingTextWrapper}>
                <Text style={styles.ratingText}>
                  {item.rating} ratings
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
      <View>
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
      </View>
      <View style={styles.sectionWrapper}>
        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>Best villas in {selectedArea}</Text>
          <Text style={styles.seeMoreText}>See more</Text>
        </View>
        <FlatList
          style={{paddingVertical: 20, paddingLeft: 1}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={villasData}
          renderItem={renderSelectedAreaVillas}
          keyExtractor={item => item._id}
        />
      </View>
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
  card: {
    maxWidth: 240,
    overflow: 'hidden',
    marginRight: 20,
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
  cardBody: {
    padding: 14,
  },
  cardFooter: {
    padding: 14,

  },
  villaBannerImage: {
    height: 130,
    width: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bedRoomWrapper: {
    marginTop: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingTextWrapper: {
    backgroundColor: Color.red,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  ratingText: {
    color: Color.white,
    fontWeight: 'bold'
  }
});

export default HomeScreen;
