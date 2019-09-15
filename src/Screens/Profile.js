import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import firebase from '../config'
import { withNavigation } from 'react-navigation'
class Profile extends Component {
    constructor(props) {
		super(props);
		this.state = {
            data:[]
    	};
    }
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                firebase.database().ref('users').on('child_added', (result) => {
                    if(result.key==user.uid){
                        let data=result.val()
                        data.uid=result.key
                        this.setState({data: data})
                    }
                })
            }
        })
    }
    handleLogout(){
        firebase.database().ref('users/' + this.state.data.uid ).update({
        	region: {
                latitude: this.state.data.region.latitude,
				longitude: this.state.data.region.longitude,
				status: 'offline'
        	}
        })
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          })
    }     
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: `${this.state.data.image}`}}/>
                <Text style={styles.name}>{this.state.data.fullname}</Text>
                <Text style={styles.userInfo}>{this.state.data.email}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.item}>
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/home/win8/50/ffffff'}}/>
              </View>
              <View style={styles.infoContent}>
                <TouchableOpacity>
                <Text style={styles.info} onPress={()=>this.props.navigation.navigate('Home')}>Maps</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.item}>
            
              <View style={styles.iconContent}>
                <Image style={styles.icon} source={{uri: 'https://png.icons8.com/settings/win8/50/ffffff'}}/>
              </View>
              
              <View style={styles.infoContent}>
              <TouchableOpacity >
                <Text style={styles.info} onPress={()=>this.handleLogout()}>Logout</Text>
                </TouchableOpacity>
              </View>
             
            </View>
          </View>
      </View>
    );
  }
}
export default withNavigation(Profile)

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#DCDCDC",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  },
  body:{
    backgroundColor: "#778899",
    height:500,
    alignItems:'center',
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex:1,
    alignItems:'flex-start',
    paddingLeft:5
  },
  iconContent:{
    flex:1,
    alignItems:'flex-end',
    paddingRight:5,
  },
  icon:{
    width:30,
    height:30,
    marginTop:20,
  },
  info:{
    fontSize:18,
    marginTop:20,
    color: "#FFFFFF",
  }
});