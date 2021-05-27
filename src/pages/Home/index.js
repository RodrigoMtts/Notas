import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Title, Fab, Button, Icon, Item, Input, Text, Content, Card, CardItem, View } from 'native-base';
import Styles from '../../styles/Styles'
import Fontes from '../../styles/Fontes'
import { TouchableHighlight } from 'react-native';
export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    };
  }
  render() {
    return (
      <Container>
        <Header searchBar rounded style={Styles.header}>
          <Item style={Styles.searchBar}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon style={Styles.menu} name="menu" />
            </Button>
            <Input placeholder="Search" placeholderTextColor={'#a2a2a3'} />
            <Icon name="ios-people" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content padder style={Styles.majorColor}>
          <Card>
            <CardItem header button onPress={() => alert("This is Card Header")} style={Styles.majorColor}>
              <Text style={Styles.titleCard}>NativeBase</Text>
            </CardItem>
            <CardItem cardBody style={Styles.majorColor}>
              <Body>
                <Text style={Styles.bodyCard}>
                  Click on any carditem
                </Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <View >
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#0237d8' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="add-outline" style={{ fontSize: 40 }} />
            <Button style={{ backgroundColor: '#0237d8' }}>
              <Icon name="camera-outline" />
            </Button>
            <Button onPress={() => this.props.navigation.navigate('Nova Nota')} style={{ backgroundColor: '#0237d8' }}>
              <Icon name="document-text-outline" />
            </Button>
          </Fab>

        </View>

      </Container>
    );
  }
}