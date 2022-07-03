import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useStateValue } from './context/StateContext';
import DetailPage from './screens/DetailPage';
import HomePage from './screens/HomePage';
import Login from './screens/Login';
import Profile from './screens/Profile';
import Recent from './screens/Recent';
import Register from './screens/Register';
import Search from './screens/Search';
import CardDetail from './screens/CardDetail';
import FeaturedData from './screens/Featured';

const StackNavigator = () => {
  const [{ user }, dispatch] = useStateValue();
  const stack = createNativeStackNavigator();
  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="Home" component={HomePage} />
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="Register" component={Register} />
      <stack.Screen name="DetailPage" component={DetailPage} />
      {/* authenticaed routers  */}
      <stack.Screen name="user" component={Profile} />
      <stack.Screen name="search" component={Search} />
      <stack.Screen name="recent" component={Recent} />
      <stack.Screen name="customerDetail" component={CardDetail} />
      <stack.Screen name="featured" component={FeaturedData} />
    </stack.Navigator>
  );
};

export default StackNavigator;
