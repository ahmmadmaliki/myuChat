import React, { Component } from 'react'
import { ScrollView, AsyncStorage, Alert, StyleSheet, TextInput } from 'react-native'
import { Container,Header, Content, Text, Form, Input, Item, Button, View, } from 'native-base'
import firebase from '../config'
import 'firebase/auth'
import 'firebase/database'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(response => {
            this.props.navigation.push('Home')
        })
        .catch(err => {
            switch(err.code) {
                case 'auth/user-not-found':
                    Alert.alert('Error', 'User Not Found!')    
                break
                default:
                    Alert.alert('Error', 'something went wrong')
            }
        })
    }

    render() {
        return (
          <ScrollView>
            <Container style={styles.container}>
                    <Form style={styles.form}>  
                            <Text style={styles.welcome}>Welcome to myuChat</Text>                   
                            <TextInput onChangeText={value => {this.setState({email: value})}}
                             placeholderTextColor="black"
                             style={styles.input}
                             placeholder="Email" />
                            <TextInput onChangeText={value => {this.setState({password: value})}}
                            placeholderTextColor="black"
                            secureTextEntry
                            style={styles.input} 
                            placeholder="Password" />
                            <Button block style={{backgroundColor:'#1AB0D3'}} onPress={()=>{
                                this.handleLogin()
                            }}>
                                <Text>Login</Text>
                            </Button> 
                            <Text style={{textAlign: 'center',color:'#FFFFE0'}}>or</Text>  
                            <Button block style={{backgroundColor:'#1AB0D3'}} onPress={()=>{
                              this.props.navigation.navigate('Register')
                            }}>
                                <Text>Register</Text>
                            </Button>    
                    </Form>
            </Container>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor:'#1AB0D3', 
        alignContent:'center', 
        paddingVertical:'10%', 
        paddingHorizontal:15
    },
    form: {
        flex: 1,
        top: 20,  
        justifyContent:'space-between',
        alignContent:'center',
        borderRadius:20, 
        backgroundColor:'#000080', 
        paddingVertical:'20%',
        paddingHorizontal:'7%'
    },
    welcome:{
      color: '#FFFFE0',
      fontSize: 28,
    },
    input: {  
        borderRadius:10, 
        backgroundColor:'white', 
        opacity: 0.5,
        padding:10,
    },
})

export default Login