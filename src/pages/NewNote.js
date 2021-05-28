import React, { Component } from 'react';
import { Container, Content, Header, Left, Right, Button, Icon, Form, Input, Textarea } from 'native-base';
import { Image } from 'react-native'
import Styles from '../styles/Styles'
import DataBase from '../services/DataBase'
export default class NewNote extends Component {
    constructor(props) {
        super(props)
        //console.log(this.props.route.params.uri + "PPPPPP OOOOOOOOOO AAAAAAAAAA EEEEEEEEEEE ------ Olha a imagem")
        this.db = new DataBase();
        try {
            this.state = {
                title: '',
                content: '',
                archived: false,
                image: this.props.route.params.uri.length > 10 ? this.props.route.params.uri : '',
                alarm: ''
            }
        } catch (e) {
            this.state = {
                title: '',
                content: '',
                archived: false,
                image: '',
                alarm: ''
            }
        }
        console.log(this.state.image + "PPPPPP OOOOOOOOOO AAAAAAAAAA EEEEEEEEEEE ------ Olha a imagem no state")
    }

    captureTitle(title) {
        this.setState({ title: title })
    }
    captureContent(content) {
        this.setState({ content: content })
    }
    saveAndBack() {
        //salva no banco se não estiver vazia
        if (this.state.title.length > 0 || this.state.content.length > 0 || this.state.image.length > 0) {
            let note = {
                title: this.state.title,
                content: this.state.content,
                archived: this.state.archived,
                image: this.state.image,
                alarm: this.state.alarm
            }
            console.log(note.title + " TITLE DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD ")
            console.log(note.content + " contewnt DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD ")
            console.log(note.archived + " archved DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD ")
            console.log(note.image + " Imagem DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD ")
            console.log(note.alarm + " alarm DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD ")
            this.db.addNote(note)
            console.log('salvou a nota')
        }
        this.props.navigation.navigate("Início")
    }
    archiveAndUnarchiveNote() {
        this.setState({ archived: !this.state.archived })
    }

    render() {
        if (this.state.image.length > 10) {
            return (
                <Container>
                    <Header style={Styles.header}>
                        <Left>
                            <Button transparent onPress={() => this.saveAndBack()}>
                                <Icon name='arrow-back' />
                            </Button>
                        </Left>
                        <Right>
                            <Button transparent onPress={() => this.archiveAndUnarchiveNote()}>
                                <Icon name="alarm-outline" style={Styles.archiveAlarmIcon} />
                            </Button>
                            <Button transparent onPress={() => this.archiveAndUnarchiveNote()}>
                                <Icon name="archive-outline" style={Styles.archiveAlarmIcon} />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Image style={{ width: 400, height: 300 }} source={{ uri: this.state.image }}></Image>
                    </Content>
                    <Content padder style={Styles.majorColor}>
                        <Form>
                            <Input placeholder="Título" placeholderTextColor="#a2a2a3" style={{ fontSize: 20, color: '#eee' }} onChangeText={(title) => this.captureTitle(title)} />
                            <Textarea rowSpan={5} placeholder="Nota" placeholderTextColor="#a2a2a3" onChangeText={(content) => this.captureContent(content)} style={{ fontSize: 16, color: '#eee' }}/>
                        </Form>
                    </Content>
                </Container>
            );
        } else {
            return(
            <Container>
                <Header style={Styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.saveAndBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent onPress={() => this.archiveAndUnarchiveNote()}>
                            <Icon name="alarm-outline" style={Styles.archiveAlarmIcon} />
                        </Button>
                        <Button transparent onPress={() => this.archiveAndUnarchiveNote()}>
                            <Icon name="archive-outline" style={Styles.archiveAlarmIcon} />
                        </Button>
                    </Right>
                </Header>
                <Content padder style={Styles.majorColor}>
                    <Form>
                        <Input placeholder="Título" placeholderTextColor="#a2a2a3" onChangeText={(title) => this.captureTitle(title)} style={{ fontSize: 20, color: '#eee' }}/>
                        <Textarea rowSpan={5} placeholder="Nota" placeholderTextColor="#a2a2a3" onChangeText={(content) => this.captureContent(content)} style={{ fontSize: 16, color: '#eee' }}/>
                    </Form>
                </Content>
            </Container>
            )
        }
    }
}