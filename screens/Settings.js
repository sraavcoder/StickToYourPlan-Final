import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import MyHeader from '../components/MyHeader';
import db from '../config';
import firebase from 'firebase';

export default class SettingScreen extends Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            firstName: '',
            lastName: '',
            MonitoringName: '',
            MonitoringContact: '',
            MonitoringEmail: '',
            docId: '',
        }
    }

    getUserDetails = () => {
        var email = firebase.auth().currentUser.email;
        db.collection('user').where('User_Name', '==', email).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    var data = doc.data()
                    this.setState({
                        emailId: data.User_Name,
                        firstName: data.First_Name,
                        lastName: data.Last_Name,
                        MonitoringName: data.MonitoringPersonName,
                        MonitoringContact: data.MonitoringPersonContact,
                        MonitoringEmail: data.MonitoringPersonEmailID,
                        docId: doc.id
                    })

                });
            })
    }

    updateUserDetails = () => {
        db.collection('user').doc(this.state.docId)
            .update({
                'First_Name': this.state.firstName,
                'Last_Name': this.state.lastName,
                'User_Name': this.state.emailId,
                'MonitoringPersonName': this.state.MonitoringName,
                'MonitoringPersonContact': this.state.MonitoringContact,
                'MonitoringPersonEmailID': this.state.MonitoringEmail,
            })

        alert("Profile Updated Successfully")

    }

    componentDidMount() {
        this.getUserDetails()
    }


    render() {

        return (
            <View>
                <MyHeader title="Settings" navigation={this.props.navigation} />
                <View style={styles.container} >

                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"First Name"}
                            maxLength={8}
                            onChangeText={(text) => {
                                this.setState({
                                    firstName: text
                                })
                            }}
                            value={this.state.firstName}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"Last Name"}
                            maxLength={8}
                            onChangeText={(text) => {
                                this.setState({
                                    lastName: text
                                })
                            }}
                            value={this.state.lastName}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"Monitoring Persons Name"}
                            maxLength={10}
                            onChangeText={(text) => {
                                this.setState({
                                    MonitoringName: text
                                })
                            }}
                            value={this.state.MonitoringName}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"Monitoring Persons Email"}
                            onChangeText={(text) => {
                                this.setState({
                                    MonitoringEmail: text
                                })
                            }}
                            value={this.state.MonitoringEmail}
                        />
                        <TextInput
                            style={styles.formTextInput}
                            placeholder={"Monitoring Persons Contact"}
                            onChangeText={(text) => {
                                this.setState({
                                    MonitoringContact: text
                                })
                            }}
                            value={this.state.MonitoringContact}
                        />
                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                this.updateUserDetails()
                            }}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center'
    },
    formTextInput: {
        width: "75%",
        height: 40,
        alignSelf: 'center',
        borderColor: '#00adb5',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 20,
        padding: 10,
    },
    button: {
        width: "75%",
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#00adb5",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: 20
    },
    buttonText: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff"
    }
})