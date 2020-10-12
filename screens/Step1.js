import React, { useState } from 'react';
import { StyleSheet, Text, View, ListItem, TouchableOpacity, FlatList, TextInput, Image, Switch, ScrollView, Picker } from 'react-native';

import { Header } from 'react-native-elements';
import { RFValue } from "react-native-responsive-fontsize";
import TimePicker from 'react-native-simple-time-picker';
import SwitchExample from '../components/Switch';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import db from '../config';
import firebase from 'firebase';

export default class Step1 extends React.Component {

    constructor() {
        super();
        this.state = {
            userID: firebase.auth().currentUser.email,
            habitName: '',
            startHours: 0,
            startMinutes: 0,
            endHours: 0,
            endMinutes: 0,
            switch1Value: false,
            startDate: '',
            endDate: '',
            doc: '',
            docId2: '',
            switch2Value: false,
            switch3Value: false,
            Award: ''
        }
    }

    createUniqueID = () => {
        return Math.random().toString(36).substring(7);
    }

    navigate = () => {
        this.props.navigation.navigate('Step2', { 'details': this.state })
    }

    saveDetailsInDatabase = async () => {

        var uniqueID = this.createUniqueID()

        this.setState({
            docId2: uniqueID
        })

        await db.collection('user').where('User_Name', '==', this.state.userID)
            .onSnapshot(data => {
                data.forEach(doc => {
                    this.setState({
                        doc: doc.id
                    })
                    db.collection('user').doc(doc.id).collection('Tasks').doc(uniqueID).set({
                        'HabitName': this.state.habitName,
                        'StartHours': this.state.startHours,
                        'EndHours': this.state.endHours,
                        'StartMinutes': this.state.startMinutes,
                        'EndMinutes': this.state.endMinutes,
                        'ReccurDaily': this.state.switch1Value,
                        'StartDate': this.state.startDate._d,
                        'EndDate': this.state.endDate._d,
                        'Award': this.state.Award,
                        'BlockApps': this.state.switch1Value,
                        'RingAlarm': this.state.switch2Value
                    })
                })
            })

        alert('Your Details Have Been Saved');

        this.navigate()

    }

    toggleSwitch1 = (value) => {
        this.setState({ switch1Value: value })
    }

    toggleSwitch2 = (value) => {
        this.setState({ switch2Value: value })
    }

    toggleSwitch3 = (value) => {
        this.setState({ switch3Value: value })
    }

    render() {
        const { startHours, startMinutes, endHours, endMinutes } = this.state;

        return (
            <ScrollView>
                <View style={{ flex: 1 }} >
                    <Header
                        centerComponent={{ text: 'Stick To Your Plan', style: { color: '#fff', fontSize: 20, fontWeight: "bold", } }}
                        backgroundColor="#00adb5"
                        leftComponent={<TouchableOpacity
                            style={{
                                marginTop: -15
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('Drawer');
                            }}>
                            <Image
                                style={{ width: 40, height: 40, marginLeft: 75, marginTop: 15 }}
                                source={require('../assets/0aaa8cc53d567ee601f198135b653e4f.png')}
                            />
                        </TouchableOpacity>}
                    />

                    <Image
                        style={{ width: 200, height: 220, alignSelf: 'center', marginTop: 30 }}
                        source={require('../assets/image.jpg')}
                    />

                    <TextInput
                        style={styles.loginBox}
                        placeholder="Task Name"
                        placeholderTextColor="#a4ddf2"
                        onChangeText={(e) => {
                            this.setState({
                                habitName: e
                            })
                        }}
                    />


                    <View style={styles.container} >
                        <View style={[styles.subSubContainer, { borderBottomWidth: 2, borderColor: '#d3d3d3' }]} >
                            <Text style={{ fontSize: 20, color: '#a4ddf2' }} >Enter Start Time</Text>
                        </View>
                        <View style={styles.subContainer} >
                            <Text style={{ fontSize: 15, color: '#00adb5' }} >{startHours} hr, {startMinutes} min</Text>
                        </View>
                        <TimePicker
                            startHours={startHours}
                            startMinutes={startMinutes}
                            onChange={(hours, minutes) => this.setState({
                                startHours: hours, startMinutes: minutes
                            })}
                        />
                    </View>

                    <View style={styles.container} >
                        <View style={[styles.subSubContainer, { borderBottomWidth: 2, borderColor: '#d3d3d3' }]} >
                            <Text style={{ fontSize: 20, color: '#a4ddf2' }} >Enter End Time</Text>
                        </View>
                        <View style={styles.subContainer} >
                            <Text style={{ fontSize: 15, color: '#00adb5' }} >{endHours} hr, {endMinutes} min</Text>
                        </View>
                        <TimePicker
                            endHours={endHours}
                            endMinutes={endMinutes}
                            onChange={(hours, minutes) => this.setState({
                                endHours: hours, endMinutes: minutes
                            })}
                        />
                    </View>
                    <View style={{ marginTop: 20, borderRadius: 4, borderColor: '#00adb5', borderWidth: 1.5, width: 380, alignSelf: 'center' }} >
                        <View style={styles.subSubContainer}>
                            <Text style={{ fontSize: 15, color: '#08d4db' }}>Do you want to repeat this timetable everyday?</Text>
                        </View>
                        <View style={{ marginTop: 10 }} >
                            <SwitchExample
                                toggleSwitch1={this.toggleSwitch1}
                                switch1Value={this.state.switch1Value}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 20, borderRadius: 4, borderColor: '#00adb5', borderWidth: 1.5, width: 380, alignSelf: 'center' }} >
                        <View style={styles.subSubContainer}>
                            <Text style={{ fontSize: 15, color: '#08d4db', textAlign: 'center' }}>Do you want us to Block apps when your Task Starts?</Text>
                        </View>
                        <View style={{ marginTop: 10 }} >
                            <SwitchExample
                                toggleSwitch1={this.toggleSwitch2}
                                switch1Value={this.state.switch2Value}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20, borderRadius: 4, borderColor: '#00adb5', borderWidth: 1.5, width: 380, alignSelf: 'center' }} >
                        <View style={styles.subSubContainer}>
                            <Text style={{ fontSize: 15, color: '#08d4db', textAlign: 'center' }}>Do you want us to ring Alarm when your Taks starts?</Text>
                        </View>
                        <View style={{ marginTop: 10 }} >
                            <SwitchExample
                                toggleSwitch1={this.toggleSwitch3}
                                switch1Value={this.state.switch3Value}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20, borderRadius: 4, borderColor: '#00adb5', borderWidth: 1.5, width: 380, alignSelf: 'center' }} >
                        <Text style={{ fontSize: 15, color: '#08d4db', textAlign: 'center', marginTop: 5 }}>Choose a Reward for completion of your Task</Text>
                        <Picker
                            selectedValue={this.state.Award}
                            onValueChange={(i) => { this.setState({ Award: i }) }}
                            placeHolder={"Choose A Award"}
                            style={styles.picker}
                        >
                            <Picker.Item label="A new Book" value={"NewBook"} />
                            <Picker.Item label="Extra Play Time" value={"ExtraPlayTime"} />
                            <Picker.Item label="See a Movie" value={"SeeAMovie"} />
                            <Picker.Item label="Special Lunch" value={"SpecialLunch"} />
                            <Picker.Item label="Nothing" value={"Nothing"} />
                        </Picker>
                    </View>
                    <View style={{ marginTop: 15, borderRadius: 4, borderColor: '#00adb5', borderWidth: 1.5, alignSelf: 'center', width: 320, marginBottom: 15 }} >
                        <View style={[styles.subContainer, { borderBottomWidth: 2, borderColor: '#d3d3d3' }]} >
                            <Text style={{ fontSize: 20, color: '#a4ddf2' }} >Enter Dates</Text>
                        </View>
                        <DateRangePicker
                            startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                            startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                            endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                            endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                            onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                            focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        />
                    </View>
                    {
                        this.state.endDate ? <TouchableOpacity style={styles.modalButton} onPress={() => {
                            this.saveDetailsInDatabase()

                        }} >
                            <Text style={{ color: 'white', fontSize: 15 }} >Save and go to next Step</Text>
                        </TouchableOpacity> : null
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        width: 320,
        height: 40,
        borderWidth: 1.5,
        borderRadius: 4,
        borderColor: '#00adb5',
        fontSize: 20,
        marginTop: 10,
        paddingLeft: 10,
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 5
    },
    button: {
        width: 400,
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
    subContainer: {
        flex: 1,
        fontSize: 20,
        width: 320,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subSubContainer: {
        flex: 1,
        fontSize: 20,
        width: 380,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        marginTop: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: '#00adb5',
        width: 380,
        alignSelf: 'center',
        borderRadius: 4,
    },
    loginBox: {
        width: 380,
        height: 40,
        borderWidth: 1.5,
        borderRadius: 4,
        borderColor: '#00adb5',
        fontSize: 20,
        marginTop: 20,
        paddingLeft: 10,
        alignSelf: 'center',
        textAlign: 'center'
    },
    modalButton: {
        width: 350,
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
})

