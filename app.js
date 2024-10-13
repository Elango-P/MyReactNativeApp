import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View, Text, StyleSheet} from 'react-native';
import LoginScreen from './src/views/LoginScreenjs/index.js';
import ForgotPasswordScreen from './src/views/ForgetPassword/ForgotPassword.js';
import ResetPasswordScreen from './src/views/ForgetPassword/ResetPassword.js';
import HomeScreen from './src/views/Home/HomeScreen.js';
import Purchase from './src/views/Purchase/index.js';


const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown: false}}  />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{headerShown: false}} 
          />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}  options={{headerShown: false}} />
          <Stack.Screen name="Purchase" component={Purchase} />


        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};



export default App;
