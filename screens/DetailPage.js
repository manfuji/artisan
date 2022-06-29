import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
// import HeroImage from '../assets/images/shop1.jpg';
// import shop1 from '../assets/images/shop3.jpg';
// import shop from '../assets/images/shop5.jpg';
// import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faBackward,
  faChevronDown,
  faLocationPin,
  faMagnifyingGlass,
  faMapLocation,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
// import {} from "@fortawesome/free-regular-svg-icons"

import NavBar from './NavBar';
// import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../context/StateContext';
import { AirbnbRating } from 'react-native-ratings';
import SelectDropdown from 'react-native-select-dropdown';

const DetailPage = () => {
  //towns decalrations
  const towns = [
    'Ho',
    'Hohoe',
    'Dambai',
    'Akatsi',
    'Accra',
    'Sogakofe',
    'Anloga',
  ];
  const navigation = useNavigation();
  const [{ company }, dispatch] = useStateValue();

  // useEffect(() => {
  const stateData = navigation.getState().routes[1];
  const [location, setLocation] = useState('');
  // }, []);
  // picking id from the pass data
  console.log(stateData.params.catdetail);
  const data = stateData.params.catdetail;
  const id = stateData.params.catdetail.id;
  const getDataFromState = company.filter((data) => data.category.id === id);
  // console.log('data', getDataFromState);

  const baseUrl = 'https://artisanshub.pythonanywhere.com';

  // implemeting search
  const [search, setSearch] = useState('');

  const searchData = getDataFromState.filter((data) =>
    data.name.toLowerCase().includes(search.toLowerCase())
  );
  const locationData = getDataFromState.filter((data) =>
    data?.location.toLowerCase().includes(location.toLowerCase())
  );

  // console.log('data', location);
  const tw = useTailwind();
  // const rating = (rate) => {
  //   const displayRate = [];
  // return()
  //   for (let index = 1; index <= rate; index++) {
  //     displayRate.push(
  //       <FontAwesomeIcon
  //         // key={index}
  //         style={tw(' flex flex-row text-[#570606] m-1')}
  //         icon={faStar}
  //         key={index}
  //       />
  //     );
  //   }
  //   return displayRate;
  // };

  // const UnRated = (rateNo) => {
  //   const unRated = [];
  //   // return()
  //   for (let index = 1; index <= rateNo; index++) {
  //     unRated.push(
  //       <FontAwesomeIcon
  //         style={tw(' flex flex-row text-green-600 m-1 opacity-80')}
  //         icon={faStar}
  //         key={index}
  //       />
  //     );
  //   }
  //   return unRated;
  // };
  return (
    <SafeAreaView style={tw('w-full h-full flex pt-6')}>
      <ScrollView style={tw('w-full h-full')}>
        <ImageBackground
          style={tw('w-full h-[200px] rounded-lg flex ')}
          source={{ uri: data.image }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw('  m-1 bg-[#570606]  p-3 rounded-full w-10 h-10 ')}
          >
            <FontAwesomeIcon icon={faBackward} style={tw('text-white')} />
          </TouchableOpacity>
          <Text
            style={tw(
              'text-white justify-center items-center text-4xl bg-gray-800 bg-opacity-50 p-5'
            )}
          >
            [{data.title}]
          </Text>
        </ImageBackground>

        <View style={tw('mx-3 my-8')}>
          <View
            style={tw(
              'w-full flex flex-row justify-between items-center mt-4  border bg-gray-200 rounded-xl text-gray-600 px-4 border-gray-200'
            )}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <TextInput
              style={tw(
                'py-2 w-full border bg-gray-200 rounded-xl text-gray-600 px-4 border-gray-200'
              )}
              placeholder="using your current Location"
              onChangeText={(text) => setSearch(text)}
            />
            {/* <FontAwesomeIcon
              size={12}
              icon={faLocationPin}
              style={tw(
                'flex flex-row -ml-6 text-[#570606] py-6 px-2 rounded-r-xl'
              )}
            /> */}
          </View>
          <View style={tw('w-full justify-center items-center mt-2')}>
            <View
              style={tw('flex flex-row justify-center items-center font-bold ')}
            >
              <Text style={tw('text-xl ')}>Available In</Text>
              <SelectDropdown
                data={towns}
                onSelect={(selectedItem, index) => {
                  setLocation(selectedItem);
                  // console.log(selectedItem, index);
                }}
                defaultButtonText={<Text style={tw('')}>Pick Location</Text>}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item;
                }}
                buttonTextStyle={tw(
                  'p-2 rounded bg-gray-200 text-lg text-gray-800'
                )}
                dropdownStyle={tw(
                  'justify-center bg-gray-200 rounded-lg text-gray-800'
                )}
              />
              <FontAwesomeIcon
                style={tw('-ml-8 text-gray-600 mt-1')}
                icon={faChevronDown}
                size={10}
              />
            </View>
          </View>
          <Text style={tw('mt-6 text-2xl font-semibold mr-4')}>
            Nearest To You{' '}
            <FontAwesomeIcon
              size={12}
              icon={faMapLocation}
              style={tw('flex  text-[#570606] ml-4')}
            />
          </Text>
          <ScrollView horizontal={true}>
            <View style={tw('w-full flex flex-row overflow-scroll')}>
              {/* <Card company={getDataFromState} /> */}
              {searchData.length < 1 ? (
                <Text style={tw('mt-6 font-bold text-3xl')}>
                  No Results....
                </Text>
              ) : search.length > 0 ? (
                searchData.map((data) => (
                  <TouchableOpacity
                    key={data.id}
                    style={tw('border border-gray-200 ml-1 rounded-xl')}
                    onPress={() =>
                      navigation.navigate('customerDetail', { details: data })
                    }
                  >
                    <Image
                      style={tw('w-64 h-32 m-1 rounded-md')}
                      source={{ uri: baseUrl + data.image }}
                      resizeMode="cover"
                    />

                    <View style={tw('mx-2 ')}>
                      <Text style={tw('text-lg font-semibold')}>
                        {data.name.substr(0, 20)}
                      </Text>
                      <Text style={tw('text-gray-400 font-semibold')}>
                        @{data.Owner.user.username}
                      </Text>
                      <Text style={tw('text-lg')}>
                        {data.description.substr(0, 20)}...
                      </Text>
                      <View style={tw('flex flex-row text-[#570606]')}>
                        {/* <FontAwesomeIcon style={tw('')} icon={faStar} /> */}
                        {/* {rating(data.rating)}
                        {UnRated(5 - data.rating)} */}
                        <AirbnbRating
                          count={5}
                          // reviews={[
                          //   'Terrible',
                          //   'Bad',
                          //   'OK',
                          //   'Good',
                          //   'Very Good',
                          //   'Amazing',
                          // ]}
                          showRating={false}
                          defaultRating={data.rating}
                          // onFinishRating={ratingCompleted}
                          size={20}
                          isDisabled
                        />
                        <Text style={tw('ml-2 mt-1')}>({data.rating})</Text>
                      </View>
                      <View
                        style={tw('w-full flex justify-center items-center')}
                      >
                        <TouchableOpacity
                          style={tw(
                            'bg-[#570606] w-32 text-center  py-3 px-4 text-white rounded-xl m-2'
                          )}
                          onPress={() => Linking.openURL(`tel:${data.phone}`)}
                        >
                          <Text
                            style={tw('text-white text-lg text-center w-full')}
                          >
                            Call Now
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                locationData.map((data) => (
                  <TouchableOpacity
                    key={data.id}
                    style={tw('border border-gray-200 ml-1 rounded-xl')}
                    onPress={() =>
                      navigation.navigate('customerDetail', { details: data })
                    }
                  >
                    <Image
                      style={tw('w-64 h-32 m-1 rounded-md')}
                      source={{ uri: baseUrl + data.image }}
                      resizeMode="cover"
                    />

                    <View style={tw('mx-2 ')}>
                      <Text style={tw('text-lg font-semibold')}>
                        {data.name.substr(0, 20)}
                      </Text>
                      <Text style={tw('text-gray-400 font-semibold')}>
                        @{data.Owner.user.username}
                      </Text>
                      <Text style={tw('text-lg')}>
                        {data.description.substr(0, 20)}...
                      </Text>
                      <View style={tw('flex flex-row text-[#570606]')}>
                        {/* <FontAwesomeIcon style={tw('')} icon={faStar} /> */}
                        {/* {rating(data.rating)}
                        {UnRated(5 - data.rating)} */}
                        <AirbnbRating
                          count={5}
                          // reviews={[
                          //   'Terrible',
                          //   'Bad',
                          //   'OK',
                          //   'Good',
                          //   'Very Good',
                          //   'Amazing',
                          // ]}
                          showRating={false}
                          defaultRating={data.rating}
                          // onFinishRating={ratingCompleted}
                          size={20}
                          isDisabled
                        />
                        <Text style={tw('ml-2 mt-1')}>({data.rating})</Text>
                      </View>
                      <View
                        style={tw('w-full flex justify-center items-center')}
                      >
                        <TouchableOpacity
                          style={tw(
                            'bg-[#570606] w-32 text-center  py-3 px-4 text-white rounded-xl m-2'
                          )}
                          onPress={() => Linking.openURL(`tel:${data.phone}`)}
                        >
                          <Text
                            style={tw('text-white text-lg text-center w-full')}
                          >
                            Call Now
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              )}
            </View>
          </ScrollView>
          <Text style={tw('mt-6 text-2xl font-semibold ')}>Recommended</Text>
          <ScrollView horizontal={true}>
            <View style={tw('w-full flex flex-row overflow-scroll')}>
              {searchData.length < 1 ? (
                <Text style={tw('mt-6 font-bold text-3xl')}>
                  No Results....
                </Text>
              ) : search.length > 0 ? (
                searchData.map(
                  (data) =>
                    data.rating >= 4 && (
                      <View
                        key={data.id}
                        style={tw('border border-gray-200 ml-1 rounded-xl')}
                      >
                        <Image
                          style={tw('w-64 h-32 m-1 rounded-md')}
                          source={{ uri: baseUrl + data.image }}
                          resizeMode="cover"
                        />

                        <View style={tw('mx-2 ')}>
                          <Text style={tw('text-lg font-semibold')}>
                            {data.name.substr(0, 20)}
                          </Text>
                          <Text style={tw('text-gray-400 font-semibold')}>
                            @{data.Owner.user.username}
                          </Text>
                          <Text style={tw('text-lg')}>
                            {' '}
                            {data.description.substr(0, 20)}...
                          </Text>
                          <View style={tw('flex flex-row text-[#570606]')}>
                            {/* <FontAwesomeIcon style={tw('')} icon={faStar} /> */}
                            {/* {rating(data.rating)}
                            {UnRated(5 - data.rating)} */}
                            <AirbnbRating
                              count={5}
                              showRating={false}
                              // reviews={[
                              //   'Terrible',
                              //   'Bad',
                              //   'OK',
                              //   'Good',
                              //   'Very Good',
                              //   'Amazing',
                              // ]}
                              defaultRating={data.rating}
                              // onFinishRating={ratingCompleted}
                              size={20}
                              isDisabled
                            />
                            <Text style={tw('ml-2 mt-1')}>({data.rating})</Text>
                          </View>
                          <View
                            style={tw(
                              'w-full flex justify-center items-center'
                            )}
                          >
                            <TouchableOpacity
                              style={tw(
                                'bg-[#570606] w-32 text-center  py-3 px-4 text-white rounded-xl m-2'
                              )}
                              onPress={() =>
                                Linking.openURL(`tel:${data.phone}`)
                              }
                            >
                              <Text
                                style={tw(
                                  'text-white text-lg text-center w-full'
                                )}
                              >
                                Call Now
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )
                )
              ) : (
                getDataFromState.map(
                  (data) =>
                    data.rating >= 4 &&
                    data.location
                      .toLowerCase()
                      .includes(location.toLowerCase()) && (
                      <View
                        key={data.id}
                        style={tw('border border-gray-200 ml-1 rounded-xl')}
                      >
                        <Image
                          style={tw('w-64 h-32 m-1 rounded-md')}
                          source={{ uri: baseUrl + data.image }}
                          resizeMode="cover"
                        />

                        <View style={tw('mx-2 ')}>
                          <Text style={tw('text-lg font-semibold')}>
                            {data.name.substr(0, 20)}
                          </Text>
                          <Text style={tw('text-gray-400 font-semibold')}>
                            @{data.Owner.user.username}
                          </Text>
                          <Text style={tw('text-lg')}>
                            {' '}
                            {data.description.substr(0, 20)}...
                          </Text>
                          <View style={tw('flex flex-row text-[#570606]')}>
                            {/* <FontAwesomeIcon style={tw('')} icon={faStar} /> */}
                            {/* {rating(data.rating)}
                            {UnRated(5 - data.rating)} */}
                            <AirbnbRating
                              count={5}
                              // reviews={[
                              //   'Terrible',
                              //   'Bad',
                              //   'OK',
                              //   'Good',
                              //   'Very Good',
                              //   'Amazing',
                              // ]}
                              showRating={false}
                              defaultRating={data.rating}
                              // onFinishRating={ratingCompleted}
                              size={20}
                              isDisabled
                            />
                            <Text style={tw('ml-2 mt-1')}>({data.rating})</Text>
                          </View>
                          <View
                            style={tw(
                              'w-full flex justify-center items-center'
                            )}
                          >
                            <TouchableOpacity
                              style={tw(
                                'bg-[#570606] w-32 text-center  py-3 px-4 text-white rounded-xl m-2'
                              )}
                              onPress={() =>
                                Linking.openURL(`tel:${data.phone}`)
                              }
                            >
                              <Text
                                style={tw(
                                  'text-white text-lg text-center w-full'
                                )}
                              >
                                Call Now
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )
                )
              )}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

export default DetailPage;
