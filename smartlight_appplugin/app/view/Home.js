import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import LightPanel from './LightPanel';
import { Navbar } from '@bone/bone-mobile-ui';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.body}>
        <Navbar
          titleContent='智能灯'
        />
        <View>
            <LightPanel {...this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#efeef1',
  },
  scrollBody: {
    flex: 1,
  },
});
