  
import React,{useEffect}from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { View, Text ,Button} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import ProfilePicture from '../../ProfilePictures/index';
import styles from './styles';

const Header = ({imageUri, name,firmDescription,address,contact,email}) =>
  

(
  <>
  <View style={styles.container}>
    <View style={styles.left}>
      <ProfilePicture uri={imageUri} size={40} />
      <Text style={[styles.name,{ width: 120}]}>{name}</Text>
    </View>
    <View style={styles.right}>
      <Button title="Contact Us"></Button>
    </View>
    
  </View>

<View style={[{flex:1}]}>
<View style={[styles.left,{marginLeft:15}]}>
  <Text style={[styles.name,{marginLeft:0}]}>{firmDescription}</Text>
</View>
</View>
{
   address?
  <>
<View style={styles.container}>
    <View style={[styles.left,{marginLeft:15}]}>
      <Text style={styles.name}>{address}</Text>
    </View>
  </View>


  <View style={styles.container}>
    <View  style={[styles.left,{marginLeft:15,width:200}]}>
      <Text style={styles.name}>{email}</Text>
    </View>
    <View style={[styles.right,{marginRight:0}]}>
    <Text style={[styles.name]}>({contact})</Text>
    </View>
    
  </View>
  </>:<></>
  }
</>
)

export default Header;