import AsyncStorage from '@react-native-community/async-storage'
import React,{useEffect,useState} from 'react'
import {View,Text,StyleSheet,Image} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import Header from './PostsComponents/Header/index';
import Body from './PostsComponents/Body/index';
import Footer from './PostsComponents/Footer/index';
import Carousel from 'react-native-snap-carousel';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from '../responsiveLayout/ResponsiveLayout'
import Axios from 'axios';


const softsaudaItems= [
  {
      detail:" India's First mobile app specially designed for Canvassing Agents and linked with Softsauda.com",
      icon: require('../../assets/softsauda.png')
  },
  {
      detail:"Deal between Buyer and Seller with multiple product, qty and price details.",
      icon: require('../../assets/Deal.png'),
  },
  
  {
    detail:" Watsapp sharing feature of selected buyer details to seller.",
    icon: require('../../assets/telephone.png'),
  },
  {
    detail:" List of all bills generated thru Web-App - and Watsapp PDF Sharing",
    icon: require('../../assets/billing.png'),
  },
  
]


function Posts({post,navigation}) {
    
const[user,setUser]=useState()
const[cardHeight,setCardHeight]=useState(hp("70%"))
const[carouselItems,setCaroselItems]=useState()
const[party,setParty]=useState([])
const[items,setItems]=useState()
const[loading,setLoading]=useState(true)



       useEffect(()=>{
         const unsubscribe =navigation.addListener('focus', async() => {
            console.log(await AsyncStorage.getItem("user"),"posts")
            let u=await AsyncStorage.getItem("user")
            setUser(await AsyncStorage.getItem("user"))
            if(u==="demo" || !u)
              {
                setCardHeight(hp("65%"))
              }
              else{
                
                setCardHeight(hp("70%"))
              }
             navigation.setOptions({
                headerRight: () => {
                  return(
                    <>
                    {
                      !u&&
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} 
                    style={{marginRight:30,backgroundColor:"skyblue", padding:10,borderRadius:15,paddingRight:20,paddingLeft:20}} >
                    <Text>Login</Text>
                  </TouchableOpacity>
                    }
                    </>
                  )
                }
              
              })
              
            
          });
          return unsubscribe;
    },[navigation])

    
 // fetch party List
    useEffect(()=>{
      const getList=async()=>{
        const URL =  `http://www.softsauda.com/party/getloginparties`
     
         Axios.get(URL)
        .then(response => {
              setParty(response.data.party_login)
              var array=[]
              var newArray=[]
              response.data.party_login.map((party,i)=>{
               if(party.product_details.length==0)
               {
               array.push([{partyname:party.party_name,partyAddress:party.address1,email:party.contact_group[0].email_id,mobile:party.contact_group[0].mobile_no}])
               }
               else{
                party.product_details.map((p,index)=>{
                  if(index==0)
                  {
                  array.push([
                    {partyname:party.party_name,partyAddress:party.address1,city:party.city,
                    state:party.state,productname:p.productnm,url:p.filepathdata,
                    minrate:p.productrate,maxrate:p.productratemax,productdescription:p.productdesc,
                    quantity:p.productqty,email:party.contact_group[0].email_id,mobile:party.contact_group[0].mobile_no}
                  ])
                }
                else
                {
                  array[i].push( {partyname:party.party_name,partyAddress:party.address1,city:party.city,
                    state:party.state,productname:p.productnm,url:p.filepathdata,
                    minrate:p.productrate,maxrate:p.productratemax,productdescription:p.productdesc,
                    quantity:p.productqty,email:party.contact_group[0].email_id,mobile:party.contact_group[0].mobile_no})
                }
              })
               }
              })
       
               setCaroselItems(array)
               setLoading(false)
            })
      
      }
      getList();
    },[])
  
    const _renderSoftSaudaItem = ({item, index}) => {
   
      return (
        <View >
          <View style={[styles.card,{height:cardHeight,backgroundColor:"skyblue",justifyContent:"center",alignItems:"center"}]}>
          <Image source={item.icon}   reverse  size={wp("2%")} color="white" style={{height:100,width:100,marginBottom:50}}  /> 
          <Text style={{fontSize:18,marginLeft:20,fontWeight:"bold",width:"100%"}}>{item.detail}</Text>
          </View>
          
          </View>
      );
  }
  


   const _renderItem = ({item, index}) => {
      return (
        <>
       <View>
         <View style={[styles.card,{height:cardHeight}]}>
        <Header  imageUri={`http://www.softsauda.com/+${item.url}`} name={item.partyname?item.partyname:""} address={user && user!=="demo"?item.partyAddress:""} contact={user && user!=="demo"?item.mobile:""} email={user && user!=="demo"?item.email:""}
     firmDescription={""} 
     />
    <View style={{ borderBottomColor: 'black',borderBottomWidth: 0.5,
     marginBottom:5,padding:0}}/>

    <Body
     imageUri={`http://www.softsauda.com/+${item.url}`} />
    <Footer
     productName={item.productname?item.productname:""} description={item.productdescription?item.productdescription:""} quantity={item?item.quantity:"".quantity} rate={`₹${item.minrate?item.minrate:""}-₹${item.maxrate?item.maxrate:""}`}/>
      <View style={{ borderBottomColor: 'black',borderBottomWidth: 1,
       marginBottom:5,padding:0,margin:10}}/>
       </View>
          </View>
   
        
        </>
      );
  }
    return (
      
        <ScrollView style={{marginTop:20}}>

          
             <Carousel
              layout={'default'}
              data={softsaudaItems}
              renderItem={_renderSoftSaudaItem}
              sliderWidth={wp("100%")}
              itemWidth={wp("80%")}
            />
 

          
   {
          !loading &&
          <>
{
  carouselItems.map((part,index)=>(
   <Carousel
   layout={'default'}
   data={part}
   renderItem={_renderItem}
   sliderWidth={wp("100%")}
   itemWidth={wp("80%")}
            />
            ))} 
            </>
}

  </ScrollView>
      
 )
}
export default Posts


const styles = StyleSheet.create({
 
  card: {
    width:wp("80%"),
      backgroundColor: "white",
      borderRadius: 15,
      padding: 10,
      elevation: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      padding: 10,
      marginBottom: 100,
      justifyContent:"center"
  }

})


   