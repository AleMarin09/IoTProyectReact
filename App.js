import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import 'react-native-gesture-handler';
import {DrawerNavigation} from './Navigation/DrawerNavigation'
import Login from './Screens/Login/Login';
import Home from './Screens/Login/Home';





const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen  name="Login" component={Login}
      options={{
        title: "LOGIN",
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: {backgroundColor: "#525FE1"},
      }} />
      <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} 
      options={{
        title: "HOME",
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: {backgroundColor: "#525FE1"},
      }}/>
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
   
      <NavigationContainer>
        {/*<MyStack/>*/}
        <DrawerNavigation/>
        
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 50, // Ajusta este valor para cambiar la distancia desde la parte superior
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
    //justifyContent: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gaugeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
  gauge: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  gaugeText: {
    fontSize: 20,
    color: '#EE4E4E',
    fontWeight: 'bold',
  },
  gaugeText2: {
    fontSize: 20,
    color: '#00e0ff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '80%', // Puedes ajustar este valor según sea necesario
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 10, // Espacio entre los botones
    paddingVertical: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separador: {
    width: 20,
  },
});
