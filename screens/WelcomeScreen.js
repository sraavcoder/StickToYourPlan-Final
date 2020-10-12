import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  KeyboardAvoidingView
} from 'react-native';
import db from '../config';
import firebase from 'firebase';

import { RFValue } from "react-native-responsive-fontsize";

import { Input, Header } from 'react-native-elements';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      emailId: '',
      password: '',
      firstName: '',
      lastName: '',
      MonitoringPersonName: '',
      MonitoringPersonContact: '',
      MonitoringPersonEmailID: '',
      isModalVisible: false,
      docId: '',
    };
  }

  userLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate("Drawer")
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });
  };

  userSignUp = async (emailId, password) => {

    firebase
      .auth()
      .createUserWithEmailAndPassword(emailId, password)
      .then((response) => {
        return (
          alert('User Added Successfully')
        );

      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return alert(errorMessage);
      });



    db.collection("user").add({
      'First_Name': this.state.firstName,
      'Last_Name': this.state.lastName,
      'User_Name': this.state.emailId,
      'MonitoringPersonName': this.state.MonitoringPersonName,
      'MonitoringPersonContact': this.state.MonitoringPersonContact,
      'MonitoringPersonEmailID': this.state.MonitoringPersonEmailID,
    })



  };

  openModal = () => {
    return (
      <Modal
        animationType="slide"
        visible={this.state.isModalVisible}
      >
        <View  >
          <ScrollView style={{ width: "100%" }} >
            <KeyboardAvoidingView>
              <Text style={{ alignSelf: 'center', fontSize: 30, marginBottom: 10 }} >Register Your Account</Text>
              <TextInput placeholder={"First Name"} maxLength={8} onChangeText={(e) => { this.setState({ firstName: e }) }} style={styles.modalBox} />
              <TextInput placeholder={"Last Name"} maxLength={8} onChangeText={(e) => { this.setState({ lastName: e }) }} style={styles.modalBox} />
              <TextInput placeholder={"Monitoring Persons Name"} onChangeText={(e) => { this.setState({ MonitoringPersonName: e }) }} style={styles.modalBox} />
              <TextInput
                style={styles.modalBox}
                placeholder={"Monitoring Persons Contact"}
                keyboardType={"numeric"}
                maxLength={10}
                onChangeText={(text) => {
                  this.setState({
                    MonitoringPersonContact: text
                  })
                }}
              />
              <TextInput placeholder={"Monitoring Persons Email ID"} keyboardType={"email-address"} onChangeText={(e) => { this.setState({ MonitoringPersonEmailID: e }) }} style={styles.modalBox} />
              <View>
                <TouchableOpacity onPress={() => { this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword) }} style={styles.modalButton} >
                  <Text style={{ color: 'white' }} >Register</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    isModalVisible: false,
                  })
                }} style={styles.modalButton} >
                  <Text style={{ color: 'white' }} >Cancel</Text>
                </TouchableOpacity>
              </View>

            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  }


  render() {


    return (

      <View style={styles.container}>
        <ScrollView>
          <Header
            centerComponent={{ text: 'Stick To Your Plan', style: { color: '#fff', fontSize: 20, fontWeight: "bold", } }}
            backgroundColor="#00adb5"
          />

          <View style={{ justifyContent: 'center', alignItems: 'center' }} >
            {this.openModal()}
          </View>

          <Image
            style={{ width: 300, height: 320, alignSelf: 'center' }}
            source={require('../assets/Plan.png')}
          />

          <View style={styles.buttonContainer}>
            <TextInput
              style={styles.loginBox}
              placeholder="Enter Your Registered E-mail"
              placeholderTextColor="#a4ddf2"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({
                  emailId: text,
                });
              }}
            />

            <TextInput
              style={styles.loginBox}
              secureTextEntry={true}
              placeholder="Enter Your Password"
              placeholderTextColor="#a4ddf2"
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
            />
            <TouchableOpacity
              style={[styles.button, { marginTop: 20, marginBottom: 15 }]}
              onPress={() => {
                this.userLogin(this.state.emailId, this.state.password);
              }}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { marginBottom: 15 }]}
              onPress={() => {
                this.setState({
                  isModalVisible: true,
                })
              }}>
              <Text style={styles.buttonText}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginBox: {
    width: 300,
    height: 40,
    borderBottomWidth: 1.5,
    borderColor: '#00adb5',
    fontSize: 20,
    margin: 10,
    paddingLeft: 10,
  },
  modalBox: {
    width: 320,
    height: 30,
    borderBottomWidth: 1.5,
    borderColor: '#00adb5',
    fontSize: 20,
    marginTop: 20,
    paddingLeft: 10,
  },
  button: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#f47b9d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  modalButton: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#00adb5',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    alignSelf: 'center',
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: 20,
    marginBottom: 30,
  },
  button2: {
    width: 300,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#f47b9d',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    marginBottom: 20,
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: '#ffff',
    fontWidth: 'bold',
    fontSize: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
