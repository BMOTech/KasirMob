'use strict';

import React, { Component } from 'react';

import { StyleSheet, Text, Alert, View, Button
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

export default class QRCode extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      dataqr: '',
      status: 'Ready'
    };
  }


  onSuccess(e) {
    console.log(e);
    this.setState({
      dataqr:this.state.dataqr+', '+e.data,
      status: 'Coba Lagi'
    })
/* Alert.alert(
      'QR Code',
      'Code : '+e.data,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false }
    )
*/

  this.props.navigation.navigate("TambahBeli", {
          barang_id:e.data
      });


  }

  render() {
    return (

          <View style={styles.conMain}>
                <QRCodeScanner
                  onRead={this.onSuccess.bind(this)}
                  reactivate={true}
                  showMarker={true}


                />
            </View>

    );


  }
}

const styles = StyleSheet.create({
  conMain : {
    flex:1
  },
  conHeader : {
    flex:1,
    backgroundColor: '#6200EE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textHeader : {
    fontSize: 18,
    color :'white'
  },
  conQR : {
    flex:1
  },
  centerText: {
    fontSize: 12,
    color: '#777',
  }
});
