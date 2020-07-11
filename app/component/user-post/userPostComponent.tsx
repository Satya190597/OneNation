import React from 'react'
import { Button,StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView,Alert } from 'react-native';
import Firebase, {db}from '../../../config/firebase'
import { TextInput } from 'react-native-gesture-handler';

export default class UserPost extends React.Component {

    constructor(props:any) {
        super(props)
    }

    state = {
        allPosts : [],
        allPostsTemplate: []
    }

    componentDidMount() {
        this.getPosts()
    }

    /**
     * ---------- Get All The Posts Of A Current User. ----------
     */
    getPosts() {

        const currentuser = Firebase.auth().currentUser
        let posts = []

        db.collection('posts').get().then((snapshots) => {

            snapshots.forEach((doc) => {

                console.log(doc.data().user + ' ' + currentuser.email)
                if(doc.data().user === currentuser.email) {
                    posts.push({data:doc.data(),docId:doc.id})
                }
            })

            this.setState({allPosts:posts})
            this.createTemplate()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    /**
     * ---------- Delete a particular post. ----------
     * @param docId 
     */
    delete(docId) {
        db.collection("posts").doc(docId).delete().then(() => {
            this.getPosts()
            Alert.alert('Posts deleted successfully')
        }).catch(function(error) {
            Alert.alert('Something Went Wrong')
        });
    }

    update() {
        /**
         * TO DO NAVGATE TO EDIT POST
         */
    }

    /**
     * ---------- Create Posts Template. ----------
     */
    createTemplate() {

        const template = []

        for(let index = 0; index < this.state.allPosts.length; index++) {
           template.push(
               <View style={styles.card} key={index}>
                   <Text style={styles.cardTitle}>{this.state.allPosts[index].data.title}</Text>
                   <Text style={{fontFamily: 'Inter_400Regular'}}>{this.state.allPosts[index].data.description}</Text>
                   <Text style={styles.cardLink}>{this.state.allPosts[index].data.link}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={()=> {this.delete(this.state.allPosts[index].docId)}} style={styles.deletebutton}>
                            <Text  style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> {this.props.navigation.navigate('UpdatePost',{DOCID:this.state.allPosts[index].docId})}} style={styles.editbutton}>
                            <Text  style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
               </View>
           )
        }

        this.setState({allPostsTemplate:template})
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scroollView}>
                    {/* <Text style={styles.screenTitle}>ALL POST</Text> */}
                    {this.state.allPostsTemplate}
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'column'
    },
    scroollView : {
        width: '100%',
        flex: 1
    },
    card: {
        width: '85%',
        padding: 20,
        backgroundColor: '#FFF8E1',
        margin: 20,
        borderRadius: 20
    },
    screenTitle: {
        margin: 20,
        alignSelf: 'center'
    },
    deletebutton: {
        flex: 1,
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        backgroundColor: '#FF7043',
        borderColor: '#FF7043',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center'
    },
    editbutton: {
        flex: 1,
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        marginHorizontal: 5,
        alignItems: 'center',
        backgroundColor: '#03A9F4',
        borderColor: '#03A9F4',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: 'Inter_400Regular'
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        fontFamily: 'Inter_400Regular'
    },
    cardLink: {
        marginTop: 10,
        fontStyle: 'italic',
        color: '#03A9F4',
        fontFamily: 'Inter_400Regular'
    }
})