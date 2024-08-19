import { Text, StyleSheet, View, TextInput, TouchableOpacity,Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
/*
import firebase from '../Rooms/firebaseConfig'
const auth = getAuth(firebase)
*/
export default function Login (props) {
    const[email, setEmail] = useState()
    const[password, setPassword] = useState()

    const logeo = async()=>{
        try {
            await signInWithEmailAndPassword(auth, email, password)
            Alert.alert('Iniciando sesion','Accediendo....')
            props.navigation.navigate('DrawerNavigation')
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <View style={styles.padre}>
        <View>
            <Image source={require('../Images/pexels-shkrabaanthony-5215024.jpg')} style= {styles.profile} />
            
        </View>

        <View style={styles.tarjeta}>
            <View style={styles.cajaTexto}>
                <TextInput placeholder='correo@gmail.com' style={{paddingHorizontal:15}} 
                onChangeText={(text)=>setEmail(text)} />

            </View>

            <View style={styles.cajaTexto}>
                <TextInput placeholder='Password' style={{paddingHorizontal:15}} secureTextEntry={true}
                onChangeText={(text)=>setPassword(text)} />

            </View>

            <View style={styles.padreBoton}>
                <TouchableOpacity style={styles.cajaBoton} onPress={logeo} >
                    <Text style={styles.textoBoton}>Sign in</Text>
                </TouchableOpacity>
            </View>

        </View>
      </View>
    )
  }

const styles = StyleSheet.create({
    padre:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'white'
    },
    profile:{
        width:150,
        height:150,
        borderRadius:75,
        borderColor:'red'
    },
    tarjeta:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        width:'90%',
        padding:20,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5,

    },
    cajaTexto:{
        paddingVertical:20,
        backgroundColor:'#cccccc40',
        borderRadius:30,
        marginVertical:10,
    },
    padreBoton:{
        alignItems:'center',

    },
    cajaBoton:{
        backgroundColor:'#525FE1',
        borderRadius:30,
        paddingVertical:20,
        width:150,
        marginTop:20,

    },
    textoBoton:{
        textAlign:'center',
        color:'white'
    }

})