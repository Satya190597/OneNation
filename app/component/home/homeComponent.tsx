import React from 'react'
import { Button,StyleSheet, Text, View } from 'react-native';
import Firebase, {db}from '../../../config/firebase'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


export default class Home extends React.Component {

    static navigationOptions = {
        title: 'Welcome - To One-Nation',
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
                    <SimpleLineIcons name="note" size={20} color="black" style={styles.normalIcon} />
                    &nbsp;Publish A Post
                    </Text>
                    <Text
                    title="My Posts"
                    style={styles.userbuttons}
                    onPress={()=>{this.props.navigation.navigate('UserPost')}}>
                    <FontAwesome name="sticky-note-o" size={24} color="black" style={styles.normalIcon} />
                    &nbsp;My Posts
                    </Text>
                    <Text
                    title="All Posts"
                    style={styles.userbuttons}
                    onPress={()=>{this.props.navigation.navigate('AllPost')}}>
                    <FontAwesome name="sticky-note-o" size={24} color="black" style={styles.normalIcon} />
                    &nbsp;My Posts
                    </Text>
                    <Text
                    title="Logout"
                    style={styles.userbuttonslogout}
                    onPress={this.handleSignOut}>
                    <AntDesign name="logout" size={20} color="black" style={styles.logoutIcon}/>
                    &nbsp;Logout
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
        width: '95%',
        backgroundColor: '#FDFEFE',
        borderColor:'#ECF0F1',
        borderWidth:2,
        borderRadius: 10,
        marginVertical: 10
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
        margin:10,
        borderColor:'#D35400',
        borderWidth:2
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
    },
    normalIcon: {
        marginRight: 5,
        color:'#1976D2'
    },
    logoutIcon: {
        marginRight: 5,
        color:'#EF5350'
    }
})