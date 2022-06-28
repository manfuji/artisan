import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useTailwind } from 'tailwind-rn';
import Logo from '../assets/logo.jpg';
import { RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useStateValue } from '../context/StateContext';
import Toast from 'react-native-simple-toast';

const Register = () => {
  const tw = useTailwind();
  const navigator = useNavigation();
  const [username, setUsername] = useState(''),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [confirmPassword, setConfirmPassword] = useState(''),
    [privacy, setPrivacy] = useState(false),
    [loading, setLoading] = useState(false);

  const [{ user }, dispatch] = useStateValue();
  const handleSubmit = () => {
    const body = {
      username,
      email,
      password,
    };
    if (!username || !email || !password) {
      Toast.show(Toast.TOP, Toast.LONG, 'All the fields are required');
    } else if (password !== confirmPassword) {
      Toast.show(Toast.TOP, Toast.LONG, 'Please your password do not match');
    } else if (password.length < 6) {
      Toast.show(
        Toast.TOP,
        Toast.LONG,
        'Please your password must be more than 6 secret'
      );
    } else if (!privacy) {
      Toast.show(
        Toast.TOP,
        Toast.LONG,
        'Please agree to the terms and conditions  '
      );
    } else {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      setLoading(true);

      const url = 'https://artisanshub.pythonanywhere.com/api/auth/register';
      console.log(username, password, email);
      axios
        .post(url, body)
        .then((res) => {
          setLoading(false);

          console.log(user);
          console.log(res.data);
          navigator.navigate('Login');
        })
        .catch((err) => {
          setLoading(false);

          Toast.show(err.message);
          console.log(err);
        });
    }
  };

  return (
    <SafeAreaView
      style={tw('flex items-center w-full h-full justify-center bg-white ')}
    >
      <View style={tw('w-full h-10 bg-gray-100')} />
      <ScrollView style={tw('w-[90%] ')}>
        <View style={tw(' flex items-center justify-center mb-12 mt-2')}>
          <Image source={Logo} style={tw('h-44 w-44 rounded-full')} />
          <Text style={tw('text-red-800 text-4xl font-bold mb-4')}>
            Register
          </Text>
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
              Email:
            </Text>
            <TextInput
              style={tw(
                'py-2 w-full px-4 bg-gray-100 rounded-xl border border-gray-200'
              )}
              placeholder="Email "
              value={email}
              onChangeText={(text) => setEmail(text)}
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
              secureTextEntry
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <View style={tw('w-full flex')}>
            <Text style={tw('text-2xl font-semibold my-1 text-gray-700')}>
              Confirm Password:
            </Text>
            <TextInput
              style={tw(
                'py-2 w-full border bg-gray-100 rounded-xl text-gray-600 px-4 border-gray-200'
              )}
              placeholder="Confirm Password "
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
            />
          </View>
          <View style={tw('w-full flex mt-2 flex flex-row')}>
            <RadioButton
              color="red"
              uncheckedColor="blue"
              onPress={() => setPrivacy(true)}
            />
            <Text style={tw('text-base ')}>
              I accept the <Text style={tw('text-red-800')}> terms</Text> and{' '}
              <Text style={tw('text-red-800')}> conditions</Text> of use of this
              service
            </Text>
          </View>
          <View style={tw('w-full')}>
            {loading ? (
              <ActivityIndicator size="large" color="#570606" />
            ) : (
              <TouchableOpacity
                style={tw('bg-[#570606] mt-6 rounded-xl')}
                onPress={() => handleSubmit()}
              >
                <Text
                  style={tw('text-white text-center font-bold text-2xl py-2 ')}
                >
                  Register
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={tw('w-full flex mt-2')}>
            <Text style={tw('text-xl ')}>
              Dont have An Account ??
              <Text
                style={tw('text-red-800')}
                onPress={() => navigator.navigate('Login')}
              >
                {' '}
                Login
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
