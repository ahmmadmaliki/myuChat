import React from 'react'
import {
	View,
	StyleSheet,
	Alert,
	AsyncStorage,
	ActivityIndicator,
    ScrollView,
	Item,
	TouchableOpacity
} from 'react-native'
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';

import firebase from '../../config'
//import HeaderChat from './HeaderChat'
import { withNavigation } from 'react-navigation'
class Friends extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			person: [],
			user:null
		};
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
                firebase.database().ref('users').on('child_added', (data) => {
					if(data.key!=user.uid){ 
						this.setState((prevState)=>{
							let userdata=data.val()
							userdata.uid=data.key
							return{
								person:[...prevState.person,userdata],
								
							}
						})
					} else{
						let userdata=data.val()
						userdata.uid=data.key
						this.setState({user: userdata})
					}
				})
			} else {
				this.props.navigation.navigate('Login')
			}
		  });

	}

	render() {
		return(
	    <Container>
        <ScrollView>
        <Content>
          <List>
			  <TouchableOpacity >
			  {this.state.person.map((item,index)=>{
				  return(
					<ListItem avatar onPress={()=>{
						this.props.navigation.navigate('Chats',[item,this.state.user])
					}}>
					<Left>
					  <Thumbnail source={{uri: item.image}} />
					</Left>
					<Body>
					  <Text>{item.fullname}</Text>
					  <Text note>Click here to chat</Text>
					</Body>
					<Right>
					  <Text note>{item.region.status}</Text>
					</Right>
				  </ListItem>
				  )
			  })}
			  </TouchableOpacity>
          </List>
        </Content>
        </ScrollView>
      </Container>
		)
	}
}

const styles = StyleSheet.create({
	parentHeader: {
		flexDirection: 'row',
		height: 80,
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 20,
		backgroundColor: 'white',
		elevation: 2
	},
	textWrap: {
		flex: 1,
		alignItems: 'flex-start'
	},
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
		left: 20,

	},
})

export default withNavigation(Friends);