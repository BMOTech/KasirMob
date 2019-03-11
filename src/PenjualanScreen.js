

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight,FlatList, TextInput, Alert} from 'react-native';
import axios from 'axios';
import Header from './comp/Header';
import Footer from './comp/Footer';
type Props = {};
export default class PenjualanScreen extends Component<Props> {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = {
      penjualan_id:0,
      kasir_id:0,
      dataPenjualan:[],
      totalBelanja:0,
      uang_bayar:0,
      kembalian:0,
      status_transaksi:0,
    };
  }

  hitungKembalian () {
    if (this.state.uang_bayar< this.state.totalBelanja) {
      Alert.alert(
          'Uang yang dibayarkan kurang',
          'Pastikan jumlah uang anda cukup',
          [
            {text: 'Masukkan ulang', onPress: () => console.log('OK Pressed')},
            {text: 'Batalkan Transaksi', onPress: () =>this.simpanPenjualan(-1)



          },
          ],
          {cancelable: false},
        );

    } else
     this.setState({kembalian:(this.state.uang_bayar-this.state.totalBelanja)})
  }

  getDetailPenjualan  ()   {
    //let _this = this;
    //this.setState({penjualan_id:403});
    console.log("getDetailPenjualan");
    console.log("http://mhs.rey1024.com/apiKasir/getDetailPenjualan.php?penjualan_id="+this.state.penjualan_id+"&dt="+(new Date()).getTime());
    axios.get("http://mhs.rey1024.com/apiKasir/getDetailPenjualan.php?penjualan_id="+this.state.penjualan_id+"&dt="+(new Date()).getTime())
    .then((response)=>{
      console.log(response.data);
      this.setState({ dataPenjualan:response.data });
      var total=0;
      for (var i=0; i<response.data.length;i++){
        console.log("Total "+response.data[i].total);
        total+= parseInt(response.data[i].total);
      }
      console.log(total);
      this.setState({totalBelanja:total});


    });

  }
  componentDidMount() {
      console.log("Komponen did Mount");
      axios.post('http://mhs.rey1024.com/apiKasir/postPenjualan.php', {
        kasir_id: '11'
      })
      .then((response) => {
          console.log(response.data.penjualan_id);
          this.setState({penjualan_id:response.data.penjualan_id }, function(){
            this.getDetailPenjualan() ;
          });
          this.setState({kasir_id:response.data.kasir_id });
        }
      )
      .catch(function (error) {
        console.log(error);
      });

  // this.getDetailPenjualan() ;

  this.willFocusSubscription = this.props.navigation.addListener(
     'willFocus',
     () => {
        this.getDetailPenjualan() ;
       }
  );

  }

  simpanPenjualan(status) {
    this.setState({status_transaksi:status});
    axios.post("http://mhs.rey1024.com/apiKasir/updateStatusPenjualan.php?dt="+(new Date()).getTime(), {
      penjualan_id: this.state.penjualan_id,
      status_transaksi: status
    })
    .then((response) => {
        console.log("Status update trx  "+response);
          console.log(response);

          if (status==1) {
            Alert.alert(
                'Transaksi berhasil',
                'Apakah ingin melihat nota?',
                [
                  {text: 'kirim ke Wa', onPress: () => console.log('OK Pressed')},
                  {text: 'Tidak', onPress: () =>   this.props.navigation.navigate("Login")}, 
                ],
                {cancelable: false},
              );


          }



      }
    )
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

  //this.setState(penjualan_id);
  console.log(this.props);

    return (
      <View style={styles.vMain}>




          <Header judul={"Penjualan ID: "+this.state.penjualan_id} />

          <View style={{
              flex: 1,
              backgroundColor:'#FFE0B2',
              justifyContent:'center',
              alignItems:'center'

          }}>
            <Text style={styles.txtHeader2}>Tanggal : { (new Date().getDate())+"-"+ (new Date().getMonth()+1)
                + "-"+ (new Date().getFullYear())} | Kasir : Rey </Text>



          </View>
          <View style={{
              flex:4,
              justifyContent:'center',
              borderColor:'grey',
              borderWidth:1,
              margin:10
          }}>


            <FlatList
              data={this.state.dataPenjualan}
              renderItem={({item}) =>
                  <View style={{
                     flexDirection:'row',

                    //     flex:1,
                    //  backgroundColor:'yellow'
                    }}>
                    <View style={{flex:5, borderColor:'#E65100', borderWidth:1, backgroundColor:'#FFF3E0'}}>
                      <Text style={{color:'#000'}}> {item.barang_nama} </Text>
                    </View>
                    <View style={{flex:1, alignItems:'flex-end', borderColor:'#E65100', borderWidth:1, backgroundColor:'#FFF'}}>
                      <Text style={{color:'#000'}}> {item.jumlah} </Text>
                    </View>
                    <View style={{flex:3, alignItems:'flex-end', borderColor:'#E65100', borderWidth:1, backgroundColor:'#FFF3E0'}}>
                      <Text style={{color:'#000'}}> {item.harga} </Text>
                    </View>
                    <View style={{flex:3, alignItems:'flex-end',borderColor:'#E65100', borderWidth:1, backgroundColor:'#FFCC80'}}>
                      <Text style={{color:'#000'}}> {item.total} </Text>
                    </View>

                  </View>



            }


              keyExtractor={(item, index) => index.toString()}
            />

            <View style={{
            //  flex:1,
              height:45,
              alignItems:'center',
              justifyContent:'space-between',
              marginRight:5,
              marginTop:5,
              marginLeft:5,
              flexDirection:'row'
            }}>

            <TouchableHighlight
              onPress={ () => this.props.navigation.navigate('TambahBeli',
              {
                penjualan_id: this.state.penjualan_id
              }

            )}
              >
              <View style={{
              //  height:30,
                width:150,
              //  flex:1,
              //  marginLeft:5,
             marginRight:10,
             height:40,
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor:'#FFA726',
                borderRadius:5
              }}>
                <Text style={{fontSize:16, fontWeight:'bold',  color:"#fff"}}>Tambah Barang</Text>
              </View>
            </TouchableHighlight>



              <Text style={{
                fontSize:20,
                fontWeight:'bold',
                alignItems:'flex-end'
              }}>
                  Total  : {this.state.totalBelanja}
               </Text>
            </View>



          </View>
          <View style={{
            flex:1,
          //  height:20,

            flexDirection:'row',
            //backgroundColor:'yellow',
            justifyContent:'center'


          }}>





          </View>


          <View style={{
              flex:1,
              flexDirection:'row',
              alignItems:'center',
              margin:5
          }}>
            <View style={{width:100, alignItems:'flex-start'}}>
              <Text style={{width:100,fontSize:16,  fontWeight:'bold'}}>Uang Bayar </Text>
            </View>
            <View style={{flex:1}}>
            <TextInput style={styles.txtInput}
              keyboardType = 'numeric'
              onChangeText={
                (uang_bayar)=>this.setState({uang_bayar})
              }
              />
            </View>
            <TouchableHighlight
              onPress={
              () =>  this.hitungKembalian()
              }
              >
              <View style={{
                height:40,
               //width:150,
              //  flex:1,
                marginLeft:5,
                marginRight:5,
                paddingLeft:5,
                paddingRight:5,

              //  marginTop:5,
              //  marginBottom:5,
                justifyContent:'center',
                alignItems: 'center',
                backgroundColor:'#FFA726',
                borderRadius:5
              }}>
                <Text style={{fontSize:14, fontWeight:'bold', color:"#fff"}}>  Kembalian</Text>
              </View>
            </TouchableHighlight>




          </View>

          <View style={{
              flex:1,
              flexDirection:'row',
              alignItems:'center',
              margin:5
          }}>
            <Text style={{width:100,fontSize:16,  fontWeight:'bold'}}>Kembalian  </Text>
            <Text style={{ fontSize:20, fontWeight:'bold', color:'#EF6C00'}}>{this.state.kembalian} </Text>


          </View>

          <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <TouchableHighlight
              onPress={()=>  {
                this.simpanPenjualan(1)
                this.props.navigation.navigate('Penjualan');

              }}
            >
                <View style={{
                  height:60,
                  marginLeft:5,
                  width:200,
                  paddingLeft:10,
                  paddingRight:10,
                  justifyContent:'center',
                  alignItems: 'center',
                  backgroundColor:'green',
                    borderRadius:5
                }}>
                  <Text style={{color:'white', fontSize:20}}>Selesai</Text>
                </View>
          </TouchableHighlight>

          <TouchableHighlight
              onPress={()=>  this.simpanPenjualan(-1)}
            >
                <View style={{
                  height:60,
                  marginLeft:5,
                  paddingLeft:10,
                  paddingRight:10,
                  justifyContent:'center',
                  alignItems: 'center',
                  backgroundColor:'#EF6C00',
                    borderRadius:5
                }}>
                  <Text style={{color:'white', fontSize:20}}>Batal</Text>
                </View>
          </TouchableHighlight>


          </View>

       <Footer />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  vMain: {
    flex:1,
    backgroundColor:'#E3F2FD',
  },
  vList: {
    flex:4
  },
  vInfo: {
    flex:1
  },
  vUangBayar: {
    flex:2
  },





  gambar:{
    marginTop:10,
    height:150,
    width: 150
  },
  vTop: {
    flex:1,
    backgroundColor:'#0D47A1',
    alignItems:'center',
    justifyContent:'center'
  },
  txtHeader1: {
    color:'#000',
    fontWeight: "bold",
    fontSize:20
  },
  txtHeader2: {
    color:'#000',
    fontWeight: "bold",
    fontSize:15
  },
  vInput: {
    flex:3,

    justifyContent:'flex-start'
  },
  vItemInput: {
    flex:1,
    flexDirection:'row',
    margin:5
  },
  vItemButton: {
    flex:2,
    margin:10
  },
  txtLabelInput: {
    flex:2,
    height: 30
  },
  txtInput: {
    height: 40,
    backgroundColor:'#fff',
    borderColor: 'gray',
    borderWidth: 1
  },
  vTop: {
    flex:5,
    alignItems:'center',
    justifyContent:'center'

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
  },
  VMenuItem:{
    backgroundColor:'#42A5F5',
    height:50,
    margin: 20,
    alignItems:'center',
    justifyContent:'center'

  }

});
