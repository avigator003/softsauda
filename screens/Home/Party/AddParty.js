import React, { Component, useState, useEffect, useRef } from 'react'
import {
    View, Text, StyleSheet, TextInput,  Button,
    ActivityIndicator, Dimensions, ToastAndroid
} from 'react-native';
import { Form, Input, Label, Item } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import * as Updates from 'expo-updates'

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from '../../responsiveLayout/ResponsiveLayout'
import theme1 from '../../components/styles/DarkTheme'

import SelectMultiple from 'react-native-select-multiple'
import SelectTwo from '../../components/SelectTwo';


function AddParty({ navigation, route }) {


    const checkList= [
        { value: "B", label: 'Buyer'},
        { value: "S", label: 'Seller'},
        { value: "T", label: 'Seller Broker' },
        { value: "R", label: 'Buyer Broker'},
      ];
  
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)


    const [name, setName] = useState()
    const [mobile, setMobile] = useState()
    const [address, setAddress] = useState()

    const [selectedCityItems, setSelectedCityItems] = useState([])
    const [cityId, setCityId] = useState();
    const [cityItems, setCityItems] = useState([])

const[selectedItems,setSelectedItems]=useState([])

    // Refs

    const nameRef = useRef()
    const cityRef = useRef()
    const mobileRef = useRef()
    const addressRef = useRef()
    
    //Handle Ids

    const handleCityId = (item) => {
        setCityId(item.id)
    }
useEffect(()=>{

},[])

    
const getCity = async () => {
    const URL =  `http://www.softsauda.com/add_city/getcitylist`
        
   axios.get(URL)
   .then(response => {
       console.log("response",response)
     response.data.city_name.map(dat => (
       setCityItems(oldArray => [...oldArray, { id: dat._id, name: dat.city_name }])
     ))
    setLoading(true)
       })
       .catch(error=>console.log("error",error))
   
   }
   
    //OnFocus

    const onFocusChange = (name, i) => {
        if (name == "name") {

            nameRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        
        else if (name == "mobile") {
            mobileRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }
        else if (name == "address") {
            addressRef.current.setNativeProps({
                style: { backgroundColor: "#FCFE8F" }
            });
        }

    }

    const onBlurChange = (name, i) => {

        if (name == "name") {
            nameRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
       
        else if (name == "mobile") {
            mobileRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
        else if (name == "address") {
            addressRef.current.setNativeProps({
                style: { backgroundColor: "#D3FD7A" }
            });
        }
    }

    
    useEffect(() => {
    if (name===undefined || name.length==0) 
        setDisabled(true)
    
      else if(cityId===undefined || cityId.length==null)
      setDisabled(true)
      else 
        setDisabled(false)
            
      }, [cityId, name])




    const handleSubmit = () => {

                const submit=async()=>{
                var string=""
                selectedItems.map((item,i)=>{
                    if(i==0)
                    {
                        string=string+item.value
                    }
                    else{
                    string=string+","+item.value
                    }
                })
                
                              axios({
                                  method: 'POST',
                                  url: "http://www.softsauda.com/party/party_save",
                                  data: {
                                     p_type:string,//this.state.selectedItems,
                                     party_name:name,
                                     mob_no:mobile,
                                     masterid:await AsyncStorage.getItem("masterid"),
                                     address1:address, 
                                     city_name:cityId,
                                     co_code:await AsyncStorage.getItem("companyCode"),
                                     div_code:await AsyncStorage.getItem("divisionCode"),
                                     usrnm:await AsyncStorage.getItem("user"),
                                  }
                              })
                                  .then(respone => {
                                      console.log(respone,"resonse")
                                      ToastAndroid.showWithGravity(
                                      "Party Added",
                                       ToastAndroid.SHORT,
                                       ToastAndroid.CENTER
                                    );  
                                       setName("")
                                       setAddress("")   
                                       setMobile("")
                          
                                  })
                                  
                              }
     submit();
     //Seller Broker--T
     //Buyer Broker--R
    }


   const onSelectionsChange = (selectedItems) => {
        console.log(selectedItems)
        // selectedFruits is array of { label, value }
        setSelectedItems(selectedItems)
      }

    return (
        <>
            {loading ? (
                <>

                    <ScrollView keyboardShouldPersistTaps='always' style={styles.container}>

                    <SelectMultiple
             items={checkList}
             selectedItems={selectedItems}
             onSelectionsChange={onSelectionsChange} />

                        <Form style={styles.form}>
                            <View style={{ marginBottom: 40 }}>
                                <Text>Name</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: "#D3FD7A" }]}
                                    placeholder="Name"
                                    ref={nameRef}
                                    onFocus={() => onFocusChange("name")}
                                    onBlur={() => onBlurChange("name")}
                                    defaultValue={name}
                                    onChangeText={text => setName(text)}
                                    onSubmitEditing={() => mobileRef.current.focus()}
                                />
                            </View>
                            <View style={{ marginBottom: 40 }}>
                                <Text style={{fontWeight:"bold",fontSize:wp("10%")}}>Mobile No.</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: "#D3FD7A" }]}
                                    placeholder="Enter Mobile Number"
                                    ref={mobileRef}
                                    onFocus={() => onFocusChange("mobile")}
                                    onBlur={() => onBlurChange("mobile")}
                                    defaultValue={mobile}
                                    onChangeText={text => setMobile(text)}
                                    onSubmitEditing={() => addressRef.current.focus()}
                                />
                            </View>
                            <View style={{ marginBottom: 40 }}>
                                <Text>Address</Text>
                                <TextInput
                                    style={[styles.input, { backgroundColor: "#D3FD7A" }]}
                                    placeholder="Enter Address"
                                    ref={addressRef}
                                    onFocus={() => onFocusChange("address")}
                                    onBlur={() => onBlurChange("address")}
                                    defaultValue={address}
                                    onChangeText={text => setAddress(text)}
                                    onSubmitEditing={() => cityRef.current.focus()}
                                />
                            </View>
                            <View style={{ marginBottom: 40 }}>
                                <Text>City</Text>
                                <SelectTwo items={cityItems} selectedItem={selectedCityItems} handleId={handleCityId} width={wp('92%')} placeholder="City" borderColor="#ccc" />
                   
                            </View>



                            <View style={[styles.column, { justifyContent: "center" }]}>

                                <TouchableOpacity onPress={() => handleSubmit()}
                                    style={disabled?styles.button:styles.button1}
                                    disabled={disabled}>

                                    <Text style={{ color: "white" }}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </Form>

                    </ScrollView></>


            ) : (<ActivityIndicator size="large" color="skyblue" size={100} />
                )
            }
        </>

    )
}



export default AddParty

const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: "center",
        width: '40%',
        height: "30%",
        top: -10,
        left: 120


    },
    dealnumber: {
        display: "flex",
        flexDirection: "row"
    },
    column: {
        display: "flex",
        flexDirection: "row"
    },
    item: {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
    },
    input: {
        height: 35,
        flex: 1,
        width: wp('90%'),
        borderStartWidth: 2,
        borderColor: "grey",
        borderEndWidth: 0.5,
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomWidth: 0.5,
        margin: 4,
        padding: 8,
        borderRadius: 5
    },
    progress: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 350,



    },

    form: {
        flex: 1,
        top: 0,
        marginTop: 100,
        marginHorizontal: 10,
        borderRadius: 12,
        padding: 10,

    },
    container: {
        flex: 1,
        flexDirection: "column",
        height: hp("100%"),

    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: wp("90%"),
        top: 4,
        left: 0,
        backgroundColor: "lightgrey",
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    button1: {
        alignItems: "center",
        justifyContent: "center",
        width: wp("90%"),
        top: 4,
        left: 0,
        backgroundColor: theme1.DARK_BLUE_COLOR,
        padding: 10,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    card: {
        backgroundColor: "white",
        borderRadius: 15,
        padding: 10,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        padding: 10,
        marginBottom: 5,
        marginTop: 10
    }

})
