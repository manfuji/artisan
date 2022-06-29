import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTailwind } from 'tailwind-rn/dist';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faUserCircle,
  faTimeline,
  faHome,
  faSearchPlus,
  faSignIn,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../context/StateContext';

const NavBar = () => {
  const navigator = useNavigation();
  const tw = useTailwind();
  const [{ user }, dispatch] = useStateValue();
  return (
    <SafeAreaView style={tw('w-full  bg-gray-200')}>
      <View
        style={tw(
          'py-4 px-5 flex flex-row justify-between items-center text-[#570606]'
        )}
      >
        <TouchableOpacity
          style={tw('')}
          onPress={() => navigator.navigate('Home')}
        >
          <FontAwesomeIcon
            icon={faHome}
            size={20}
            style={tw('text-[#570606]')}
          />
        </TouchableOpacity>
        {user ? (
          <>
            <TouchableOpacity
              style={tw('')}
              // onPress={() => navigator.navigate('user')}
              onPress={() => navigator.navigate('user')}
            >
              <FontAwesomeIcon
                icon={faUserCircle}
                size={20}
                style={tw('text-[#570606]')}
              />
            </TouchableOpacity>
            {/* <View style={tw('')}></View> */}
          </>
        ) : (
          <TouchableOpacity
            style={tw('')}
            // onPress={() => navigator.navigate('user')}
            onPress={() => navigator.navigate('Login')}
          >
            <FontAwesomeIcon
              icon={faSignIn}
              size={20}
              style={tw('text-[#570606]')}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={tw('')}
          onPress={() => navigator.navigate('recent')}
        >
          <FontAwesomeIcon
            icon={faTimeline}
            size={20}
            style={tw('text-[#570606]')}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={tw('')}
          // onPress={() => navigator.navigate('Home')}
          onPress={() => navigator.navigate('search')}
        >
          <FontAwesomeIcon
            icon={faSearchPlus}
            size={20}
            style={tw('text-[#570606]')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavBar;
