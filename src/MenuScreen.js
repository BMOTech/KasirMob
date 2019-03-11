
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

type Props = {};
export default class MenuScreen extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
          <Text> Menu </Text>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Penjualan')}
            >
            <View>
              <Text>Penjualan</Text>
            </View>
          </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
