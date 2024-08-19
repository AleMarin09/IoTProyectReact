import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import User from 'react-native-vector-icons/FontAwesome'
import Room from 'react-native-vector-icons/MaterialIcons'


const MenuButtonItem = ({text, onPress, image}) => {
  return (
    <TouchableOpacity
        onPress={onPress}
        style={styles.buttonContainer}
    >
        <Image
            source={{uri:image}}
            style={ styles.image}
        />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#dedee0'
    },
    image:{
        borderRadius:23,
        height: 45,
        width:45,
    },
    text:{
        fontSize:20,
        fontWeight: 'bold',
        marginStart:7,
    }
})
export default MenuButtonItem