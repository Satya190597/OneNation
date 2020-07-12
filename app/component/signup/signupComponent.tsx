import React from 'react'
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert} from 'react-native'
import Firebase from  '../../../config/firebase'

export default class SignUp extends React.Component {

    state = {
        name: '',
        email:'',
        password: ''
    }

    static navigationOptions = {
        title: 'Sign Up',
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

    handleSignUp = () => {

        const {email,password} = this.state

        // ---------- Validate Signup Form. ----------

        if(email.length<=0)
            return Alert.alert('Please Enter An Email Id')
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)===false)
            return Alert.alert('Please Enter A Valid Email')
        if(password.length<=5)
            return Alert.alert('Password Must Be More Than 5 Character Long')
        
        // ---------- Perform SignUp Operation. ----------

        Firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => { 
                    this.props.navigation.navigate('Home')
                })
                .catch((error) => {
                    Alert.alert('This Email Is Already Registered.')
                })
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                style={styles.inputBox}
                placeholder='Full Name'
                value={this.state.name}
                onChangeText={name=>this.setState({name:name})}>
                </TextInput>
                <TextInput
                style={styles.inputBox}
                placeholder='Email *'
                value={this.state.email}
                autoCapitalize='none'
                onChangeText={email=>this.setState({email:email})}>
                </TextInput>
                <TextInput
                style={styles.inputBox}
                placeholder='Password *'
                value={this.state.password}
                secureTextEntry={true}
                onChangeText={password=>this.setState({password:password})}>
                </TextInput>
                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
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