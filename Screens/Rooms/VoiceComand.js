import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Voice from 'react-native-voice';

const VoiceComand = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (event) => {
    setTranscript(event.value[0]);
    processCommand(event.value[0]);
  };

  const onSpeechStart = () => setIsListening(true);
  const onSpeechEnd = () => setIsListening(false);
  const onSpeechError = (event) => console.error('Speech recognition error', event);

  const startListening = async () => {
    try {
      await Voice.start('es-ES');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const processCommand = (command) => {
    // Aquí puedes agregar más lógica para diferentes comandos
    if (command.toLowerCase().includes('prender')) {
      setResponse('Luz prendida');
    } else if (command.toLowerCase().includes('apagar')) {
      setResponse('Luz apagada');
    } else {
      setResponse('Lo siento.');
    }

    // Usar la API de síntesis de voz para dar la respuesta
    // Necesitarás una biblioteca diferente para síntesis de voz en React Native
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title={isListening ? 'Detener' : 'Escuchar'} onPress={isListening ? stopListening : startListening} />
      <Text>Transcripción: {transcript}</Text>
      <Text>Respuesta: {response}</Text>
    </View>
  );
};

export default VoiceComand
