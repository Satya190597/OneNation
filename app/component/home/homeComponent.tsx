import React from 'react'
import { Button,StyleSheet, Text, View } from 'react-native';
import Firebase from '../../../config/firebase'


export default class HomeComponent extends React.Component {
    constructor(props:any) {
        super(props)
    }

    handleSignOut = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={this.handleSignOut}
                />
            </View>
        )
    }
}