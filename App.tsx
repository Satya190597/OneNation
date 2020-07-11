import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button,StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
// import {NavigationContainer} from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Home from './app/component/home/homeComponent';
import SignUp from './app/component/signup/signupComponent'
import Login from './app/component/login/loginComponent'
import AddPost from './app/component/add-post/addPostComponent'
import UserPost from './app/component/user-post/userPostComponent'
import Posts from './app/component/posts-by-category/postsComponent'
import UpdatePost from './app/component/update-post/updatePostComponent'
import ForgetPassword from './app/component/forget-password/forgetPasswordComponent'
import { useFonts, Inter_900Black, Inter_100Thin, Inter_400Regular } from '@expo-google-fonts/inter';



export default function App() {

  const stack = createStackNavigator({
    Home:Home,
    AddPost:AddPost,
    UserPost:UserPost,
    Posts:Posts,
    UpdatePost:UpdatePost,
  })

  const SwitchNavigation = createAppContainer(stack)

  const loginStack = createStackNavigator({
    Login:Login,
    Signup:SignUp,
    ForgetPassword:ForgetPassword,
  })

  const LoginStackNavigation = createAppContainer(loginStack)

  const appNavigation = createSwitchNavigator({
    Login:LoginStackNavigation,
    Home:SwitchNavigation,
  })

  const AppNavigation = createAppContainer(appNavigation)

  let [fontsLoaded] = useFonts({
    Inter_900Black,
    Inter_100Thin,
    Inter_400Regular
  })


    if (fontsLoaded) {
      return <AppNavigation />;
    } 
    else {
      return (
        <View>
          <Text>Loading..</Text>
        </View>
      )
    }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
