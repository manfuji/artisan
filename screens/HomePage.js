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
    [loading, setLoading] = useState(true),
    [loadData, setLoadData] = useState(false),
    [userCompany, setUserCompany] = useState([]);
  const baseUrl = 'https://artisanshub.pythonanywhere.com';
  useEffect(() => {
    loadDataFromServer();
  }, []);
  const loadDataFromServer = () => {
    // setLoading(true);
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
      .get('https://artisanshub.pythonanywhere.com/api/companies')
      .then((res) => {
        setLoading(false);
        setLoadData(false);
        setUserCompany(res.data);
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
  };
  const featuredData = userCompany.filter((data) => data.is_featured === true);
  const navigator = useNavigation();
  const tw = useTailwind();
  console.log(featuredData);

  return (
    <SafeAreaView style={tw('w-full h-full flex pt-6')}>
      <ScrollView
        style={tw('w-full h-full ')}
        refreshControl={
          <RefreshControl
            refreshing={loadData}
            onRefresh={loadDataFromServer}
          />
        }
      >
        <View style={tw('flex w-full h-[150px] flex-row justify-between')}>
          <Image
            style={tw(
              'w-1/2 h-[150px] rounded-lg flex justify-center items-center'
            )}
            source={HeroImage}
          />
          <View
            style={tw(
              'w-1/2 h-full flex flex-col justify-center bg-white items-center'
            )}
          >
            <Text style={tw('text-red-800 flex text-2xl text-center')}>
              Welcome To ArtisansHub
            </Text>
            <Text style={tw('font-normal text-center text-sm text-red-600')}>
              Precition Quality Trained
            </Text>
          </View>
        </View>

        <View style={tw('mx-3')}>
          <Text style={tw('mt-6 text-2xl font-semibold mx-3')}>Service</Text>
          {/* displaying card for the categories */}
          {loading ? (
            <View style={tw(' mt-4')}>
              <ActivityIndicator size="large" color="#570606" />
              {/* <Progress.CircleSnail color={['red', 'green', 'blue']} /> */}
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
                    <Text style={tw(' text-justify text-sm mt-1 px-1 w-24 ')}>
                      {cat.title}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={tw('mx-5 mt-3')}>
          <Text style={tw('mb-2 text-xl font-semibold ')}>Featured Shops</Text>
          <ScrollView horizontal={true}>
            <View style={tw('w-full flex flex-row overflow-scroll ')}>
              {featuredData.map((data) => (
                <TouchableOpacity
                  key={data.id}
                  style={tw('border w-28 border-gray-200 ml-1 rounded-xl')}
                  onPress={() =>
                    navigator.navigate('featured', { details: data })
                  }
                >
                  <Image
                    style={tw('w-28 h-16 m-1 rounded-md')}
                    source={{ uri: baseUrl + data.image }}
                    resizeMode="cover"
                  />

                  <View style={tw('mx-2 ')}>
                    <Text style={tw('text-sm font-semibold')}>
                      {data.name.substr(0, 14)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

export default HomePage;
