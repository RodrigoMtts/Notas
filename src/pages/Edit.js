import React, { useState, useEffect } from 'react';
import { Container, Content, Header, Left, Right, Button, Icon, Form, Input, Textarea } from 'native-base';
import { Image } from 'react-native'
import Styles from '../styles/Styles'
import DataBase from '../services/DataBase'

export default function Edit({navigation, route}) {
    const db = new DataBase()
    const [note, setNote] = useState({ id: '', title: '', content: '', archived: '', alarm: '', image: '' })

    useEffect(() => {
            db.noteById(route.params.id).then(data => {
                  setNote(data)
                })
    }, [route])

    captureTitle = (title) => {
        setNote({ id: note.id, title: title, content: note.content, archived: note.archived, alarm: note.alarm, image: note.image })
    }

    captureContent = (content) => {
        setNote({ id: note.id, title: note.title, content: content, archived: note.archived, alarm: note.alarm, image: note.image })
    }

    saveAndBack = () => {
        // salva no banco se não estiver vazia
        if (note.title.length > 0 || note.content.length > 0) {
            db.updateNote(note.id, note)
        }
        navigation.goBack()
    }

    if (note.image.length > 30) {
        return (
            <Container>
                <Header style={Styles.header}>
                    <Left>
                        <Button transparent onPress={() => saveAndBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Right></Right>
                </Header>
                <Content>
                    <Image style={{ width: 400, height: 300 }} source={{ uri: note.image }}></Image>
                </Content>
                <Content padder style={Styles.majorColor}>
                    <Form>
                        <Input value={note.title} placeholder="Título" placeholderTextColor="#a2a2a3" style={{ fontSize: 20 }} onChangeText={(title) => captureTitle(title)} style={{ fontSize: 20, color: '#eee' }} />
                        <Textarea value={note.content} rowSpan={7} placeholder="Nota" placeholderTextColor="#a2a2a3" onChangeText={(content) => captureContent(content)} style={{ fontSize: 16, color: '#eee' }} />
                    </Form>
                </Content>
            </Container>
        );
    } else {
        return (
            <Container>
                <Header style={Styles.header}>
                    <Left>
                        <Button transparent onPress={() => saveAndBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Right></Right>
                </Header>
                <Content padder style={Styles.majorColor}>
                    <Form>
                        <Input value={note.title} placeholder="Título" placeholderTextColor="#a2a2a3" onChangeText={(title) => captureTitle(title)} style={{ fontSize: 20, color: '#eee' }} />
                        <Textarea value={note.content} rowSpan={7} placeholder="Nota" placeholderTextColor="#a2a2a3" onChangeText={(content) => captureContent(content)} style={{ fontSize: 16, color: '#eee' }} />
                    </Form>
                </Content>
            </Container>
        );
    }
}
