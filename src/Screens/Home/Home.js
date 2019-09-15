import React, { Component } from 'react';
import { Container, Header, Tab, Body, Title, Tabs, TabHeading, Icon, Text } from 'native-base';
import Maps from './Maps';
import Friends from './friends'
import Profile from '../Profile'
export default class Home extends Component {
  render() {
    return (
      <Container>
        <Header hasTabs>
        <Body>
            <Title><Icon style={{color: 'white'}} name="chatbubbles"/> myuChat</Title>
          </Body>
        </Header>
        <Tabs >
          <Tab heading={ <TabHeading><Icon name="navigate" /><Text>Maps</Text></TabHeading>}>
            <Maps />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="chatboxes" /><Text>Friends</Text></TabHeading>}>
            <Friends />
          </Tab>
          <Tab heading={ <TabHeading><Icon name="person" /><Text>Profile</Text></TabHeading>}>
            <Profile />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}