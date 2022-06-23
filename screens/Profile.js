import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import cover from '../assets/images/cover3.jpg';
import { useTailwind } from 'tailwind-rn';
import profile from '../assets/images/cover.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import NavBar from './NavBar';
import { useStateValue } from '../context/StateContext';
import axios from 'axios';
import { PROFILE } from '../context/Constants';
import logo from '../assets/logo2.jpg';
import logo2 from '../assets/logo.jpg';

const Profile = () => {
  const tw = useTailwind();
  const [{ user, stateProfile }, dispatch] = useStateValue();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    axios
      .get(
        `https://artisanshub.pythonanywhere.com/api/profiles/${user.user.id}/`
      )
      .then((res) => {
        setUserProfile({ ...res.data });
        dispatch({
          type: PROFILE,
          profile: res.data,
        });
      })
      .catch((err) => {
        alert('Somehting Went Wrong');
      });
  }, []);
  console.log(stateProfile);
  return (
    <SafeAreaView style={tw('w-full h-full pt-6')}>
      <ScrollView>
        <View
          style={tw(
            'bg-gray-100 pt-6 w-full h-full flex justify-center items-center'
          )}
        >
          <View style={tw('w-[90%] flex items-center relative justify-center')}>
            <Image
              style={tw('w-[90%] h-56 m-1 rounded-md relative')}
              source={logo2}
            />
            <View
              style={tw(
                ' bg-[#570606] p-1.5 rounded-full absolute top-10 -mb-16'
              )}
            >
              <FontAwesomeIcon
                icon={faEdit}
                style={tw('text-white ')}
                size={26}
              />
            </View>
            <Image
              source={logo}
              style={tw('h-32 w-32 rounded-full -mt-12 relative')}
            />
            <View
              style={tw('-mt-14 mb-5 -mr-12 bg-[#570606] p-1.5 rounded-full')}
            >
              <FontAwesomeIcon
                icon={faEdit}
                style={tw('text-white ')}
                size={20}
              />
            </View>
          </View>

          <View style={tw('px-4 w-[90%]')}>
            <View style={tw('w-full flex flex-row justify-between')}>
              <Text style={tw('text-xl font-bold text-[#570606]')}>
                {user?.user.username}
              </Text>
              <Text style={tw('text-xl font-bold text-[#570606]')}>
                Customer
              </Text>
            </View>
            <Text style={tw('text-gray-400 font-semibold')}>
              @{user.user.email}
            </Text>
            <Text style={tw('text-lg')}>{stateProfile?.description}</Text>
          </View>
          <View style={tw('w-[90%] flex mt-4 justify-center items-center')}>
            <TouchableOpacity
              style={tw(
                'bg-[#570606] w-full mt-5 text-center  py-3 px-4 text-white rounded-xl m-2'
              )}
            >
              <Text style={tw('text-white text-lg text-center w-full')}>
                Update Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <NavBar />
    </SafeAreaView>
  );
};

export default Profile;
