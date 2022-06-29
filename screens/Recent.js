import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import HeroImage from '../assets/logo2.jpg';
import shop1 from '../assets/images/shop3.jpg';
import shop from '../assets/images/shop5.jpg';
import Card from './Card';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faLocationPin,
  faMagnifyingGlass,
  faMapLocation,
} from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';

const Recent = () => {
  const tw = useTailwind();
  return (
    <SafeAreaView style={tw('w-full h-full flex pt-6')}>
      <ScrollView style={tw('w-full h-full')}>
        <ImageBackground
          style={tw('w-full h-[200px] flex justify-center items-center')}
          source={HeroImage}
        >
          {/* <Text style={tw('text-white text-4xl')}>[Recent]</Text> */}
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
            />
          </View>
          <View style={tw('w-full')}>
            <TouchableOpacity
              style={tw('bg-[#570606] mt-6 rounded-xl')}
              onPress={() => navigator.navigate('Home')}
            >
              <Text
                style={tw('text-white text-center font-bold text-2xl py-2 ')}
              >
                Search
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={tw('mt-6 text-2xl font-semibold ')}>Recent Search</Text>
          <ScrollView horizontal={true}>
            <View style={tw('w-full flex flex-row overflow-scroll')}>
              <Card />
              <Card />
              <Card />
              <Card />
            </View>
          </ScrollView>
          <View style={tw('mx-3')}>
            <Text style={tw('mt-6 text-2xl font-semibold mx-3')}>
              Place Visited
            </Text>
            <View
              style={tw(
                'w-full flex flex-row flex-wrap justify-center items-center'
              )}
            >
              <View
                style={tw('')}
                onPress={() => navigator.navigate('DetailPage')}
              >
                <Image style={tw('w-24 h-24 m-1 rounded')} source={shop} />
                <Text style={tw('text-base')}>Mechanic</Text>
              </View>
              <View onPress={() => navigator.navigate('DetailPage')}>
                <Image style={tw('w-24 h-24 m-1 rounded')} source={shop1} />
                <Text style={tw('text-base')}>Fuel Station</Text>
              </View>
              <View
                style={tw('')}
                onPress={() => navigator.navigate('DetailPage')}
              >
                <Image style={tw('w-24 h-24 m-1 rounded')} source={shop} />
                <Text style={tw('text-base')}>Mechanic</Text>
              </View>
              <View
                style={tw('')}
                onPress={() => navigator.navigate('DetailPage')}
              >
                <Image style={tw('w-24 h-24 m-1 rounded')} source={HeroImage} />
                <Text style={tw('text-base')}>weaver</Text>
              </View>
              <View
                style={tw('')}
                onPress={() => navigator.navigate('DetailPage')}
              >
                <Image style={tw('w-24 h-24 m-1 rounded')} source={shop} />
                <Text style={tw('text-base')}>Mechanic</Text>
              </View>
              <View
                style={tw('')}
                onPress={() => navigator.navigate('DetailPage')}
              >
                <Image style={tw('w-24 h-24 m-1 rounded')} source={HeroImage} />
                <Text style={tw('text-base')}>weavers</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

export default Recent;
