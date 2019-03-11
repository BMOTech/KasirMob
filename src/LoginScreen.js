

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button, Image, TouchableHighlight, Alert} from 'react-native';
import { WebView } from "react-native-webview";

import MenuScreen from './MenuScreen.js';
import Footer from './comp/Footer';
import Header from './comp/Header';
type Props = {};
export default class LoginScreen extends Component<Props> {

  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      username:'',
      password:''
    };
  }
  static navigationOptions = {
    header: null
  }
  render() {
    if (this.state.isLogin)
    return(
      <View style={styles.vMain}>
        <Header judul="Menu KasirMob" />


      <View style={{
          flex:3,
          //justifyContent:'center' ,
        //  alignItems:'center',
          backgroundColor: '#FFCC80'
      }}>
          <WebView
             source={{ uri: "http://mhs.rey1024.com/apiKasir/chartPenjualan.php?dt="+(new Date()).getTime() }}
             style={{marginTop: 20}}
           />
      </View>



        <View style={{
            flex:5,
            justifyContent:'flex-start' ,
            //backgroundColor:'yellow'
            //alignItems:'center'
        }}>
            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Penjualan')}
                >
                <View style={styles.VMenuItem}>
                <Text style={styles.txtMenu}>Penjualan</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('Barang')}
                >
                <View style={styles.VMenuItem}>
                <Text style={styles.txtMenu}>Barang</Text>
                </View>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Laporan')}
              >
              <View style={styles.VMenuItem}>
              <Text style={styles.txtMenu}>Laporan</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight
              >
              <View style={styles.VMenuItem}>
              <Text style={styles.txtMenu}>Tentang Kami</Text>
              </View>
            </TouchableHighlight>

        </View>




        <Footer />

      </View>
    );

    else

    return (
      <View style={styles.vMain} >
      <View style={styles.vTop}>
        <Text style={styles.txtHeader1}>KasirMob </Text>
        <Text style={{
          fontSize:16,
          color:"#1A237E"
        }}>transaksi dimanapun dan kapanpun</Text>
          <Image
            style={styles.gambar}
            source={require("../assets/logokasir.png")}
            resizeMode = "stretch"
          />
      </View>

      <View style={styles.vInput}>
        <View style={styles.vItemInput}>
          <Text style={styles.txtLabelInput}>Username</Text>
            <TextInput style={styles.txtInput}
              onChangeText={
                (username)=>this.setState({username})
              }
            />
        </View>

        <View style={styles.vItemInput}>
          <Text style={styles.txtLabelInput}>Password</Text>
          <TextInput style={styles.txtInput}
           secureTextEntry={true}
          onChangeText={
            (password)=>this.setState({password})
          }
          />
      </View>

      <View style={styles.vItemButton}>
      <Button
      color="#FFA726"
      onPress={() => {
        if(this.state.username=='kasir' && this.state.password=='123'){
          this.setState({ isLogin: true });
        } else {

          Alert.alert(
              'Username atau Password Salah',
              'Pastikan memasukkan username dan password yang benar',
              [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
                {text: 'Reset Password', onPress: () => console.log('OK Pressed')}
              ],
              {cancelable: false},
            );
        }
      }
    }
    title="Login"
    accessibilityLabel="Login"
    />
    </View>
    </View>

    <View style={{
        flex:1
    }}>
    </View>

<Footer />
    </View>
  );
}
}

const styles = StyleSheet.create({
  vMain: {
    flex:1,
  //  backgroundColor:'#E3F2FD',
  },
  gambar:{
    marginTop:20,
    height:150,
    width: 150
  },

  txtHeader1: {
    color:'#000',
    fontWeight: "bold",
    fontSize:30
  },
  vInput: {
    flex:4,
  //          backgroundColor:'cyan',
    justifyContent:'flex-start',
  //   alignItems:'flex-start'
  },
  vItemInput: {
    flex:1,
    flexDirection:'row',
    marginLeft:50,
    marginRight:50,
    justifyContent:'flex-start',
    alignItems:'center',
  //  borderColor:'black',
//     borderWidth:1,
  //     backgroundColor:'yellow',

  },
  vItemButton: {
    flex:2,
    marginLeft:50,
    marginRight:50
  },
  txtLabelInput: {
    flex:2,
    height: 35
  },
  txtInput: {
    flex:3,
    height: 35,
    backgroundColor:'#fff',
    borderColor: 'gray',
    borderWidth: 1
  },
  vTop: {
    flex:4,
    alignItems:'center',
    justifyContent:'center'

  },

  vFooter:
  {
    //flex:1,
    height:50,
    borderColor:'gray',
    borderWidth:1,
    backgroundColor:'#FFB74D',
    alignItems:'center',
    justifyContent:'center'
  },
  txtFooter:
  {
    fontWeight: "bold",
    color:'black',
  },
  VMenuItem:{
    backgroundColor:'#FF9800',
    height:60,
    margin: 10,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5

  },
  txtMenu: {
    fontSize:20,
    color:'#000'
  }

});
