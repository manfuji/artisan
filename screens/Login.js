import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import Logo from '../assets/logo.jpg';
import { useNavigation } from '@react-navigation/native';
import { useStateValue } from '../context/StateContext';
import { AUTH } from '../context/Constants';
import axios from 'axios';
const Login = () => {
  const [{ user }, dispatch] = useStateValue();
  const tw = useTailwind();
  const navigator = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (!username || !password) {
      alert('Please enter your details');
    } else {
      const body = {
        username,
        password,
      };
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const url = 'https://artisanshub.pythonanywhere.com/api/auth/login';
      console.log(username, password);
      axios
        .post(url, body)
        .then((res) => {
          dispatch({
            type: AUTH,
            user: res.data,
          });
          console.log(res.data);
          console.log(user);
          navigator.navigate('Home');
        })
        .catch((err) => {
          alert('Invalid Credentials');
        });
    }
  };
  return (
    <SafeAreaView
      style={tw(
        'flex items-center w-full h-full justify-center bg-white mt-6 '
      )}
    >
      {/* <View style={tw('w-full h-10 bg-gray-100')} /> */}
      {/* <ScrollView></ScrollView> */}
      <View style={tw('w-[90%] flex items-center justify-center -mt-16')}>
        <Image source={Logo} style={tw('h-44 w-44 rounded-full')} />
        <Text style={tw('text-red-800 text-4xl font-bold mb-4')}>Login</Text>
        <View style={tw('w-full flex')}>
          <Text style={tw('text-2xl font-semibold my-1 text-gray-700')}>
            Username:
          </Text>
          <TextInput
            style={tw(
              'py-2 w-full px-4 bg-gray-100 rounded-xl border border-gray-200'
            )}
            placeholder="Username "
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={tw('w-full flex')}>
          <Text style={tw('text-2xl font-semibold my-1 text-gray-700')}>
            Password:
          </Text>
          <TextInput
            style={tw(
              'py-2 w-full border bg-gray-100 rounded-xl text-gray-600 px-4 border-gray-200'
            )}
            placeholder="Password "
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <View style={tw('w-full')}>
          <TouchableOpacity
            style={tw('bg-[#570606] mt-6 rounded-xl')}
            onPress={() => {
              handleSubmit();
            }}
          >
            <Text style={tw('text-white text-center font-bold text-2xl py-2 ')}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw('w-full flex mt-2')}>
          <Text style={tw('text-xl ')}>
            Dont have An Account ??
            <Text
              style={tw('text-red-800')}
              onPress={() => navigator.navigate('Register')}
            >
              {' '}
              Register
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
