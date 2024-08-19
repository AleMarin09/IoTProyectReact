import Paho from "paho-mqtt";

import { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import 'react-native-gesture-handler';
import firebase from './firebaseConfig'; // Asegúrate de importar tu configuración de Firebase

import IconLedOn from 'react-native-vector-icons/MaterialCommunityIcons'
import IconLedOff from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAirOn from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAirOff from 'react-native-vector-icons/MaterialCommunityIcons'
import IconBedUp from 'react-native-vector-icons/MaterialIcons'
import IconBedDown from 'react-native-vector-icons/MaterialIcons'
import IconCortina from 'react-native-vector-icons/MaterialCommunityIcons'
import IconDoor from 'react-native-vector-icons/MaterialCommunityIcons'


const MQTT_PUB_TEMP = "HospVietma/hab01/temperatura";
const MQTT_PUB_HUM = "HospVietma/hab01/humedad";
const MQTT_CONTROL = "HospVietma/hab01/control";

client = new Paho.Client(
  "broker.hivemq.com",
  Number(8000),
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);


const Room = () => {

  const [temperatura, setTemperatura] = useState(0);
  const [humedad, setHumedad] = useState(0);
  const [value, setValue] = useState(0);


  useEffect(() => {
    // Simulación de actualización del valor
    const interval = setInterval(() => {
      setValue((prevValue) => (prevValue + 10) % 100);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function onMessage(message) {    
    if (message.destinationName === MQTT_PUB_TEMP){
        setTemperatura(parseInt(message.payloadString));
        firebase.database().ref('HospVietma/hab01/').update({
          Temp: parseInt(message.payloadString),
        });
        
    }
    else if(message.destinationName === MQTT_PUB_HUM){
        setHumedad(parseInt(message.payloadString));
        firebase.database().ref('HospVietma/hab01/').update({
          Hum: parseInt(message.payloadString),
        }); 
    }    
  }

  useEffect(() => {
    client.connect( {
      onSuccess: () => { 
      console.log("Conexión exitosa al servidor MQTT!");
      client.subscribe(MQTT_PUB_TEMP);
      client.subscribe(MQTT_PUB_HUM);
      client.onMessageArrived = onMessage;
    },
    onFailure: () => {
      console.log("Error en la conexión al servidor MQTT!"); 
    }
  });
  }, [])

  function control(c, opcion) {
    //const message = new Paho.Message(temperatura.toString());
    const message = new Paho.Message(opcion.toString());
    message.destinationName = MQTT_CONTROL;
    c.send(message);
  }

  return (
    <View style={styles.container}>
        <View style={styles.cont1}>
          <Text style={styles.title}>Habitación IoT</Text>
      </View>
      <View style={{height: 20,}} />

      <View style={styles.gaugeContainer}>
        <View style={styles.gauge}>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={temperatura}
            tintColor="#EE4E4E"
            backgroundColor="#3d5875"
            lineCap="round"
            rotation={0}
          >
            {
              (fill) => (
                <Text style={styles.gaugeText}>
                  {`${Math.round(fill)}ºC`}
                </Text>
              )
            }
          </AnimatedCircularProgress>
          <Text style={styles.title2}>Temperatura</Text>
        </View>
        <View style={styles.gauge}>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={humedad}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
            lineCap="round"
            rotation={0}
          >
            {
              (fill) => (
                <Text style={styles.gaugeText2}>
                  {`${Math.round(fill)}%`}
                </Text>
              )
            }
          </AnimatedCircularProgress>
          <Text style={styles.title2}>Humedad</Text>
        </View>
      </View>



      <View style={{height: 1,}} />
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Luces LED</Text>
      <View style={styles.buttonContainer}> 
        <TouchableOpacity style={styles.button} onPress={() => { control(client, 1);} }>
          <Text style={styles.buttonText}>
            <IconLedOn name='led-on' size={40}></IconLedOn>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { control(client, 2);} }>
          <Text style={styles.buttonText}>
            <IconLedOff name='led-variant-off' size={40}></IconLedOff>
          </Text>
        </TouchableOpacity>
      </View>


      <View style={{height: 5,}} />
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Ventilación</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 3);} }>
            <Text style={styles.buttonText}>
              <IconAirOn name='air-purifier' size={40}></IconAirOn>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 4);} }>
            <Text style={styles.buttonText}>
              <IconAirOff name='air-humidifier-off' size={40}></IconAirOff>
            </Text>
          </TouchableOpacity>
      </View>


      <View style={{height: 5,}} />
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cama</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 5);} }>
            <Text style={styles.buttonText}>
              <IconBedUp name='airline-seat-flat-angled' size={40}></IconBedUp>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 6);} }>
            <Text style={styles.buttonText}>
              <IconBedDown name='airline-seat-flat' size={40}></IconBedDown>
            </Text>
          </TouchableOpacity>
      </View>


      <View style={{height: 5,}} />
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cortinas</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPressIn={() => control(client, 7)}
            onPressOut={() => control(client, 'a')}>
            <Text style={styles.buttonText}>
              <IconCortina name='curtains' size={40}></IconCortina>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPressIn={() => control(client, 8)}
            onPressOut={() => control(client, 'a')}>
            <Text style={styles.buttonText}>
              <IconCortina name='curtains-closed' size={40}></IconCortina>
            </Text>
          </TouchableOpacity>
      </View>


      <View style={{height: 5,}} />
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>Puerta</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 9);} }>
            <Text style={styles.buttonText}>
              <IconDoor name='door-open' size={40}></IconDoor>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 0);} }>
            <Text style={styles.buttonText}>
              <IconDoor name='door-closed' size={40}></IconDoor>
            </Text>
          </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
export default Room

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20, // Ajusta este valor para cambiar la distancia desde la parte superior
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
    paddingVertical: 10,
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
