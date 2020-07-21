import React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Button,Alert} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import Firebase, { db } from '../../../config/firebase'

export default class UpdatePost extends React.Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Edit Your Post',
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
        post:{}
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts() {

        const post = db.collection("posts").doc(this.props.navigation.getParam('DOCID'))
        post.get().then((doc) => {
            if(doc.exists) {
                console.log('--- DOC PRESENT ---')
                this.setState({
                    category:doc.data().category,
                    title:doc.data().title,
                    description:doc.data().description,
                    link:doc.data().link,
                    post:doc.data()
                })

            }
        })
        .catch((error) => {
            console.log(error)
        })
    }

    /**
     * ---------- Update Post Method. ----------
     */
    updatePost = () => {

        if(this.state.title.length<=5)
            return Alert.alert('Title Should Be Greater Then 5 Characters')
        if(this.state.description<=50)
            return Alert.alert('Description Should Be Greater Then 50 Characters')
        if(/((ftp|https?):\/\/)?(www\.)?[a-z0-9\-\.]{3,}\.[a-z]{3}$/.test(this.state.link)===false)
            return Alert.alert('Please Enter A Valid Link')

        const previouspost = db.collection("posts").doc(this.props.navigation.getParam('DOCID'))

        previouspost.update({
            category:this.state.category,
            title:this.state.title,
            description:this.state.description,
            link:this.state.link
        })
        .then(result => {
            Alert.alert('Post updated successfully')
        })
        .catch(error => {
            Alert.alert('Something Went Wrong')
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
                        justifyContent: 'flex-start',
                        fontFamily: 'Inter_400Regular'
                    }}
                    itemTextStyle={{
                        fontFamily: 'Inter_400Regular'
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
                onPress={this.updatePost}
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
