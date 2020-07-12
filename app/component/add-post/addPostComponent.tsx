import React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Button,Alert} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Firebase, { db } from '../../../config/firebase'

export default class AddPost extends React.Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Publish A New Post',
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

    state = {
        category: 'SUGGESTION',
        title: '',
        description: '',
        link: '',
    }

    /**
     * ---------- Add New Post Method. ----------
     */
    addNewPost = () => {
        const user = Firebase.auth().currentUser
        const post = {
            category: this.state.category,
            title : this.state.title,
            description: this.state.description,
            link: this.state.link,
            user: user.email,
            upvote: [],
            downvote: [],
            spam: [],
            isAuthorized:false,
        }
        db.collection('posts')
        .doc()
        .set(post)
        .then((result)=>{
            this.setState({category:'SUGGESTION',title:'',description:'',link:''})
            Alert.alert('Your post is published !')
        })
        .catch((error)=>{
            Alert.alert('Sorry Something Wrong!')
        })
    }

    /**
     * ---------- Render Template. ----------
     */
    render() {
        return (
            <View style={styles.container}>
                <DropDownPicker
                    items={[
                        {label: 'Suggestion', value: 'SUGGESTION'},
                        {label: 'Appreciation', value: 'APPRECIATION'},
                        {label: 'Help', value: 'HELP'},
                        {label: 'Report Fake News', value: 'REPORT_FAKE_NEWS'}
                    ]}
                    defaultValue={this.state.category}
                    containerStyle={{height: 40,width:'85%',margin: 10}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeItem={item => this.setState({category: item.value})}
                />
                <TextInput
                value={this.state.title}
                placeholder='Title'
                style={styles.inputBox}
                onChangeText={(value)=>{this.setState({title:value})}}>
                </TextInput>
                <TextInput
                value={this.state.description}
                placeholder='Description'
                style={styles.inputBox}
                onChangeText={(value)=>{this.setState({description:value})}}
                multiline={true}>
                </TextInput>
                <TextInput
                value={this.state.link}
                placeholder='Any Link'
                onChangeText={(value)=>{this.setState({link:value})}}
                style={styles.inputBox}>
                </TextInput>
                <TouchableOpacity
                onPress={this.addNewPost}
                style={styles.button}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

/**
 * ---------- Component Stylesheet. ----------
 */
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
        textAlign: 'center',
        fontFamily: 'Inter_400Regular'
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
        color: '#fff',
        fontFamily: 'Inter_400Regular'
    },
})
