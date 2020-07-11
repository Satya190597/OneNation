import React from 'react'
import { Button,StyleSheet, Text, View } from 'react-native';
import Firebase, {db}from '../../../config/firebase'


export default class HomeComponent extends React.Component {
    constructor(props:any) {
        super(props)
        this.getAllPosts()
    }

    handleSignOut = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    getAllPosts = () => {
        db.collection('posts').get().then((snapshots) => {
            snapshots.forEach(element => {
                console.log(element.data())
            });
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.childcontainer}>
                    <Text>Home Screen</Text>
                </View>
                <View style={styles.childcontainer}>
                    <View style={styles.buttoncontainer}>
                        <Button
                        title="Go to Details"
                        style={styles.button}
                        onPress={this.handleSignOut}>
                        </Button>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <Button
                        title="Add New Post"
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('AddPost')}}>
                        </Button>
                    </View>
                </View>
               
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
    childcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '85%'
    },
    buttoncontainer : {
        flex: 1,
        padding: 10
    },
    button: {
        width: '85%'
    }
})