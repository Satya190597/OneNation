import React from 'react'
import { Button,StyleSheet, Text, View,SafeAreaView,ScrollView } from 'react-native';
import Firebase, {db}from '../../../config/firebase'

export default class Posts extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.getPosts()
    }
    state = {
        allPosts: [],
        allPostsTemplate: [],
        postsLenght: [],
        postsReadButtonText: []
    }

    getPosts() {
        let posts = []

        db.collection('posts').get().then((snapshots) => {

            snapshots.forEach((doc) => {

                console.log(doc.data().category + ' ' + this.props.route.params.CATEGORY)
                if(doc.data().category === this.props.route.params.CATEGORY) {
                    posts.push({data:doc.data(),docId:doc.id})
                    this.state.postsLenght.push(1)
                    this.state.postsReadButtonText.push('Read More')
                }
            })

            this.setState({allPosts:posts})
            this.createTemplate()
        })
        .catch((error) => {
            console.log(error)
        })
    }

    readMore(index) {
        const postsLength = this.state.postsLenght
        const postsReadButtonText = this.state.postsReadButtonText
        console.log(postsReadButtonText[index])
        postsReadButtonText[index] = postsReadButtonText[index] === 'Read More' ? 'Read Less' : 'Read More'
        postsLength[index] = postsLength[index] === 1 ? undefined : 1
        this.setState({postsLenght:postsLength})
        this.setState({postsReadButtonText:postsReadButtonText})

        console.log(this.state.postsReadButtonText)
        this.createTemplate()
    }

    createTemplate() {

        const template = []

        for(let index = 0; index < this.state.allPosts.length; index++) {
           template.push(
               <View style={styles.card} key={index}>
                    <Text style={styles.cardTitle}>{this.state.allPosts[index].data.title}</Text>
                    <Text numberOfLines={this.state.postsLenght[index]}>{this.state.allPosts[index].data.description}</Text>
                    <Text onPress={()=>{this.readMore(index)}} style={styles.readMoreText}>{this.state.postsReadButtonText[index]}</Text>
                    <Text style={styles.cardLink}>Reference : {this.state.allPosts[index].data.link}</Text>
               </View>
           )
        }

        this.setState({allPostsTemplate:template})
    }

    render() {
        return(
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scroollView}>
                    {/* <Text style={styles.screenTitle}>All Posts</Text> */}
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
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    cardLink: {
        marginTop: 10,
        fontStyle: 'italic',
        color: '#03A9F4'
    },
    readMoreText: {
        fontSize: 15,
        color: '#FFA611',
        fontWeight: 'bold',
        marginTop: 5
    }
})