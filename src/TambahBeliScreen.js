

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button,TouchableHighlight, Alert } from 'react-native';
import axios from 'axios';
import Header from './comp/Header';
import Footer from './comp/Footer';

type Props = {};
export default class TambahBeliScreen extends Component<Props> {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      penjualan_id:0,
      barang_id:'',
      ada:0,
      nama_barang:'',
      jumlah_beli:0
    };
  }
  componentDidMount(){
    const { navigation } = this.props;
    var penjualan_id = navigation.getParam('penjualan_id',0);
    var barang_id_qr = navigation.getParam('barang_id',0);

    console.log("barang id dari qr "+barang_id_qr);
    console.log("Penjualan ID "+penjualan_id);
    this.setState({penjualan_id});

    this.willFocusSubscription = this.props.navigation.addListener(
       'willFocus',
       () => {
         const { navigation } = this.props;
         var barang_id_qr = navigation.getParam('barang_id',0);

         if (barang_id_qr!=0) {

           console.log(barang_id_qr);
           this.setState({barang_id:barang_id_qr}, function(){ //state kadang2 tidak langsung update
             console.log("state barang id "+this.state.barang_id);
             this.cekBarang();
           });

         }

         }
    );
  }

  simpanPenjualan() {
    axios.post('http://mhs.rey1024.com/apiKasir/postPenjualanDetail.php', {
      penjualan_id: this.state.penjualan_id,
      barang_id: this.state.barang_id,
      jumlah: this.state.jumlah_beli
    })
    .then((response) => {
        console.log("Pembelian Tersimpan"+response);
        this.props.navigation.navigate("Penjualan");
      }
    )
    .catch(function (error) {
      console.log(error);
    });
  }

  cekBarang ()  {

    //var barang_id=this.state.barang_id;
  var barang_id=this.state.barang_id;
    console.log("cek Barang "+barang_id);

    axios.get(`http://mhs.rey1024.com/apiKasir/cekBarang.php?barang_id=`+barang_id)
   .then((response)=>{
    console.log(response.data);

    var ada= response.data.ada;
        console.log(ada);
        console.log(response.data.barang);
    this.setState({ada:ada});
    if (ada==1)
      this.setState({ nama_barang:response.data.barang[0].barang_nama });
      this.setState({ barang_id:response.data.barang[0].barang_id });
  })
}


  render() {

    return (
        <View style={styles.vMain} >
          <Header judul={"Item Penjualan "+this.state.penjualan_id} />

          <View style={styles.vInput}>
            <View style={styles.vItemInput}>
              <Text style={styles.txtLabelInput}>Kode Barang</Text>
              <TextInput style={styles.txtInput}
              value={this.state.barang_id+""}
              onChangeText={
                (barang_id)=>this.setState({barang_id})
              }
              />

              <TouchableHighlight
                onPress={()=> {

                    this.setState({
                      barang_id:0,
                      nama_barang:'',
                      ada:0,
                      jumlah_beli:0

                    });
                    this.props.navigation.navigate("QRc")
                  }


                   }
                >
                <View style={{
                  height:40,
                  marginLeft:5,
                  justifyContent:'center',
                  alignItems: 'center',
                  paddingLeft:10,
                  paddingRight:10,
                  backgroundColor:'#FFA726',
                  borderRadius:5
                }}>
                  <Text style={{fontSize:16}}>Q R</Text>
                </View>
              </TouchableHighlight>




            </View>

            <View>
            <TouchableHighlight
              onPress={ () =>
                  this.cekBarang()
               }
              >
              <View style={{
                height:40,
                marginLeft:5,
                paddingLeft:10,
                paddingRight:10,
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor:'#FFA726',
                borderRadius:5
              }}>
                <Text>CEK KODE BARANG</Text>
              </View>
            </TouchableHighlight>


            </View>
            <View style={styles.vItemInput}>
              <Text style={styles.txtLabelInput}>Nama Barang</Text>
                <Text style={styles.txtLabelInput}>{this.state.nama_barang}</Text>

            </View>
            <View style={styles.vItemInput}>
              <Text style={styles.txtLabelInput}>Jumlah Beli</Text>
              <TextInput style={styles.txtInput}
                  keyboardType = 'numeric'
                  onChangeText={
                    (jumlah_beli)=>this.setState({jumlah_beli})
                  }
              />
            </View>

            <View style={styles.vItemButton}>
              <Button
                color="green"
                onPress={ () => {
                  console.log("Ada:"+this.state.ada);
                  if (this.state.ada==1 && this.state.jumlah_beli>0) {
                    this.simpanPenjualan();
                    this.setState({ada:0});
                  }
                  else {
                    Alert.alert(
                        'Data tidak dapat disimpan',
                        'Pastikan kode barang dan jumlah beli benar!',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                  }
                }}
                title="Simpan"
                accessibilityLabel="Simpan"
              />
            </View>
          </View>

          <View style={styles.vHasil}>



          </View>
          <Footer />
        </View>
    );
  }
  }

  const styles = StyleSheet.create({
  vMain: {
    flex:1
  },
  vHeader: {
    flex:2,
    backgroundColor:'#0D47A1',
    alignItems:'center',
    justifyContent:'center'
  },
   txtHeader1: {
     color:'#fff',
     fontSize:20
   },
   txtHeader2: {
     color:'#E3F2FD',
     fontSize:16
   },
   vInput: {
     flex:3,
     backgroundColor:'#E3F2FD',
     justifyContent:'flex-start'
   },
   vItemInput: {
     flex:1,
     flexDirection:'row',
     margin:10
   },
   vItemButton: {
     flex:2,
     margin:10
   },
   txtLabelInput: {
     flex:2,
     height: 40
   },
   txtInput: {
     flex:3,
     height: 40,
     backgroundColor:'#fff',
     borderColor: 'gray',
     borderWidth: 1
  },
  vHasil: {
    flex:2,
    flexDirection:'row'
  },
  vItemHasil: {
    flex:1,
    flexDirection:'column',
    margin:10,
    backgroundColor:'#fff',
    borderColor: 'gray',
    borderWidth: 1
  },
  vTxtLabelHasil:
  {
    flex:1,
    backgroundColor:'#1565C0',
    alignItems:'center',
    justifyContent:'center'
  },
  txtLabelHasil:
  {
    color:'#ffff',
    fontSize:20
  },
  vTxtHasil:
  {
    flex:5,
    backgroundColor:'#ffff',
    alignItems:'center',
    justifyContent:'center'
  },
  txtHasil:
  {
    fontSize:60
  },
  vFooter:
  {
    flex:1,
    borderColor:'gray',
    borderWidth:1,
    backgroundColor:'#42A5F5',
    alignItems:'center',
    justifyContent:'center'
  },
  txtFooter:
  {
    fontWeight: "bold"
  }

  });
