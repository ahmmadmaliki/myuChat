import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from '../config'
import { withNavigation } from 'react-navigation'
class Chats extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			person: {
				name : this.props.navigation.state.params[0].fullname,
				uid: this.props.navigation.state.params[0].uid,
            },
            messageLists:[],
            isLoading: true,
            user_id:this.props.navigation.state.params[1].uid,
            user_name: this.props.navigation.state.params[1].fullname
		};
	}
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
        firebase.database().ref('message').child(this.state.user_id).child(this.state.person.uid).on('child_added', (result) => {
          this.setState(previousState => ({
                messageLists: GiftedChat.append(previousState.messageLists, result.val()),
              }))
        })
    })
}

  onSend=async(messages=[])=> {
        if (messages.length > 0) {
            let msgId = firebase.database().ref('message').child(this.state.user_id).child(this.state.person.uid).push().key;
            let updates = {};
            updates['message/' + this.state.user_id + '/' + this.state.person.uid + '/' + msgId] = messages;
            updates['message/' + this.state.person.uid + '/' + this.state.user_id + '/' + msgId] = messages;
            firebase.database().ref().update(updates);
        }
}
  render() {
    return (
      <GiftedChat
        messages={this.state.messageLists}
        alwaysShowSend={true}
        onSend={text=>this.onSend(text)}
        user={{
          _id: this.state.user_id,
          name: this.state.user_name
        }}
      />
    )
  }
}
export default withNavigation(Chats);