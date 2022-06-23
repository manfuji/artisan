import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import HeroImage from '../assets/images/shop1.jpg';
import shop1 from '../assets/images/shop3.jpg';
import shop from '../assets/images/shop5.jpg';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';
import axios from 'axios';
import { useStateValue } from '../context/StateContext';
import { COMPANY } from '../context/Constants';

const HomePage = () => {
  const [{ user, company }, dispatch] = useStateValue();
  const [category, setCategory] = useState([]);
  // [company, setCompany] = useState([]);
  useEffect(() => {
    axios
      .get('https://artisanshub.pythonanywhere.com/api/categories/')
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        alert(err);
      });

    // fetching companies
    axios
      .get('https://artisanshub.pythonanywhere.com/api/companies/')
      .then((res) => {
        dispatch({
          type: COMPANY,
          companies: res.data,
        });
      })
      .catch((err) => {
        alert('Something went wrong');
      });
  }, []);
  console.log(company);
  const navigator = useNavigation();
  const tw = useTailwind();
  return (
    <SafeAreaView style={tw('w-full h-full flex pt-6')}>
      <ScrollView style={tw('w-full h-full ')}>
        <Image
          style={tw(
            'w-full h-[200px] relative flex justify-center items-center'
          )}
          source={HeroImage}
        />
        <View
          style={tw(
            'absolute flex w-full h-1/2 mx-auto justify-center items-center '
          )}
        >
          <Text
            style={tw(
              'text-white font-extrabold text-2xl text-white flex h-1/2 justify-center items-center'
            )}
          >
            Welcome to the Artisan Party
          </Text>
        </View>
        <View style={tw('mx-3')}>
          <Text style={tw('mt-6 text-2xl font-semibold ')}>Recent</Text>
          <ScrollView horizontal={true}>
            <View style={tw('w-full flex flex-row overflow-scroll')}>
              <TouchableOpacity
                style={tw('')}
                onPress={() => navigator.navigate('DetailPage')}
              >
                <Image style={tw('w-64 h-32 m-1 rounded-md')} source={shop} />
                <Text style={tw('text-base')}>Mechanic</Text>
              </TouchableOpacity>
              <View
                style={tw('')}
                onPress={() => navigator.navigate('DetailPage')}
              >
                <Image style={tw('w-64 h-32 m-1 rounded-md')} source={shop1} />
                <Text style={tw('text-base')}>Fuel Station</Text>
              </View>
              <View
                style={tw('')}
                onPress={() => navigator.navigate('DetailPage')}
              >
                <Image style={tw('w-64 h-32 m-1 rounded-md')} source={shop} />
                <Text style={tw('text-base')}>Mechanic</Text>
              </View>
              <View style={tw('m-1')}>
                <Image style={tw('w-64 h-32  rounded-md')} source={HeroImage} />
                <Text style={tw('text-base')}>Weaver</Text>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={tw('mx-3')}>
          <Text style={tw('mt-6 text-2xl font-semibold mx-3')}>Service</Text>
          {/* displaying card for the categories */}
          <View
            style={tw(
              'w-full flex flex-row flex-wrap justify-center items-center'
            )}
          >
            {category.map((cat) => (
              <View
                style={tw('')}
                onPress={() => navigator.navigate('DetailPage')}
                key={cat.id}
              >
                <TouchableOpacity
                  style={tw('')}
                  onPress={() =>
                    navigator.navigate('DetailPage', { catdetail: cat })
                  }
                >
                  <Image
                    style={tw('w-24 h-24 m-1 rounded')}
                    source={{ uri: cat.image }}
                  />
                  <Text style={tw('text-base text-center ')}>
                    {cat.length < 9 ? cat : cat.title.substr(0, 12)}..
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

export default HomePage;
