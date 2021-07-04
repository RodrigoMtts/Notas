import React, { useEffect, useState } from 'react';
import { Container, ActionSheet, Header, Fab, Button, Icon, Item, Input, Text, Content, View, Root } from 'native-base';
import { Image, TouchableHighlight, StatusBar } from 'react-native'
import Styles from '../styles/Styles'
import DataBase from '../services/DataBase'

var BUTTONS = [
  { text: <Text style={{ color: '#eee' }}>Editar</Text>, icon: "create-outline", iconColor: "#eee" },
  // { text: <Text style={{ color: '#eee' }}>Criar alarme</Text>, icon: "alarm-outline", iconColor: "#eee" },
  { text: <Text style={{ color: '#eee' }}>Arquivar</Text>, icon: "archive-outline", iconColor: "#eee" },
  { text: <Text style={{ color: '#eee' }}>Deletar</Text>, icon: "trash", iconColor: "#eee" },
  { text: <Text style={{ color: '#eee' }}>Cancelar</Text>, icon: "close", iconColor: "#eee" },
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default function Home({ navigation }) {
  const db = new DataBase()
  const [notes, setNotes] = useState([])
  const [active, setActive] = useState(false)
  const [image, setImage] = useState('')

  returnImageState = () => {
    console.log(image)
    return image
  }

  filter = (x) => {
    let arr = []
    const reg = new RegExp(x);
    db.listNotes().then(data => {
      arr = data.filter((x) => {
        return reg.test(x.title)
      })
      setNotes(arr)
    })
  }

  updateView = () => {
    db.listNotes().then(data => {
      setNotes(data)
    })
  }

  useEffect(() => {
    const db = new DataBase();
    const unsubscribe = navigation.addListener('focus', () => {
      db.listNotes().then(data => {
        setNotes(data)
      })
    });
  }, [navigation])

  goEdit = (id) => {
    navigation.navigate("Editar", { id })
  }

  return (
    <Root>
      <Container>
        <Header searchBar rounded style={Styles.header}>
          <Item style={Styles.searchBar}>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon style={Styles.menu} name="menu" />
            </Button>
            <Input onChangeText={filter} placeholder="Pesquisar" placeholderTextColor={'#a2a2a3'} />
            <Icon name="search-outline" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <StatusBar
        hidden
      />
        <Content padder style={Styles.majorColor}>
          {notes.filter(note => !note.archived).map((note) => {
            if (note.image.length > 3) {
              return (
                <View style={{ marginVertical: 10 }}>
                  <TouchableHighlight
                    note={note}
                    onPress={() => navigation.navigate("Editar", { id: note.id })} style={Styles.majorColor}
                    onLongPress={() => ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                        title: "Opções",
                        style: { backgroundColor: "#29292b" }
                      },
                      buttonIndex => {
                        switch (BUTTONS[buttonIndex].icon) {
                          case 'create-outline':
                            navigation.navigate("Editar", { id: note.id })
                            break;
                          // case 'alarm-outline':
                          //   alert(note.title)
                          //   break;
                          case 'archive-outline':
                            db.archiveAndUnarchiveNote(note.id, note.archived)
                            updateView()
                            break;
                          case 'trash':
                            db.deleteNote(note.id)
                            updateView()
                            break;
                          default:
                            break;
                        }
                      }
                    )}>
                    <View style={{ borderWidth: 1, borderRadius: 7, borderColor: '#fff' }}>
                      <Image source={{ uri: note.image }} style={{ height: 200, padding: 0, margin: 0, borderRadius: 7 }}></Image>
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
                <View style={{ marginVertical: 10 }}>
                  <TouchableHighlight
                    note={note}
                    onPress={() => navigation.navigate("Editar", { id: note.id })} style={Styles.majorColor}
                    onLongPress={() => ActionSheet.show(
                      {
                        options: BUTTONS,
                        cancelButtonIndex: CANCEL_INDEX,
                        destructiveButtonIndex: DESTRUCTIVE_INDEX,
                        title: "Opções",
                        style: { backgroundColor: "#29292b" }
                      },
                      buttonIndex => {
                        switch (BUTTONS[buttonIndex].icon) {
                          case 'create-outline':
                            navigation.navigate("Editar", { id: note.id })
                            break;
                          // case 'alarm-outline':
                          //   alert(note.title)
                          //   break;
                          case 'archive-outline':
                            db.archiveAndUnarchiveNote(note.id, note.archived)
                            updateView()
                            break;
                          case 'trash':
                            db.deleteNote(note.id)
                            updateView()
                            break;
                          default:
                            break;
                        }
                      }
                    )}>
                    <View style={{ borderWidth: 1, borderRadius: 7, borderColor: '#fff' }}>

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
            active={active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#0237d8' }}
            position="bottomRight"
            onPress={() => setActive(!active)}>
            <Icon name="add-outline" style={{ fontSize: 40 }} />
            <Button onPress={() => navigation.navigate('Camera', { update: updateView, setImage: setImage, image: returnImageState })} style={{ backgroundColor: '#0237d8' }}>
              <Icon name="camera-outline" />
            </Button>
            <Button onPress={() => navigation.navigate('Nova Nota', { update: updateView, image: '' })} style={{ backgroundColor: '#0237d8' }}>
              <Icon name="document-text-outline" />
            </Button>
          </Fab>
        </View>
      </Container>
    </Root>
  )
}