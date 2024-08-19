/*import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Button, View, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
        <View style={styles.cont1}>
          <Text style={styles.title}>Habitación IoT</Text>
      </View>
      <View style={{height: 50,}} />

      <View style={styles.gaugeContainer}>
        <View style={styles.gauge}>
          <AnimatedCircularProgress
            size={150}
            width={15}
            fill={77}
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
            size={150}
            width={15}
            fill={77}
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

      <View style={{height: 20,}} />
      <View style={styles.buttonContainer}> 
        <TouchableOpacity style={styles.button} onPress={() => { control(client, 1);} }>
          <Text style={styles.buttonText}>Luz ON</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { control(client, 2);} }>
          <Text style={styles.buttonText}>Luz OFF</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 20,}} />
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 3);} }>
            <Text style={styles.buttonText}>Fan ON</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 4);} }>
            <Text style={styles.buttonText}>Fan OFF</Text>
          </TouchableOpacity>
      </View>
      <View style={{height: 20,}} />
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 5);} }>
            <Text style={styles.buttonText}>Subir Cama</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 6);} }>
            <Text style={styles.buttonText}>Bajar Cama</Text>
          </TouchableOpacity>
      </View>
      <View style={{height: 20,}} />
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPressIn={() => control(client, 7)}
            onPressOut={() => control(client, 'a')}>
            <Text style={styles.buttonText}>Abrir Cortina</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPressIn={() => control(client, 8)}
            onPressOut={() => control(client, 'a')}>
            <Text style={styles.buttonText}>Cerrar Cortina</Text>
          </TouchableOpacity>
      </View>
      <View style={{height: 20,}} />
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 9);} }>
            <Text style={styles.buttonText}>Abrir Puerta</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { control(client, 0);} }>
            <Text style={styles.buttonText}>Cerrar Puerta</Text>
          </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
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
});*/
