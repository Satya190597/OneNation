import React from 'react'
import { Button,StyleSheet, Text, View,SafeAreaView,ScrollView,Alert,Linking } from 'react-native';
import Firebase, {db}from '../../../config/firebase'
import { AntDesign } from '@expo/vector-icons';

export default class Posts extends React.Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        title: 'Explore Posts',
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

    componentDidMount() {
        this.getPosts()
    }
    state = {
        allPosts: [],
        allPostsTemplate: [],
        postsLenght: [],
        postsReadButtonText: [],
        currentUser : Firebase.auth().currentUser.email,
        isLoaded: false
    }

    getPosts() {
        let posts = []
        db.collection('posts').get().then((snapshots) => {
            snapshots.forEach((doc) => {
                console.log(doc.data().category +" "+ this.props.navigation.getParam('CATEGORY'))
                if(doc.data().category === this.props.navigation.getParam('CATEGORY')) {
                    posts.push({data:doc.data(),docId:doc.id})
                    this.state.postsLenght.push(1)
                    this.state.postsReadButtonText.push('Read More')
                }
            })
            this.setState({isLoaded:true})
            this.setState({allPosts:posts})
            this.createTemplate()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    upvote(index) {
        let post = this.state.allPosts[index]
        console.log(post)
        if(!post.data.upvote.includes(this.state.currentUser)) {
            let upvotes = post.data.upvote
            upvotes.push(this.state.currentUser)
            post.data.upvote = upvotes 
        }
        else {
            let upvotes = post.data.upvote
            upvotes.splice(upvotes.indexOf(this.state.currentUser),1)
            post.data.upvote = upvotes
        }
        const docref = db.collection("posts").doc(post.docId)
        this.state.allPosts[index].data.upvote = post.data.upvote
        this.createTemplate()
        docref.update({
            upvote:post.data.upvote
        })
        .then(result => {
            Alert.alert('Thankyou For Your Vote... ')
        })
        .catch(error => {
            Alert.alert('Something Went Wrong ...')
        })
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

    createTemplate() {

        const template = []

        
        if(this.state.allPosts.length===0) {
            template.push(<Text>No Posts Found ...</Text>)
        }

        for(let index = 0; index < this.state.allPosts.length; index++) {
            
            /**
             * Like Logic Start
             */
            let upvotesArray = this.state.allPosts[index].data.upvote
            let upvoteColor = upvotesArray.includes(this.state.currentUser) ? '#8BC34A':'#FFB74D'
            /**
             * Like Logic Ends
             */

        
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
                    <View style={styles.cardFooter}>
                        <AntDesign name="like1" size={20} color={upvoteColor} onPress={()=>{this.upvote(index)}} />
                        <Text style={styles.upvotesText}>{this.state.allPosts[index].data.upvote.length}</Text>
                        <Text style={styles.authorText}>Author : {this.state.allPosts[index].data.user}</Text>
                    </View>
                </View>
            )
        }

        this.setState({allPostsTemplate:template})
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                { this.state.isLoaded === true &&
                    <ScrollView style={styles.scroollView}>
                        {this.state.allPostsTemplate}  
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
        flex: 1,
        alignSelf: 'center'
    },
    screenTitle: {
        margin: 20,
        alignSelf: 'center'
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
    cardFooter : {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'flex-end'
    },
    upvotesText: {
        fontSize: 20,
        color: '#03A9F4',
        marginLeft: 10,
        fontFamily: 'Inter_400Regular'
    },
    authorText: {
        fontSize: 10,
        color: '#FF5722',
        marginLeft: 10,
        fontFamily: 'Inter_400Regular',
    },
    loadingText: {
        fontFamily:'Inter_400Regular',
        fontSize: 20,
        color: '#1976D2'
    }
})