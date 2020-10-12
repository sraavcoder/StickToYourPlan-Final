import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Card } from 'react-native-elements';

import firebase from 'firebase';
import db from '../config';

export default class TaskDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: firebase.auth().currentUser.email,
            Award: this.props.navigation.getParam("details")["Award"],
            BlockApps: this.props.navigation.getParam("details")["BlockApps"],
            EndHours: this.props.navigation.getParam("details")["EndHours"],
            EndMinutes: this.props.navigation.getParam("details")["EndMinutes"],
            HabitName: this.props.navigation.getParam("details")["HabitName"],
            ReccurDaily: this.props.navigation.getParam("details")["ReccurDaily"],
            RingAlarm: this.props.navigation.getParam("details")["RingAlarm"],
            StartHours: this.props.navigation.getParam("details")["StartHours"],
            StartMinutes: this.props.navigation.getParam("details")["StartMinutes"],
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container} >
                    <View>
                        <Card
                            title={"Details Of Your Task"}
                            titleStyle={{ fontSize: 20, }}
                        >
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>Habit Name : {this.state.HabitName}</Text>
                            </Card>
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>Start Time: {this.state.StartHours} Hr and {this.state.StartMinutes} Min</Text>
                            </Card>
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>End Time: {this.state.EndHours} Hr and {this.state.EndMinutes} Min</Text>
                            </Card>
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>Reccur the Task Everyday? : {this.state.ReccurDaily ? 'Yes' : 'No'}</Text>
                            </Card>
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>Ring Alarm When Task Start's : {this.state.RingAlarm ? 'Yes' : 'No'}</Text>
                            </Card>
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>Block Apps When Task Starts  : {this.state.BlockApps ? 'Yes' : 'No'}</Text>
                            </Card>
                            <Card>
                                <Text style={{ fontWeight: 'bold' }}>Reward You Want For Completion of Task : {this.state.Award}</Text>
                            </Card>

                        </Card>

                    </View>
                    <View style={styles.buttonContainer} >
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate("MyTasks");
                        }} style={styles.button} >
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, },
    buttonContainer: { flex: 0.3, justifyContent: 'center', alignItems: 'center' },
    button: { width: 200, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'orange', shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, elevation: 16, shadowOpacity: 0.44, shadowRadius: 10.32, elevation: 16, }
})