import React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Button} from 'react-native'
import Firebase, {db}from '../../../config/firebase'

export default class AllPost extends React.Component {

    constructor(props) {
        super(props)
    }

    state = {
        posts: [],
        postsDocs: []
    }

    getPosts = () => {
        
        const reference = db.collection('posts')

        if(this.state.posts.length>0)
        {
            reference
            .orderBy("title")
            .startAfter(this.state.postsDocs[this.state.postsDocs.length-1])
            .limit(2)
            .get()
            .then((snapshots) => {
                let p = []
                let pd = []
                console.log('Display Data')
                snapshots.forEach(doc => {
                    p.push(doc.data())
                    pd.push(doc)
                })
                this.setState({posts:p,postsDocs:pd})
                console.log(p)
                console.log(pd)
            })
        }
        else {
            reference
            .orderBy("title")
            .limit(2)
            .get()
            .then((snapshots) => {
                let p = []
                let pd = []
                console.log('Display Data')
                snapshots.forEach(doc => {
                    p.push(doc.data())
                    pd.push(doc)
                })
                this.setState({posts:p,postsDocs:pd})
                console.log(this.state.posts)
                console.log(this.state.postsDocs)
            })
        }
        
    }

    render() {
        return (
            <View>
                <Text>All Posts Cmponent ..</Text>
                <Button 
                title="Get Posts"
                onPress={this.getPosts}>
                </Button>
            </View>
        )
    }
}