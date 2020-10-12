import React from 'react';
import { StyleSheet, Text, View, ListItem, TouchableOpacity, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';

import MyHeader from '../components/MyHeader';

import { RFValue } from "react-native-responsive-fontsize";

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }} >
        <MyHeader title="Home" navigation={this.props.navigation} />

        <TouchableOpacity style={[styles.button, { marginTop: '15%' }]} onPress={() => { this.props.navigation.navigate("MyTasks") }} >
          <Text style={styles.buttonText} >View My Sheduled Tasks</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate("Step1") }} >
          <Text style={styles.buttonText} >Shedule A New Task</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({

  button: {
    width: '40%',
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(10),
    backgroundColor: '#f47b9d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    marginBottom: RFValue(10),
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    alignSelf: 'center'
  },

  buttonText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: RFValue(13),
  },

});

