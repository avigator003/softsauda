import { StatusBar } from 'expo-status-bar';
import React,{useEffect,useState}from 'react';
import { StyleSheet, Text, View, Button,LogBox,NativeModules, Alert,Image,Dimensions } from 'react-native';
import Login from './screens/screen/Login';
import * as Updates from 'expo-updates'
import Company from './screens/screen/Company';
import DealerEntryList from './screens/Home/DealerEntryList';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import BillEntryList from './screens/Home/Bill Register/BillEntryList';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import theme1 from './screens/components/styles/DarkTheme.js'
import ComingSoon from './screens/screen/ComingSoon'
import Contract from './screens/Home/ContractEntry/ContractEntry'
import AddParty from './screens/Home/Party/AddParty'
import { Avatar } from 'react-native-paper';


import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
 } from './screens/responsiveLayout/ResponsiveLayout'

import Dealer from './screens/Home/Dealer';
import Landing from './screens/Home/Landing';
import AsyncStorage from '@react-native-community/async-storage';
import Posts from './screens/screen/Posts';
import Telephone from './screens/Home/Telephone/Telephone';
var u
const width= Dimensions.get('window').width
const height= Dimensions.get('window').height

const Stack = createStackNavigator();
export default function App(props) {
 

const[user,setUser]=useState()
const[loading,setLoading]=useState(false)

  useEffect(()=>{
    var isCancelled=false;
      const unsubscribe = async() => {
          u=await AsyncStorage.getItem("user")
          
          setUser(await AsyncStorage.getItem("user"))
          setLoading(true)
      }
      unsubscribe()
        return ()=>{
isCancelled=true
        };
  },[])


  LogBox.ignoreAllLogs(true)
  return (
    <>
    {  
      loading &&
      <View style={styles.container}>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      <MyDrawer usera={u}/>
    </View>
  }
  </>
  );
}



export function PostsStack({navigation}) {
  
  return (

    <Stack.Navigator>
      <Stack.Screen name="Posts" component={Posts} options={({ navigation }) => ({ headerStyle: {
            borderBottomEndRadius:20,borderBottomStartRadius:20,backgroundColor:theme1.LIGHT_BLUE_COLOR
          },
          headerTitleStyle: {
            color:theme1.HEADER_TEXT_COLOR
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          },
        })} />
         <Stack.Screen name="Login" component={Login}  options={({ navigation }) => ({  headerStyle: {
              borderBottomEndRadius:20,borderBottomStartRadius:20,backgroundColor:"#D9EDF7"}
        })} />
         <Stack.Screen name="Home" component={Landing} options={({ navigation }) => ({  headerStyle: {
         backgroundColor:"#D9EDF7"
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          },

        headerRight:(props)=>{ 
          return(
            
        <TouchableOpacity
          style={{ marginRight: 30 }}
          onPress={() =>
           Alert.alert("Logout alert", "Do you really want to Logout...", [
              {
                text: "NO",
                onPress: () => console.warn("NO Pressed"),
                style: "cancel"
              },
              {
                text: "YES",
                onPress: () =>
                     { 
                         AsyncStorage.removeItem("user")  
                         navigation.navigate("Posts");
                         console.log("restarting")
                         Updates.reloadAsync()
                    }
                    
              }
            ])
          }
        >
          <Icon name="sign-out" size={wp("10%")} style={{marginLeft:12}}  />
        </TouchableOpacity>
      )},
        })}/>
   
    </Stack.Navigator>
    

  );
}


export function LoginStack(props) {
  const[user,setUser]=useState()
  return (

    <Stack.Navigator >
         <Stack.Screen name="Login" component={Login}  options={({ navigation }) => ({  headerStyle: {
              borderBottomEndRadius:20,borderBottomStartRadius:20,},title:!AsyncStorage.getItem("user")?"Shift Company/Division":"Login",
            headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          },
          
 

        })} />
         </Stack.Navigator>

  );
}

export function HomeStack() {

  return (

    <Stack.Navigator>
      <Stack.Screen name="Home" component={Landing} options={({ navigation }) => ({   headerStyle: {
 backgroundColor:theme1.LIGHT_BLUE_COLOR
          }, headerTitleStyle: {
            color: 'black'
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          },

        headerRight:(props)=>{ 
          return(
            
        <TouchableOpacity
          style={{ marginRight: 30 }}
          onPress={() =>
           Alert.alert("Logout alert", "Do you really want to Logout...", [
              {
                text: "NO",
                onPress: () => console.warn("NO Pressed"),
                style: "cancel"
              },
              {
                text: "YES",
                onPress: () =>
                     { 
                       
                         AsyncStorage.removeItem("user")  
                         navigation.navigate("Posts");
                         Updates.reloadAsync()
                    }
                    
              }
            ])
          }
        >
          <Icon name="sign-out" size={wp("7%")}  />
        </TouchableOpacity>
      )},
        })}/>
     </Stack.Navigator>

  );
}


export function DealerStack() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Deal Entry" component={Dealer} options={({ navigation }) => ({  headerStyle: {
                    borderBottomEndRadius:20,borderBottomStartRadius:20,backgroundColor:theme1.LIGHT_BLUE_COLOR
          }, headerTitleStyle: {
            color:theme1.HEADER_TEXT_COLOR
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          }
        })}/>
    </Stack.Navigator>

  );
}


export function DealerListStack() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Register" component={DealerEntryList}options={({ navigation }) => ({  headerStyle: {
                    borderBottomEndRadius:20,borderBottomStartRadius:20,backgroundColor:theme1.LIGHT_BLUE_COLOR
          }, headerTitleStyle: {
            color:theme1.HEADER_TEXT_COLOR
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          }
        })}/>
    </Stack.Navigator>

  );
}



export function ContractStack() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Contract Entry" component={Contract} options={({ navigation }) => ({  headerStyle: {
                    borderBottomEndRadius:20,borderBottomStartRadius:20,backgroundColor:theme1.LIGHT_BLUE_COLOR
          }, headerTitleStyle: {
            color:theme1.HEADER_TEXT_COLOR
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          }
        })}/>
    </Stack.Navigator>

  );
}


export function TelephoneStack() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Telephone Directory" component={Telephone} options={({ navigation }) => ({  headerStyle: {
                    borderBottomEndRadius:20,borderBottomStartRadius:20,backgroundColor:theme1.LIGHT_BLUE_COLOR
          }, headerTitleStyle: {
            color:theme1.HEADER_TEXT_COLOR
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          }
        })}/>
    </Stack.Navigator>

  );
}

export function DeliveryListStack() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Delivery Register" component={DealerEntryList}options={({ navigation }) => ({  headerStyle: {
                  borderBottomEndRadius:20,borderBottomStartRadius:20,backgroundColor:theme1.LIGHT_BLUE_COLOR
          }, headerTitleStyle: {
            color:theme1.HEADER_TEXT_COLOR
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          }
        })}/>
    </Stack.Navigator>

  );
}

export function BillListStack() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Bill Register" component={BillEntryList}options={({ navigation }) => ({  headerStyle: {
                  borderBottomEndRadius:20,borderBottomStartRadius:20,backgroundColor:theme1.LIGHT_BLUE_COLOR
          }, headerTitleStyle: {
            color:theme1.HEADER_TEXT_COLOR
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          }
        })}/>
    </Stack.Navigator>

  );
}

export function PartyStack() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Add Party" component={AddParty} options={({ navigation }) => ({  headerStyle: {
                    borderBottomEndRadius:20,borderBottomStartRadius:20,backgroundColor:theme1.LIGHT_BLUE_COLOR
          }, headerTitleStyle: {
            color:theme1.HEADER_TEXT_COLOR
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          }
        })}/>
    </Stack.Navigator>

  );
}



export function ComingStack() {
  return (

    <Stack.Navigator>
      <Stack.Screen name="Coming Soon" component={ComingSoon} options={({ navigation }) => ({  headerStyle: {
                    borderBottomEndRadius:20,borderBottomStartRadius:20,backgroundColor:theme1.LIGHT_BLUE_COLOR
          }, headerTitleStyle: {
            color:theme1.HEADER_TEXT_COLOR
          },headerLeft: (props) => {
            return <Icon reverse name="bars" size={wp("7%")} color={theme1.HEADER_TEXT_COLOR} onPress={() => navigation.toggleDrawer()} style={{marginLeft:30}}  />
          }
        })}/>
    </Stack.Navigator>

  );
}




export function Drawerbutton({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
}



export function CustomDrawerContent(props) {
const[user,setUser]=useState()
     
    useEffect(()=>{
      const getUser=async()=>{
      setUser(await AsyncStorage.getItem("user"))
      }
      getUser()
      },[props.navigation])




  return (
    <>
          
    <DrawerContentScrollView {...props}  style={{backgroundColor:theme1.DARK_BLUE_COLOR}} >
  <View style={{display:"flex",flexDirection:"row",paddingLeft:20,width:wp("50%")}}>
    <Image source={require("./assets/softsauda.png")} style={{height:hp("10%"),width:wp("15%")}} resizeMode="contain" />
    <View style={{display:"flex",flexDirection:"column",width:wp("50%"),top:-20}}>  
        <Text style={{marginTop:25,fontWeight:"bold",fontSize:wp("6%"),marginLeft:5,color:"white"}}> SOFTSAUDA
       </Text>
       
      <Text
     style={{marginTop:10,fontWeight:"bold",fontSize:wp("3.5%")
     ,marginRight:25,color:"yellow",textAlign:"center",marginBottom:0}}>{user}  </Text>
       </View>

    </View>  
    <View style={{ borderBottomColor: 'grey',borderBottomWidth: 1,marginBottom:0,padding:0,marginBottom:10}}/>
  
      <DrawerItemList {...props} />
      {
        user &&
      <TouchableOpacity
          style={{ marginRight: 30 }}
          onPress={() =>
           Alert.alert("Logout alert", "Do you really want to Logout...", [
              {
                text: "NO",
                onPress: () => console.warn("NO Pressed"),
                style: "cancel"
              },
              {
                text: "YES",
                onPress: () =>
                     { 
                         AsyncStorage.removeItem("user")  
                         props.navigation.navigate("Posts");
                         console.log("restarting")
                         Updates.reloadAsync()
                    }
                    
              }
            ])
          }
        >
          <View style={{display:"flex",flexDirection:"row",paddingLeft:20,paddingTop:20}}>
          <Icon name="sign-out" size={wp("8%")} color="white"  style={{marginLeft:12}}/>
          <Text style={{fontSize:wp("4%"),paddingLeft:18,paddingTop:3,marginRight:15,color:"white"}}>Logout</Text>
        
          </View>
        </TouchableOpacity>
      }
     
    </DrawerContentScrollView>
    </>
  );
}

const Drawer = createDrawerNavigator();

export function MyDrawer({usera}) {
return (
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" 
          drawerContent={props => <CustomDrawerContent {...props}/>}
       
       
       drawerContentOptions={{
          activeTintColor: 'white',
          activeBackgroundColor: '#1B1B1B',
          inactiveTintColor: 'white',
          
          labelStyle:{
            marginLeft:-10,
            fontSize:wp("4%"),
            width:wp("50%")
            
          }
        }}>
     
        <Drawer.Screen name="Posts" component={PostsStack} options={{
            
            drawerIcon:  ({focused, size}) =>   
            <Icon name="copy" reverse size={wp("8%")} color="white" style={{marginLeft:8}} /> 
        }}/>
       {
         usera&&
         <>
        <Drawer.Screen name="Home" component={HomeStack} 
        options={{
            
          drawerIcon:  ({focused, size}) =>   
          <Icon name="home" reverse size={wp("8%")} color="white" style={{marginLeft:8}}  /> 
      }}/>
        <Drawer.Screen name="Deal Entry" component={DealerStack} options={{
            
            drawerIcon:  ({focused, size}) =>   
            <Image source={require("./assets/Deal.png")} reverse  size={wp("2%")} color="white" style={{height:height*0.04,width:40}}  /> 
        }} />
        <Drawer.Screen name="Contract Entry" component={ContractStack}  options={{
            
            drawerIcon:  ({focused, size}) =>   
            <Image source={require("./assets/contractentry.png")} reverse  size={wp("2%")} color="white" style={{height:40,width:40}}  /> 
        }}/>
        <Drawer.Screen name="Register" component={DealerListStack}  options={{
            
            drawerIcon:  ({focused, size}) =>   
            <Image source={require("./assets/register.png")} reverse size={wp("2%")} color="white" style={{height:40,width:40}}  /> 
        }}/>
        <Drawer.Screen name="Bill Register" component={BillListStack} options={{
            
            drawerIcon:  ({focused, size}) =>   
            <Image source={require("./assets/billing.png")} reverse size={wp("2%")} color="white" style={{height:40,width:40}}  /> 
        }} />
         <Drawer.Screen name="Add Party" component={PartyStack}  options={{
            
            drawerIcon:  ({focused, size}) =>   
            <Image source={require("./assets/contractentry.png")} reverse  size={wp("2%")} color="white" style={{height:40,width:40}}  /> 
        }}/>
     
      <Drawer.Screen name="Telephone Directory" component={TelephoneStack} options={{
            
            drawerIcon:  ({focused, size}) =>   
            <Image source={require("./assets/telephone.png")} reverse size={wp("2%")} color="white" style={{height:40,width:40}}  /> 
        }} />
      
            <Drawer.Screen name="Shift Division" component={LoginStack}
         options={{
            
          drawerIcon:  ({focused, size}) =>   
          <Icon name="building" reverse size={wp("8%")} color="white"   style={{marginLeft:12}} /> 
      }}/>
    
        </>
       }
      </Drawer.Navigator>
    </NavigationContainer>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

