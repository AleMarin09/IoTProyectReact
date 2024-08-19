import { useState, useEffect } from 'react';
import { Button, Text } from '@tremor/react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Paho from 'paho-mqtt';

// Configuración de MQTT
const MQTT_PUB_TEMP = 'HospVietma/hab01/temperatura';
const MQTT_PUB_HUM = 'HospVietma/hab01/humedad';
const MQTT_CONTROL = 'HospVietma/hab01/control';

const client = new Paho.Client(
  'broker.hivemq.com',
  Number(8000),  // Verifica que el puerto sea el adecuado (puede ser 1883 para MQTT estándar)
  `mqtt-async-test-${parseInt(Math.random() * 100)}`
);

function ButtonCort() {
  const [temperatura, setTemperatura] = useState(0);
  const [humedad, setHumedad] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    client.connect({
      onSuccess: () => {
        console.log('Connected to MQTT broker!');
        setIsConnected(true);
        client.subscribe(MQTT_PUB_TEMP);
        client.subscribe(MQTT_PUB_HUM);
        client.onMessageArrived = onMessage;
      },
      onFailure: (error) => {
        console.error('MQTT connection failed:', error);
      }
    });

    return () => {
      client.disconnect();
      setIsConnected(false);
    };
  }, []);

  function onMessage(message) {
    if (message.destinationName === MQTT_PUB_TEMP) {
      setTemperatura(parseInt(message.payloadString));
    } else if (message.destinationName === MQTT_PUB_HUM) {
      setHumedad(parseInt(message.payloadString));
    }
  }

  function control(c, opcion) {
    //const message = new Paho.Message(temperatura.toString());
    const message = new Paho.Message(opcion.toString());
    message.destinationName = MQTT_CONTROL;
    c.send(message);
  }

  return (
    <div style={styles.container}>
      <div style={styles.cont1}>
        <h1>Habitación IoT</h1>
      </div>
      <div style={{ height: 20 }} />

      <div style={styles.gaugeContainer}>
        <div style={styles.gauge}>
          <CircularProgressbar
            value={temperatura}
            maxValue={100}
            text={`${Math.round(temperatura)}ºC`}
            styles={buildStyles({
              pathColor: '#EE4E4E',
              textColor: '#EE4E4E',
              trailColor: '#3d5875'
            })}
          />
          <Text style={styles.title2}>Temperatura</Text>
        </div>
        <div style={styles.gauge}>
          <CircularProgressbar
            value={humedad}
            maxValue={100}
            text={`${Math.round(humedad)}%`}
            styles={buildStyles({
              pathColor: '#00e0ff',
              textColor: '#00e0ff',
              trailColor: '#3d5875'
            })}
          />
          <Text style={styles.title2}>Humedad</Text>
        </div>
      </div>

      <div style={{ height: 20 }} />
      <Text style={styles.sectionTitle}>Luces LED</Text>
      <div style={styles.buttonContainer}>
        <button onClick={() => { control(client, 1);} }>Encender Luz</button>
        <button onClick={() => { control(client, 2);} }>Apagar Luz</button>
      </div>

      <div style={{ height: 20 }} />
      <Text style={styles.sectionTitle}>Ventilación</Text>
      <div style={styles.buttonContainer}>
        <button onClick={() => { control(client, 3);}}>Encender Ventilación</button>
        <button onClick={() => { control(client, 4);}}>Apagar Ventilación</button>
      </div>

      <div style={{ height: 20 }} />
      <Text style={styles.sectionTitle}>Cama</Text>
      <div style={styles.buttonContainer}>
        <button onClick={() => { control(client, 5);}}>Subir Cama</button>
        <button onClick={() => { control(client, 6);}}>Bajar Cama</button>
      </div>

      <div style={{ height: 20 }} />
      <Text style={styles.sectionTitle}>Cortinas</Text>
      <div style={styles.buttonContainer}>
        <button onMouseDown={() => { control(client, 7);}} onMouseUp={() => { control(client, 'a');}}>Abrir Cortinas</button>
        <button onMouseDown={() => { control(client, 8);}} onMouseUp={() => { control(client, 'a');}}>Cerrar Cortinas</button>
      </div>

      <div style={{ height: 20 }} />
      <Text style={styles.sectionTitle}>Puerta</Text>
      <div style={styles.buttonContainer}>
        <button onClick={() => { control(client, 9);}}>Abrir Puerta</button>
        <button onClick={() => { control(client, 0);}}>Cerrar Puerta</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  cont1: {
    marginBottom: 20,
  },
  gaugeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '20%',
  },
  gauge: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
};

export default ButtonCort
    