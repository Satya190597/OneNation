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
                <View style={styles.childcontainer}>
                    <Text>Home Screen</Text>
                </View>
                {
                    /**
                     * ---------- First Row. ----------
                     */
                }
                <View style={styles.childcontainer}>
                    <View style={styles.buttoncontainer}>
                        <Button
                        title="SUGGESTION"
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('Posts',{CATEGORY:'SUGGESTION'})}}>
                        </Button>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <Button
                        title="APPRECIATION"
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('Posts',{CATEGORY:'APPRECIATION'})}}>
                        </Button>
                    </View>
                </View>
                {
                    /**
                     * ---------- Second Row. ----------
                     */
                }
                <View style={styles.childcontainer}>
                    <View style={styles.buttoncontainer}>
                        <Button
                        title="REPORT FAKE NEWS"
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('Posts',{CATEGORY:'REPORT_FAKE_NEWS'})}}>
                        </Button>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <Button
                        title="I NEED HELP"
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('Posts',{CATEGORY:'HELP'})}}>
                        </Button>
                    </View>
                </View>
                {
                    /**
                     * ---------- Third Row. ----------
                     */
                }
                <View style={styles.childcontainer}>
                    <View style={styles.buttoncontainer}>
                        <Button
                        title="Logout"
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
                {
                    /**
                     * ---------- Fourth Row. ----------
                     */
                }
                <View style={styles.childcontainer}>
                    <View style={styles.buttoncontainer}>
                        <Button
                        title="My Posts"
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('UserPost')}}>
                        </Button>
                    </View>
                    <View style={styles.buttoncontainer}>
                        <Button
                        title="Add New Post"
                        style={styles.button}
                        onPress={()=>{this.props.navigation.navigate('UserPost')}}>
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