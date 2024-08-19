import React, { useState, useEffect } from 'react';
import { View, Button, Text, Platform, Alert } from 'react-native';
import Voice from 'react-native-voice';

const VoiceRecognition = () => {
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e) => {
    setRecognizedText(e.value[0]);
  };

  const onSpeechError = (e) => {
    Alert.alert('Error', 'No se pudo reconocer el texto.');
  };

  const startRecognition = async () => {
    try {
      await Voice.start('es-ES'); // Cambia el código del idioma si es necesario
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Habla" onPress={startRecognition} />
      <Text>Texto Reconocido: {recognizedText}</Text>
    </View>
  );
};

export default VoiceRecognition;
