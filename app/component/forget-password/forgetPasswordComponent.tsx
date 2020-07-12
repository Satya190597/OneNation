import React from 'react'
import { Button,StyleSheet, Text, View, TouchableOpacity,Alert } from 'react-native';
import Firebase, {db}from '../../../config/firebase'
import { TextInput } from 'react-native-gesture-handler';

export default class ForgetPassword extends React.Component {

    constructor(props) {
        super(props)
    }
    state = {
        email: ''
    }

    static navigationOptions = {
        title: 'Get Reset Link',
        headerTintColor: '#ffffff',
        headerStyle: {
          backgroundColor: '#D35400',
          borderBottomColor: '#D35400',
          borderBottomWidth: 3,
        },
        headerTitleStyle: {
          fontSize: 20,
          fontFamily: 'Inter_400Regular'
        },
    };

    sendResetLink = ()=>{
        Firebase.auth().sendPasswordResetEmail(this.state.email).then(function() {
            Alert.alert('Please Check Your Email For Reset Link')
        }).catch(function(error) {
            Alert.alert('Something Went Wrong')
        });
    }

    render() {
        return(
            <View style={styles.container}>
                <Text>Enter Your Registered Email</Text>
                <TextInput
                style={styles.inputBox}
                value={this.state.email}
                onChangeText={(value) => { this.setState({email:value}) }}>
                </TextInput>
                <TouchableOpacity style={styles.button} onPress={this.sendResetLink}>
                    <Text style={styles.buttonText}>Send Reset Link</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

/**
 * Stylesheet
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#FFA611',
        borderColor: '#FFA611',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
})