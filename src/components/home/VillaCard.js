import React from 'react';
import {AirbnbRating} from 'react-native-ratings';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Color, BedIcon, PeopleIcon, HeartWhiteIcon, HeartColorIcon, LoadingGifCircle, AddressIcon} from '../../constants';

const VillaCard = ({ 
  type,
  item,
  onPress, 
  imageURL,
  address,
  isFavorited,
  isLoadingFavorite,
  favoriteVillaHandler,
}) => {
  let roomInfoSection = null;

  if(type !== 'area') {
    roomInfoSection = (
      <View style={{...styles.bedRoomWrapper, marginBottom: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.areaBox}>
            <AddressIcon height={15} width={15} fill={Color.red} />
            <Text style={{marginLeft: 6}}>{item.area}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 20}}>
            <BedIcon height={18} width={18} fill={Color.black} />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 12,
                fontWeight: '400',
              }}>
              {item.bedroom}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <PeopleIcon height={18} width={18} fill={Color.black} />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 12,
                fontWeight: '400',
              }}
              >
                {item.minCapacity} - {item.maxCapacity}
            </Text>
          </View>
        </View>
      </View>
    );
  } else {
    roomInfoSection = (
      <View style={styles.bedRoomWrapper}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BedIcon height={18} width={18} fill={Color.black} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 12,
              fontWeight: '400',
            }}>
            {item.bedroom} bedrooms
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
          <PeopleIcon height={18} width={18} fill={Color.black} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 12,
              fontWeight: '400',
            }}
            >
              {item.minCapacity} - {item.maxCapacity} persons
          </Text>
        </View>
      </View>
    );
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.card}>
      <Image source={{uri: imageURL}} style={styles.villaBannerImage} />
      <View style={styles.cardBody}>
        <View style={styles.flexRowBetween}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>{item.name}</Text>
          <TouchableOpacity onPress={favoriteVillaHandler}>
            { isLoadingFavorite ?
                <Image source={LoadingGifCircle} style={styles.loading} />
              : isFavorited ?
                <HeartColorIcon width={20} height={20} fill={Color.black} />
              : <HeartWhiteIcon width={20} height={20} fill={Color.black} />
            }
          </TouchableOpacity>
        </View>
        { type !== 'area' ? 
          <Text
            numberOfLines={3}
            style={{
              fontSize: 12,
              marginVertical: 8,
              color: Color.grayText,
            }}>
            {item.location}
          </Text>
          : <Text
            numberOfLines={2}
            style={{
              fontSize: 12,
              marginVertical: 8,
              color: Color.grayText,
            }}>
            {address}
          </Text>
        }
        { roomInfoSection }
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <AirbnbRating
            count={5}
            showRating={false}
            size={15}
            defaultRating={item.rating}
            fractions={1}
            isDisabled
          />
          <View style={styles.ratingTextWrapper}>
            <Text style={styles.ratingText}>{item.rating} ratings</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  loading: {
    height: 20,
    width: 20
  },
  card: {
    maxWidth: 300,
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
  areaBox: {
    flexDirection: 'row',
    backgroundColor: Color.semiLight,
    paddingRight: 12,
    paddingLeft: 10,
    paddingVertical: 6,
    borderRadius: 5,
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

export default VillaCard;
