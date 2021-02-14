import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width-400,
    height: Dimensions.get('window').width-200,
    marginLeft:15
  }
})

export default styles;