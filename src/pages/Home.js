import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, ActionSheet, Title, Fab, Button, Icon, Item, Input, Text, Content, Card, CardItem, View, Root } from 'native-base';
import { Image, TouchableHighlight, TouchableHighlightComponent } from 'react-native'
import Styles from '../styles/Styles'
import DataBase from '../services/DataBase'

var BUTTONS = [
  { text: <Text style={{ color: '#eee' }}>Editar</Text>, icon: "create-outline", iconColor: "#eee" },
  { text: <Text style={{ color: '#eee' }}>Criar alarme</Text>, icon: "alarm-outline", iconColor: "#eee" },
  { text: <Text style={{ color: '#eee' }}>Arquivar</Text>, icon: "archive-outline", iconColor: "#eee" },
  { text: <Text style={{ color: '#eee' }}>Deletar</Text>, icon: "trash", iconColor: "#eee" },
  { text: <Text style={{ color: '#eee' }}>Cancelar</Text>, icon: "close", iconColor: "#eee" },
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.db = new DataBase()
    this.noteSelected = '';
    this.state = {
      active: false,
      notes: []
    };
  }

  componentDidMount() {
    const db = new DataBase();
    db.listNotes().then(data => {
      console.log(data[0].id + " ---- OOO OOO OOO OOO OOO OOO oOO OOO Olha o data")
      this.setState({ notes: data })
    });
  }
  render() {
    return (
      <Root>
        <Container>
          <Header searchBar rounded style={Styles.header}>
            <Item style={Styles.searchBar}>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                <Icon style={Styles.menu} name="menu" />
              </Button>
              <Input placeholder="Search" placeholderTextColor={'#a2a2a3'} />
              <Icon name="search-outline" />
            </Item>
            <Button transparent>
              <Text>Search</Text>
            </Button>
          </Header>
          <Content padder style={Styles.majorColor}>
            {this.state.notes.filter(note => !note.archived).map((note) => {
              console.log(note.id + "  **********   Olha a nota OLAHSHSHSHSSHSHSHS    - - - - - - - - - -  dsdhsuj")
              //this.noteSelected = note;length
              if (note.image.length > 3) {
                console.log(note.image + "OOOOOLLLLLLOOOOOOOLLLLL +++++ ------ ****** ///// Olha a imagem no if else")
                return (
                  <View style={{marginVertical: 10}}>
                    <TouchableHighlight 
                      note={note} 
                      onPress={() => this.props.navigation.navigate("Editar", { note: note })} style={Styles.majorColor}
                      onLongPress={() => ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                        title: "Opções",
                        style: { backgroundColor: "#29292b" }
                      },
                      buttonIndex => {
                        console.log(note.title + "  ---- //////// ===== ")
                        switch (BUTTONS[buttonIndex].icon) {
                          case 'create-outline':
                            console.log(note.title + "  ---- //////// ===== ")
                            this.props.navigation.navigate("Editar", { note: note })
                            break;
                          case 'alarm-outline':
                            alert(note.title)
                            break;
                          case 'archive-outline':
                            this.db.archiveAndUnarchiveNote(note.id, note.archived)
                            break;
                          case 'trash':
                            this.db.deleteNote(note.id)
                            break;
                          default:
                            break;
                        }
                      }
                    )}>
                      <View style={{borderWidth: 1,borderRadius: 7, borderColor: '#fff'}}>
                      <Image  source={{uri: note.image}} style={{ height: 200, padding: 0, margin: 0, borderRadius: 7}}></Image>
                      <Text style={Styles.titleCard}>{note.title}</Text>
                      <Text style={Styles.bodyCard}>
                          {note.content}
                        </Text>
                        </View>
                    </TouchableHighlight>
                    
                  </View>

                );
              } else {
                return (
                  <View style={{marginVertical: 10}}>
                    <TouchableHighlight 
                      note={note} 
                      onPress={() => this.props.navigation.navigate("Editar", { note: note })} style={Styles.majorColor}
                      onLongPress={() => ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                        title: "Opções",
                        style: { backgroundColor: "#29292b" }
                      },
                      buttonIndex => {
                        console.log(note.title + "  ---- //////// ===== ")
                        switch (BUTTONS[buttonIndex].icon) {
                          case 'create-outline':
                            console.log(note.title + "  ---- //////// ===== ")
                            this.props.navigation.navigate("Editar", { note: note })
                            break;
                          case 'alarm-outline':
                            alert(note.title)
                            break;
                          case 'archive-outline':
                            this.db.archiveAndUnarchiveNote(note.id, note.archived)
                            break;
                          case 'trash':
                            this.db.deleteNote(note.id)
                            break;
                          default:
                            break;
                        }
                      }
                    )}>
                      <View style={{borderWidth: 1,borderRadius: 7, borderColor: '#fff'}}>
                      
                      <Text style={Styles.titleCard}>{note.title}</Text>
                      <Text style={Styles.bodyCard}>
                          {note.content}
                        </Text>
                        </View>
                    </TouchableHighlight>
                    
                  </View>

                );
              }
            })}
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
              <Button onPress={() => this.props.navigation.navigate('Camera')} style={{ backgroundColor: '#0237d8' }}>
                <Icon name="camera-outline" />
              </Button>
              <Button onPress={() => this.props.navigation.navigate('Nova Nota')} style={{ backgroundColor: '#0237d8' }}>
                <Icon name="document-text-outline" />
              </Button>
            </Fab>

          </View>
        </Container>
      </Root>
    );
  }
}