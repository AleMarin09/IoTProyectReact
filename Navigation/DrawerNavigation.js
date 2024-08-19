import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import ProfileScreen from "../Screens/ProfileScreen";
import SettingScreen from "../Screens/SettingScreen";
import Room1 from "../Screens/Rooms/Room1";
import Room2 from "../Screens/Rooms/Room2";
import Room3 from "../Screens/Rooms/VoiceComand";
import Room4 from "../Screens/Rooms/VoiceComand2";
import { StyleSheet, Text } from "react-native";
import MenuButtonItem from "../Screens/Components/MenuButtonItem";
import Room from 'react-native-vector-icons/MaterialIcons'



const Drawer = createDrawerNavigator()

export function DrawerNavigation(){
    return(
        <Drawer.Navigator
            drawerContent = {(props) => <MenuItems {...props}/>}
        >
            
            
            <Drawer.Screen name="Habitacion 1" component={Room1}/>
            <Drawer.Screen name="Habitacion 2" component={Room2}/>
            <Drawer.Screen name="Habitacion 3" component={Room3}/>
            <Drawer.Screen name="Habitacion 4" component={Room4}/>
        </Drawer.Navigator>
    )
}

const MenuItems = ({navigation})=> {
    return(
        <DrawerContentScrollView
            style = {styles.container}
        >
            <Text style={styles.title}>Menú Habitaciones</Text>
            
            
            <MenuButtonItem
                
                image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvg2WukQsGiYF1Mlb08auGdQV9YgUjCnXm1w&s'
                text = "Habitacion 1"
                onPress = {()=>navigation.navigate('Habitacion 1')}
            />
            <MenuButtonItem
                
                image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvg2WukQsGiYF1Mlb08auGdQV9YgUjCnXm1w&s'
                text = "Habitacion 2"
                onPress = {()=>navigation.navigate('Habitacion 2')}
            />
            <MenuButtonItem
                
                image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvg2WukQsGiYF1Mlb08auGdQV9YgUjCnXm1w&s'
                text = "Habitacion 3"
                onPress = {()=>navigation.navigate('Habitacion 3')}
            />
            <MenuButtonItem
                
                image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvg2WukQsGiYF1Mlb08auGdQV9YgUjCnXm1w&s'
                text = "Habitacion 4"
                onPress = {()=>navigation.navigate('Habitacion 4')}
            />

        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
    },
    title:{
       
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom:20,
        
    }
})