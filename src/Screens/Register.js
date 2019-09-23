import React, { Component } from 'react'
import { ScrollView, AsyncStorage, Alert, StyleSheet, TextInput } from 'react-native'
import { Container, Content, Text, Form, Input, Item, Button, View, } from 'native-base'

import firebase from '../config'
import 'firebase/auth'
import 'firebase/database'

import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};
const db=firebase.database()

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullname:'',
            username: '',
            image: '',
            email: '',
            password: ''
        }
    }

    handleRegist=(data)=>{
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(response=>{
            db.ref('users/'+response.user.uid).set({
                fullname: data.fullname,
                username:data.username,
                image: data.image,
                email: data.email
        })
        .then(()=>{
            Alert.alert('Registration successful')

        })
        .catch((err)=>{
            Alert.alert('Error! Something went wrong..')
        })
    })
    .catch((err)=>{
        switch(err.code){
            case 'auth/email-already-in-use':
                        alert('This email is already in use..')
                    break
                    case 'auth/invalid-email':
                        alert('This email is invalid')
                    break
                    case 'auth/weak-password':
                        alert('password must contain at least 6 characters')
                    break
                    default:
                        Alert.alert('Error', err)
                }
        
    })
    .finally(()=>{
        this.props.navigation.navigate('Login')
    })

}
    render(){
        return (
            <ScrollView>
            <Container style={styles.container}>
                    <Form style={styles.form}>   
                    <Text style={styles.welcome}>Register</Text>                
                            <TextInput onChangeText={value => {this.setState({fullname: value})}}
                             placeholderTextColor="black"
                             style={styles.input}
                             placeholder="Full name" />
                            <TextInput onChangeText={value => {this.setState({username: value})}}
                            placeholderTextColor="black"
                            style={styles.input} 
                            placeholder="Username" />
                            <TextInput onChangeText={value => {this.setState({image: value})}}
                             placeholderTextColor="black"
                             style={styles.input}
                             placeholder="Image Url" />
                            <TextInput onChangeText={value => {this.setState({email: value})}}
                            placeholderTextColor="black"
                            style={styles.input} 
                            placeholder="E-mail" />
                            <TextInput onChangeText={value => {this.setState({password: value})}}
                            placeholderTextColor="black"
                            secureTextEntry
                            style={styles.input} 
                            placeholder="Password" />
                            <Button block style={{backgroundColor:'#1AB0D3'}} onPress={()=>{
                                this.handleRegist(this.state)
                            }} >
                                <Text>Register</Text>
                            </Button>    
                    </Form>
            </Container>
            </ScrollView>
        )
    }

}
export default Register
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
        top: 27,
        justifyContent:'space-between',
        alignContent:'center',
        borderRadius:20, 
        backgroundColor:'#000080', 
        paddingVertical:'10%',
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