import { View, Text, Button, StyleSheet, Image, Linking, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../responsiveLayout/ResponsiveLayout'
import moment from 'moment';
import { Grid, Row, Col } from 'react-native-easy-grid'
function Landing(props) {



  const dealerHandler = () => {

    props.navigation.navigate('Deal Entry')
  }

  const dealerListHandler = () => {

    props.navigation.navigate('Register')
  }

  const contractListHandler = () => {

    props.navigation.navigate('Contract Register')
  }

  const deliveryListHandler = () => {

    props.navigation.navigate('Delivery Register')
  }

  const billRegisterHandler = () => {
    props.navigation.navigate('Bill Register')
  }

  
  const comingSoonHandler = () => {
    props.navigation.navigate('Contract Entry')
  }
  const telephoneHandler = () => {
    props.navigation.navigate('Telephone Directory')
  }

  
  useEffect(() => {
    const use = async () => {
      console.log("setting")
      var startDate=moment(await AsyncStorage.getItem("startingDate")).format("DD/MM/YYYY")
      var endDate=moment(await AsyncStorage.getItem("endDate")).format("DD/MM/YYYY")
      var divisionCode=await AsyncStorage.getItem("divisionName")
     props.navigation.setOptions({
        headerTitle: () => {
          return(
            <View style={{diplay:"flex",flexDirection:"row"}}>
            <Text style={{textAlign:"center",fontWeight:"bold",fontSize:wp("5%"),marginTop:5}}>Home  
            </Text>
            <View style={{diplay:"flex",flexDirection:"column",alignItems:"center",marginLeft:20}}>
            <Text style={{fontWeight:"bold",color:"blue"}} >{divisionCode}</Text>
            <Text style={{fontWeight:"bold",color:"blue"}} >{startDate.substring(3,10)}-{endDate.substring(3,10)}</Text>
            </View>
            </View>
          )
        }
      
      })
  
    }
    use()
  }, [])


  return (
    <ScrollView style={styles.container}>
          <Grid>

        <Row style={[styles.container1,{borderBottomColor:"black",borderBottomWidth:0.5}]}>
          <Col
            style={[
              styles.container1,{borderRigthColor:"black",borderRightWidth:0.5}]}
          >
            <TouchableOpacity

              style={styles.icon}
              activeOpacity={0.8}
              onPress={() => dealerHandler()}
            >
              <Image source={require("../../assets/Deal.png")} style={styles.image} resizeMode="contain" />
              <Text style={styles.text}
              >Deal Entry</Text>

            </TouchableOpacity>


          </Col>
          <Col
            style={[
              styles.container1,
            ]}
          >

            <TouchableOpacity

              style={styles.icon}
              activeOpacity={0.8}
              onPress={() => comingSoonHandler()}
            >
              <Image source={require("../../assets/contractentry.png")} style={[styles.image, { width: wp("10%"), marginLeft: 25 }]} resizeMode="contain" />
              <Text style={styles.text}>Contract Entry</Text>

            </TouchableOpacity>

          </Col>
        </Row>




        <Row  style={[styles.container1,{borderBottomColor:"black",borderBottomWidth:0.5}]}>
          <Col
           
           style={[
            styles.container1,{borderRigthColor:"black",borderRightWidth:0.5}]}
          >
            <TouchableOpacity

              style={styles.icon}
              activeOpacity={0.8}
              onPress={() => dealerHandler()}
            >
              <Image source={require("../../assets/delivery.png")} style={[styles.image, { marginLeft: 10 }]} resizeMode="contain" />
              <Text style={styles.text}>Delivery Entry</Text>

            </TouchableOpacity>

          </Col>
          <Col
            style={[
              styles.container1,
            ]}
          >
            <TouchableOpacity

              style={styles.icon}
              activeOpacity={0.8}
              onPress={() => comingSoonHandler()}
            >
              <Image source={require("../../assets/payment.png")} style={[styles.image, { width: wp("10%"), marginLeft: 30 }]} resizeMode="contain" />
              <Text style={styles.text}>Payment Entry</Text>

            </TouchableOpacity>

          </Col>
        </Row>







        <Row style={[styles.container1,{borderBottomColor:"black",borderBottomWidth:0.5}]}>
          <Col
            
            style={[
              styles.container1,{borderRigthColor:"black",borderRightWidth:0.5}]}
          >
            <TouchableOpacity

              style={styles.icon}
              activeOpacity={0.8}
              onPress={() => dealerListHandler()}
            >

              <Image source={require("../../assets/register.png")}
                style={[styles.image, { width: wp("12%"), marginLeft: 15 }]} resizeMode="contain" />

              <Text style={styles.text}>Register</Text>

            </TouchableOpacity>

          </Col>
          <Col
            style={[
              styles.container1,
            ]}
          >

            <TouchableOpacity

              style={styles.icon}
              activeOpacity={0.8}
              onPress={() => contractListHandler()}
            >
              <Image source={require("../../assets/billing.png")} style={[styles.image, { width: wp("10%"), marginLeft: 20 }]} resizeMode="contain" />
              <Text style={styles.text}>Bill Register</Text>

            </TouchableOpacity>

          </Col>
        </Row>









        <Row style={[styles.container1,{borderBottomColor:"black",borderBottomWidth:0.5}]}>
          <Col
            
            style={[
              styles.container1,{borderRigthColor:"black",borderRightWidth:0.5}]}
          >

            <TouchableOpacity

              style={styles.icon}
              activeOpacity={0.8}
              onPress={() => telephoneHandler()}
            >
              <Image source={require("../../assets/telephone.png")} style={[styles.image, { width: wp("10%"), marginLeft: 20 }]} resizeMode="contain" />
              <Text style={styles.text}>Telephone</Text>

            </TouchableOpacity>
          </Col>
          <Col
            style={[
              styles.container1,
            ]}
          >

            <TouchableOpacity

              style={styles.icon}
              activeOpacity={0.8}
              onPress={() => comingSoonHandler()}
            >
              <Image source={require("../../assets/reminder.png")} style={[styles.image, { width: wp("10%"), marginLeft: 20 }]} resizeMode="contain" />
              <Text style={styles.text}>Reminder</Text>

            </TouchableOpacity>
          </Col>
        </Row>
        <Row  style={[styles.container1,{borderBottomColor:"black",borderBottomWidth:0.5}]} >
          <Col
            
            style={[
              styles.container1,{borderRigthColor:"black",borderRightWidth:0.5}]}
          >
            <TouchableOpacity

              style={styles.icon}
              activeOpacity={0.8}
              onPress={() => comingSoonHandler()}

            >
              <Image source={require("../../assets/ledger.png")} style={[styles.image, { width: wp("8%"), top: -5, marginLeft: 25 }]} resizeMode="contain" />
              <Text style={[styles.text,{marginLeft:15}]}>Ledger</Text>


            </TouchableOpacity>
          </Col>
          <Col
            style={[
              styles.container1,
            ]}
          >
            <TouchableOpacity
              style={styles.icon}
              activeOpacity={0.8}
              onPress={() => comingSoonHandler()}
            >
              <Icon reverse name="comments" size={wp("12%")} color="white"
                style={{ justifyContent: "center", marginLeft: 20 ,marginTop:10}} />
              <Text style={[styles.text,{marginTop:20}]}>Chat & Support</Text>
            </TouchableOpacity>
          </Col>
        </Row>
      </Grid>



      <View style={{ height: hp("15%") }} >
        <View style={{ height: hp("9%"), zIndex: 20 }} resizeMode="contain">
          <TouchableOpacity
            onPress={() => Linking.openURL('http://softsauda.com/userright/login')}  >
            <Image source={require("../../assets/login.png")}
              style={{ height: hp("13%"), width: wp("10%"), zIndex: 22, marginLeft: 10,top:hp("4.5%") }} resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={{
          textAlign: "center", paddingTop: 20,
          backgroundColor: theme1.LIGHT_BLUE_COLOR, color: "white", height: hp("17%"), borderRadius: 20, top: -15
        }}  >
          <TouchableOpacity onPress={() => Linking.openURL('http://softsauda.com/userright/login')}  >
            <Text style={{
              textAlign: "center", paddingTop: 0, fontSize: wp("3.5%"),
              color: "black", fontWeight: "bold", left: 25
            }} > © 2020 Complete Canvassing Accounting Solution</Text>
          </TouchableOpacity>
        </View>

      </View>

    </ScrollView>

  )
}

export default Landing

const styles = StyleSheet.create({

  button: {
    alignItems: "center",
    justifyContent: "center",
    top: 4,
    left: 0,
    backgroundColor: "skyblue",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10
  },
  image: {
    justifyContent: "center",
    width: wp("20%"),
    height: hp("10%"),
    borderRadius: 15,
    paddingRight: 20,



  },
  appButtonContainer: {
    elevation: 8,
    width: wp("42%"),
    height: hp("16%"),
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 10
  },
  appButtonText: {
    fontSize: wp("5%"),
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    marginTop: 10
  },
  container1: {
    alignItems: "center",
    justifyContent: "center"
  },
  appButtonContainer1: {
    elevation: 8,
    width: wp("44%"),
    height: hp("16%"),
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginTop: 10,
    marginBottom: 10
  },
  appButtonText1: {
    fontSize: 15,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    marginTop: 10
  },

  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#4B77BE",
    height:hp("100%")
  },
  icon: {
    marginBottom: 15,
    width: wp("50%"),
    padding: 5,
    marginLeft: wp("15%"),
    height: hp("14%")

  }, text: {
    fontSize: wp("4.8%"),
    color: "white",
    top: -10,

  }


})
