import React from 'react'
import { Button,StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView,Alert,Linking } from 'react-native';
import Firebase, {db}from '../../../config/firebase'
import { TextInput } from 'react-native-gesture-handler';

export default class UserPost extends React.Component {

    constructor(props:any) {
        super(props)
    }

    static navigationOptions = {
        title: 'Your Post',
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
        allPosts : [],
        allPostsSnapshots: [],
        allPostsTemplate: [],
        postsLenght: [],
        postsReadButtonText: [],
        isLoaded: false,
        loadMoreText: 'Read More'
    }

    componentDidMount() {
        this.getPosts()
    }

    /**
     * ---------- Get All The Posts Of A Current User. ----------
     */
    getPosts = () => {

        this.setState({loadMoreText:'Loading ...'})

        const currentuser = Firebase.auth().currentUser
        let posts = []
        let postsSnapshots = []

        if(this.state.allPosts.length<=0) {
            db.collection('posts')
            .where("user","==",currentuser.email)
            .orderBy("title")
            .limit(3)
            .get()
            .then((snapshots) => {
                if(snapshots.size>0) {
                    snapshots.forEach((doc) => {
                        posts.push({data:doc.data(),docId:doc.id})
                        postsSnapshots.push(doc)
                        this.state.postsLenght.push(1)
                        this.state.postsReadButtonText.push('Read More')
                    })
                    this.setState({isLoaded:true})
                    this.setState({allPosts:posts})
                    this.setState({allPostsSnapshots:postsSnapshots})
                    this.createTemplate()
                    this.setState({loadMoreText:'Read More'})
                }
                else {
                    this.setState({loadMoreText:'No More Posts !'})
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
        else {
            posts = this.state.allPosts
            postsSnapshots = this.state.allPostsSnapshots
            db.collection('posts')
            .where("user","==",currentuser.email)
            .orderBy("title")
            .startAfter(this.state.allPostsSnapshots[this.state.allPostsSnapshots.length-1])
            .limit(3)
            .get()
            .then((snapshots) => {
                if(snapshots.size>0) {
                    snapshots.forEach((doc) => {
                        posts.push({data:doc.data(),docId:doc.id})
                        postsSnapshots.push(doc)
                        this.state.postsLenght.push(1)
                        this.state.postsReadButtonText.push('Read More')
                    })
                    this.setState({isLoaded:true})
                    this.setState({allPosts:posts})
                    this.setState({allPostsSnapshots:postsSnapshots})
                    this.createTemplate()
                    this.setState({loadMoreText:'Read More'})
                }
                else {
                    this.setState({loadMoreText:'No More Posts !'})
                }
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }
    readMore(index) {
        const postsLength = this.state.postsLenght
        const postsReadButtonText = this.state.postsReadButtonText
        postsReadButtonText[index] = postsReadButtonText[index] === 'Read More' ? 'Read Less' : 'Read More'
        postsLength[index] = postsLength[index] === 1 ? undefined : 1
        this.setState({postsLenght:postsLength})
        this.setState({postsReadButtonText:postsReadButtonText})
        this.createTemplate()
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
                   <Text numberOfLines={this.state.postsLenght[index]} style={{fontFamily: 'Inter_400Regular'}}>{this.state.allPosts[index].data.description}</Text>
                   <Text onPress={()=>{this.readMore(index)}} style={styles.readMoreText}>{this.state.postsReadButtonText[index]}</Text>
                   <Text style={styles.cardLink} onPress={()=>{
                        const url = this.state.allPosts[index].data.link
                        Linking.canOpenURL(url)
                            .then(supported => {
                                if (!supported)
                                    Alert.alert('Unable To Open Reference '+url)
                                else
                                    return Linking.openURL(url);
                            })
                            .catch(err => { 
                                Alert.alert('Something Went Wrong With Reference '+url)
                            })
                    }}>Reference : {this.state.allPosts[index].data.link}</Text>
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
                { this.state.isLoaded === true &&
                    <ScrollView style={styles.scroollView}>
                        {this.state.allPostsTemplate}  
                        <View style={styles.loadMore}>
                        <Text style={styles.loadMoreText} onPress={this.getPosts}>{this.state.loadMoreText}</Text>
                        </View>
                    </ScrollView>
                }
                {
                    this.state.isLoaded === false && 
                    <Text style={styles.loadingText}>Loading ...</Text>
                }
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
        flex: 1,
    },
    card: {
        width: '85%',
        padding: 20,
        backgroundColor: '#FFF8E1',
        margin: 20,
        borderRadius: 20,
        alignSelf: 'center'
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
    },
    readMoreText: {
        fontSize: 15,
        color: '#FFA611',
        fontWeight: 'bold',
        marginTop: 5,
        fontFamily: 'Inter_400Regular'
    },
    loadingText: {
        fontFamily:'Inter_400Regular',
        fontSize: 20,
        color: '#1976D2'
    },
    loadMore: {
        marginVertical: 10,
        backgroundColor: '#FAE5D3',
        borderRadius: 10,
        width: '85%',
        alignSelf: 'center',
        padding: 20
    },
    loadMoreText: {
        alignSelf: 'center',
        fontFamily:'Inter_400Regular',
        fontSize: 20,
        color: '#D35400'
    }
})