import React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Button,Alert} from 'react-native'
import Firebase from '../../../config/firebase'

export default class Login extends React.Component {

    state = {
        email: '',
        password: '',
        isLoaded: false
    }

    handleLogin = () => {
        Firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => { this.props.navigation.navigate('Home') })
            .catch(error => { Alert.alert('Invalid Email Or Password.') })
    }
    isUserAuthenticated = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.props.navigation.navigate('Home')
            }
            else {
                this.setState({isLoaded:true})
            }
        })
    }

    componentDidMount = () => {
        this.isUserAuthenticated()
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.isLoaded === true &&
                    <View style={styles.innercontainer}>
                        <Text style={styles.title}>One Nation</Text>
                        <TextInput
                        style={styles.inputBox}
                        placeholder='Email'
                        value={this.state.email}
                        autoCapitalize='none'
                        onChangeText={email=>this.setState({email:email})}>
                        </TextInput>
                        <TextInput
                        style={styles.inputBox}
                        placeholder='Password'
                        value={this.state.password}
                        secureTextEntry={true}
                        onChangeText={password=>this.setState({password:password})}>
                        </TextInput>
                        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <Text onPress={()=>{this.props.navigation.navigate('ForgetPassword')}} style={styles.textButton}>Forgot Password?</Text>
                        <TouchableOpacity style={styles.signupButton} onPress={this.handleLogin}>
                            <Text style={styles.signUpButtonText} onPress={() => this.props.navigation.navigate('Signup')}>Don't have an account yet? Sign up</Text>
                        </TouchableOpacity>  
                    </View>
                }
                {
                    this.state.isLoaded === false &&
                    <View style={styles.innercontainer}>
                        <Text style={styles.loadingText}>Loading ...</Text>
                    </View>
                }
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
    innercontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center',
        fontFamily:'Inter_400Regular',
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 10,
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
        color: '#fff',
        fontFamily:'Inter_400Regular',
    },
    title: {
        fontFamily:'Inter_400Regular',
        fontSize: 40
    },
    textButton : {
        fontFamily:'Inter_400Regular',
        fontSize: 15,
        color: '#1976D2'
    },
    signupButton: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#29B6F6',
        borderColor: '#29B6F6',
        borderWidth: 1,
        borderRadius: 5,
        width: 300
    },
    signUpButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily:'Inter_400Regular',
    },
    loadingText: {
        fontFamily:'Inter_400Regular',
        fontSize: 20,
        color: '#1976D2'
    }
})
