
import React from "react";
import { View, Text,Button } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './LoginScreen.js';
import DaftarBarangScreen from './DaftarBarangScreen.js';
import PenjualanScreen from './PenjualanScreen.js';
import LaporanScreen from './LaporanScreen.js';
import MenuScreen from './MenuScreen.js';
import TambahBeliScreen from './TambahBeliScreen.js';
import QRCode from './QRCode.js';

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Barang: DaftarBarangScreen,
    Penjualan: PenjualanScreen,
    Laporan: LaporanScreen,
    Menu: MenuScreen,
    TambahBeli: TambahBeliScreen,
    QRc:QRCode
  },
  {
      initialRouteName: "Login"
  }
);

export default createAppContainer(AppNavigator);
