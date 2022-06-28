import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import HeroImage from '../assets/logo2.jpg';
import shop1 from '../assets/images/shop3.jpg';
import shop from '../assets/images/shop5.jpg';
import { useNavigation } from '@react-navigation/native';
import NavBar from './NavBar';
import axios from 'axios';
import { useStateValue } from '../context/StateContext';
import { COMPANY } from '../context/Constants';
import Toast from 'react-native-simple-toast';
import * as Progress from 'react-native-progress';
const HomePage = () => {
  const [{ user, company }, dispatch] = useStateValue();
  const [category, setCategory] = useState([]),
    [loading, setLoading] = useState(false),
    [loadData, setLoadData] = useState(false);
  // [company, setCompany] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://artisanshub.pythonanywhere.com/api/categories/')
      .then((res) => {
        setLoading(false);

        setCategory(res.data);
      })
      .catch((err) => {
        setLoading(false);

        Toast.show(Toast.TOP, Toast.LONG, err);
      });

    // fetching companies
    axios
      .get('https://artisanshub.pythonanywhere.com/api/companies/')
      .then((res) => {
        setLoading(false);
        setLoadData(false);

        dispatch({
          type: COMPANY,
          companies: res.data,
        });
      })
      .catch((err) => {
        setLoading(false);
        setLoadData(false);

        Toast.show(Toast.TOP, Toast.LONG, 'Something went wrong');
      });
  }, [loadData]);
  // console.log(company);
  const navigator = useNavigation();
  const tw = useTailwind();
  return (
    <SafeAreaView style={tw('w-full h-full flex pt-6')}>
      <ScrollView
        style={tw('w-full h-full ')}
        refreshControl={
          <RefreshControl refreshing={loadData} onRefresh={loadData} />
        }
      >
        <View style={tw('flex w-full h-[200px] flex-row justify-between')}>
          <Image
            style={tw(
              'w-1/2 h-[200px] rounded-lg flex justify-center items-center'
            )}
            source={HeroImage}
          />
          <View
            style={tw(
              'w-1/2 h-full flex flex-col justify-center bg-white items-center'
            )}
          >
            <Text style={tw('text-red-800 flex text-2xl text-center   ')}>
              Welcome To ArtisanHub
            </Text>
            <Text style={tw('font-normal text-lg text-red-600')}>
              Precition Quality Trained and Service Providers
            </Text>
          </View>
        </View>

        <View style={tw('mx-5 hidden')}>
          <Text style={tw('mt-6 text-2xl font-semibold ')}>Recent</Text>
          <ScrollView horizontal={true}>
            <View style={tw('w-full flex flex-row overflow-scroll hidden')}>
              <TouchableOpacity
                style={tw('')}
                // onPress={() => navigator.navigate('DetailPage')}
              >
                <Image style={tw('w-64 h-32 m-1 rounded-md')} source={shop} />
                <Text style={tw('text-base')}>Mechanic</Text>
              </TouchableOpacity>
              <View
                style={tw('')}
                // onPress={() => navigator.navigate('DetailPage')}
              >
                <Image style={tw('w-64 h-32 m-1 rounded-md')} source={shop1} />
                <Text style={tw('text-base')}>Fuel Station</Text>
              </View>
              <View
                style={tw('')}
                // onPress={() => navigator.navigate('DetailPage')}
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
          {loading ? (
            <View style={tw(' mt-4')}>
              {/* <ActivityIndicator size="large" color="#570606" /> */}
              <Progress.CircleSnail color={['red', 'green', 'blue']} />
            </View>
          ) : (
            <View
              style={tw(
                'w-full flex flex-row flex-wrap justify-center items-center'
              )}
            >
              {category.map((cat) => (
                <View
                  style={tw('bg-gray-200 w-24 h-44 m-1.5 rounded text-justify')}
                  // onPress={() => navigator.navigate('DetailPage')}
                  key={cat.id}
                >
                  <TouchableOpacity
                    style={tw('')}
                    onPress={() =>
                      navigator.navigate('DetailPage', { catdetail: cat })
                    }
                  >
                    <Image
                      style={tw('w-24 h-24  rounded')}
                      source={{ uri: cat.image }}
                    />
                    <Text style={tw(' text-center text-base mt-1 w-24 ')}>
                      {cat.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

export default HomePage;
