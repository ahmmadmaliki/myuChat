import React, { Component } from 'react';
import {createAppContainer, createSwitchNavigator } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register'
import Home from './src/Screens/Home/Home'
import Chats from './src/Screens/Chats'
import Profile from './src/Screens/Profile'
import firebase from './src/config'
import {
	ActivityIndicator,
	View,
} from 'react-native'


class AuthLoadingScreen extends React.Component {
	componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
				this.props.navigation.navigate('App')
			} else {
				this.props.navigation.navigate('Auth')
			}
    })
  }

	render() {
		return (
			<View style={{
				flex: 1,
				justifyContent: 'center',
				AlignItems: 'center'
			}}>
				<ActivityIndicator size="large" color="#0FA391" />
			</View>
		)
	}
}
const authNavigator=createStackNavigator({
  Login: {
    screen: Login ,
    navigationOptions: ({navigation})=>({
    header: null
    })
  },
  Register: {
    screen: Register,
    navigationOptions: ({navigation})=>({
      header: null
      })
  },
})
const AppNavigator = createStackNavigator({
  Home:{
    screen: Home,
    navigationOptions:({navigation})=>({
    header: null
    })
  },
  Chats:{
    screen: Chats,
    navigationOptions:({navigation})=>({
      header: null
    })
  },
  Profile:{
    screen: Profile,
    navigationOptions:({navigation})=>({
    header: null
    })
  }
})

const Switch = createSwitchNavigator({
	AuthLoading: AuthLoadingScreen,
	App: AppNavigator,
	Auth: authNavigator
},{

	initialRouteNma: 'AuthLoading',

})

const AppContainer = createAppContainer(Switch);
export default class App extends Component{
  render(){
    return(
        <AppContainer />
    )
  }
}