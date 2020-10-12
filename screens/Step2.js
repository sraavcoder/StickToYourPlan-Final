import React from 'react';
import { StyleSheet, Text, View, ListItem, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import { Card, Header } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';

export default class Step2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: firebase.auth().currentUser.email,
            habitName: this.props.navigation.getParam("details")["habitName"],
            startHours: this.props.navigation.getParam("details")["startHours"],
            startMinutes: this.props.navigation.getParam("details")["startMinutes"],
            endHours: this.props.navigation.getParam("details")["endHours"],
            endMinutes: this.props.navigation.getParam("details")["endMinutes"],
            switch1Value: this.props.navigation.getParam("details")["switch1Value"],
            switch2Value: this.props.navigation.getParam("details")["switch2Value"],
            switch3Value: this.props.navigation.getParam("details")["switch3Value"],
            Award: this.props.navigation.getParam("details")["Award"],
        }
    }

    getDocID = async () => {

        await db.collection('user').where('User_Name', '==', this.state.userID)
            .onSnapshot(data => {
                data.forEach(doc => {
                    this.setState({
                        docId: doc.id
                    })
                })
            })
    }

    async componentDidMount() {
        this.getDocID()
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container} >
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
                    <Card
                        title={"Details Of Your Task"}
                        titleStyle={{ fontSize: 20, }}
                    >
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Habit Name : {this.state.habitName}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Start Time: {this.state.startHours} Hr and {this.state.startMinutes} Min</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>End Time: {this.state.endHours} Hr and {this.state.endMinutes} Min</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Reccur the Task Everyday? : {this.state.switch1Value ? 'Yes' : 'No'}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Ring Alarm When Task Start's : {this.state.switch2Value ? 'Yes' : 'No'}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Block Apps When Task Starts  : {this.state.switch3Value ? 'Yes' : 'No'}</Text>
                        </Card>
                        <Card>
                            <Text style={{ fontWeight: 'bold' }}>Reward You Want For Completion of Task : {this.state.Award}</Text>
                        </Card>

                    </Card>

                    <View>
                        <TouchableOpacity style={styles.modalButton} onPress={() => {
                            alert('Congratulations You Have Sheduled Task')
                            this.props.navigation.navigate("Drawer")
                        }} >
                            <Text style={{ color: 'white', fontSize: 15 }} >Send it to Monitoring Person and Save Task</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}


const styles = StyleSheet.create({
    subContainer: {
        flex: 1,
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: { flex: 1, },
    modalButton: {
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
})

