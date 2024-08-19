import React, { useState, useEffect } from 'react'

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import 'react-native-gesture-handler';
import IconLedOn from 'react-native-vector-icons/MaterialCommunityIcons'
import IconLedOff from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAirOn from 'react-native-vector-icons/MaterialCommunityIcons'
import IconAirOff from 'react-native-vector-icons/MaterialCommunityIcons'
import IconBedUp from 'react-native-vector-icons/MaterialIcons'
import IconBedDown from 'react-native-vector-icons/MaterialIcons'
import IconCortina from 'react-native-vector-icons/MaterialCommunityIcons'
import IconDoor from 'react-native-vector-icons/FontAwesome5'


const Room2 = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  useEffect(() => {
    // Verificar si el navegador soporta la API de Web Speech
    if (!('webkitSpeechRecognition' in window)) {
      alert('Tu navegador no soporta la API de reconocimiento de voz.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'es-ES'; // Puedes cambiar el idioma aquí
    recognition.continuous = false;
    recognition.interimResults = false;

    // Iniciar reconocimiento de voz
    recognition.onstart = () => setIsListening(true);

    // Cuando el reconocimiento de voz finaliza
    recognition.onend = () => setIsListening(false);

    // Cuando el reconocimiento de voz recibe un resultado
    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setTranscript(speechResult);
      processCommand(speechResult);
    };

    // Manejar errores de reconocimiento
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
    };

    if (isListening) {
      recognition.start();
    }

    // Limpiar el reconocimiento cuando se desmonte el componente
    return () => {
      recognition.stop();
    };
  }, [isListening]);

  // Procesar comandos de voz
  const processCommand = (command) => {
    // Aquí puedes agregar más lógica para diferentes comandos
    if (command.toLowerCase().includes('prender')) {
      setResponse('Luz prendida');
    } 
    else if(command.toLowerCase().includes('apagar')){
        setResponse('luz apagada');
    }
    else {
      setResponse('Lo siento.');
    }

    // Usar la API de síntesis de voz para dar la respuesta
    const utterance = new SpeechSynthesisUtterance(response);
    window.speechSynthesis.speak(utterance);
  };
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onClick={() => setIsListening(true)}>
        <Text>{isListening ? 'Escuchando...' : 'Hablar'}</Text>
      </TouchableOpacity>
      <Text>Transcripción: {transcript}</Text>
      <Text>Respuesta: {response}</Text>
      </View>
        <View style={styles.cont1}>
          <Text style={styles.title}>Habitación IoT</Text>
      </View>
      <View style={{height: 20,}} />

      <View style={styles.gaugeContainer}>
        <View style={styles.gauge}>
          <AnimatedCircularProgress
            size={120}
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
            size={120}
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

      <View style={{height: 1,}} />
      <Text>Luces LED</Text>
      <View style={styles.buttonContainer}> 
        <TouchableOpacity disabled={true} style={styles.button} onPress={() => { control(client, 1);} }>
          <Text style={styles.buttonText}>
            <IconLedOn name='led-on' size={40}></IconLedOn>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={true} style={styles.button} onPress={() => { control(client, 2);} }>
          <Text style={styles.buttonText}>
          <IconLedOff name='led-off' size={40}></IconLedOff>
          </Text>
        </TouchableOpacity>
      </View>


      <View style={{height: 20,}} />
      <Text>Ventilación</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity disabled={true} style={styles.button} onPress={() => { control(client, 3);} }>
            <Text style={styles.buttonText}>
            <IconAirOn name='air-purifier' size={40}></IconAirOn>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true} style={styles.button} onPress={() => { control(client, 4);} }>
            <Text style={styles.buttonText}>
            <IconAirOff name='air-humidifier-off' size={40}></IconAirOff>
            </Text>
          </TouchableOpacity>
      </View>


      <View style={{height: 20,}} />
      <Text>Cama</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity disabled={true} style={styles.button} onPress={() => { control(client, 5);} }>
            <Text style={styles.buttonText}>
            <IconBedUp name='airline-seat-flat-angled' size={40}></IconBedUp>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true} style={styles.button} onPress={() => { control(client, 6);} }>
            <Text style={styles.buttonText}>
            <IconBedDown name='airline-seat-flat' size={40}></IconBedDown>
            </Text>
          </TouchableOpacity>
      </View>

      
      <View style={{height: 20,}} />
      <Text>Cortinas</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity disabled={true}
            style={styles.button}
            onPressIn={() => control(client, 7)}
            onPressOut={() => control(client, 'a')}>
            <Text style={styles.buttonText}>
              <IconCortina name='curtains' size={40}></IconCortina>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true}
            style={styles.button}
            onPressIn={() => control(client, 8)}
            onPressOut={() => control(client, 'a')}>
            <Text style={styles.buttonText}>
            <IconCortina name='curtains-closed' size={40}></IconCortina>
            </Text>
          </TouchableOpacity>
      </View>


      <View style={{height: 20,}} />
      <Text>Puerta</Text>
      <View style={styles.buttonContainer}>
          <TouchableOpacity disabled={true} style={styles.button} onPress={() => { control(client, 9);} }>
            <Text style={styles.buttonText}>
              <IconDoor name='door-open' size={40}></IconDoor>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={true} style={styles.button} onPress={() => { control(client, 0);} }>
            <Text style={styles.buttonText}>
              <IconDoor name='door-closed' size={40}></IconDoor>
            </Text>
          </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

export default Room2

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
      marginHorizontal: 1, // Espacio entre los botones
      paddingVertical: 10,
      backgroundColor: '#f70202',
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
  