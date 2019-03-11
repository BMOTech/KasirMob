
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight,FlatList, TextInput} from 'react-native';

const Footer = (props) => {
  return (
    <View style={styles.vFooter}>
      <Text style={styles.txtFooter}>@2019 Rey1024</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  vFooter:
  {
    //flex:1,
    height:50,
    borderColor:'gray',
    borderWidth:1,
    backgroundColor:'#FFF3E0',
    alignItems:'center',
    justifyContent:'center'
  },
  txtFooter:
  {
    fontWeight: "bold",
    color:'black',
  },
});
export default Footer;
