import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Intro from '_screens/Intro';
import * as React from 'react';
import LogInScreen from '_screens/logIn';
import SignUpScreen from '_screens/signUp';
import Header from '_molecules/headers/mainHeader';
import HomeScreen from '_screens/home';

const Stack = createStackNavigator();

//in bigger apps i would have made it more organised
//but didnt cuz its a one day project no needed complexity

export const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LogInScreen"
        component={LogInScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{
          header: (props) => (
            <Header
              onBack={() => props.navigation.goBack()}
              header={'Sign Up'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
