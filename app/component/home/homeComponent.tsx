import React from 'react'
import { Button,StyleSheet, Text, View } from 'react-native';
import Firebase, {db}from '../../../config/firebase'


export default class Home extends React.Component {
    constructor(props:any) {
        super(props)
    }

    handleSignOut = () => {
        Firebase.auth().signOut()
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex:1}}>

                </View>
                <View style={styles.childcontainer}>
                    <View style={styles.buttoncontainer}>
                        <Text
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('Posts',{CATEGORY:'SUGGESTION'})}}>
                        Suggestion
                        </Text>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <Text
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('Posts',{CATEGORY:'APPRECIATION'})}}>
                        Appreciation
                        </Text>
                    </View>
                </View>
                <View style={styles.childcontainer}>
                    <View style={styles.buttoncontainer}>
                        <Text
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('Posts',{CATEGORY:'REPORT_FAKE_NEWS'})}}>
                        Fake News
                        </Text>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <Text
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('Posts',{CATEGORY:'HELP'})}}>
                        I Need Help
                        </Text>
                    </View>
                </View>
                <View style={styles.childcontainerbutton}>
                    <Text
                    title="Add New Post"
                    style={styles.userbuttons}
                    onPress={()=>{this.props.navigation.navigate('AddPost')}}>
                    Publish A Post
                    </Text>
                    <Text
                    title="My Posts"
                    style={styles.userbuttons}
                    onPress={()=>{this.props.navigation.navigate('UserPost')}}>
                    My Posts
                    </Text>
                    <Text
                    title="Logout"
                    style={styles.userbuttonslogout}
                    onPress={this.handleSignOut}>
                    Logout
                    </Text>
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
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        padding: 5
    },
    childcontainerbutton: {
        flex: 3,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
    },
    buttoncontainer : {
        flex: 1,
        padding: 10,
        width:'100%',
        backgroundColor: '#FEF9E7',
        height: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        margin:10
    },
    button: {
        fontFamily:'Inter_400Regular',
        fontSize: 20,
        color: '#D35400'
    },
    userbuttons: {
        fontFamily:'Inter_400Regular',
        fontSize: 18,
        color: '#1976D2',
        margin: 10
    },
    userbuttonslogout: {
        fontFamily:'Inter_400Regular',
        fontSize: 18,
        color: '#EF5350',
        margin: 10,
    }
})