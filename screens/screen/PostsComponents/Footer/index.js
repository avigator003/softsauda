import React, { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import ADIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import FAIcon from 'react-native-vector-icons/FontAwesome';

import styles from "./styles";

const Footer = ({productName,rate,description,quantity}) => {


  return (
    <View style={styles.container}>

<View style={[styles.iconsContainer,{justifyContent:"center"}]}>
<Text style={{fontWeight:"bold",textDecorationLine:"underline",fontSize:15}}>{productName}</Text>
     
     </View>
      <View style={styles.iconsContainer}>
        <Text >Rate:{rate}</Text>
        <Text>Qty: {quantity}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <View style={[styles.leftIcons,{width:"100%"}]}>
          <Text>{description}</Text>
        </View>
      </View>

      
    </View>
  )
}

export default Footer;