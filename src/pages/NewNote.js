import React, { Component } from 'react';
import { Container, Content, Header, Left, Right, Button, Icon, Form, Input, Textarea } from 'native-base';
import { Image, StatusBar } from 'react-native'
import Styles from '../styles/Styles'
import DataBase from '../services/DataBase'
export default class NewNote extends Component {
    constructor(props) {
        super(props)
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
    }

    captureTitle(title) {
        this.setState({ title: title })
    }
    captureContent(content) {
        this.setState({ content: content })
    }
    saveAndBack() {
        //salva no banco se não estiver vazia
        if (this.state.title.length > 0 || this.state.content.length > 0 || this.props.route.params.image.length > 0) {
            let note = {
                title: this.state.title,
                content: this.state.content,
                archived: this.state.archived,
                image: this.props.route.params.image,
                alarm: this.state.alarm
            }
            this.setState({title: ''}),
            this.setState({content: ''}),
            this.setState({archived: false})
            this.setState({image: ''})
            this.db.addNote(note)
            // this.props.route.params.update()
        }
        this.props.navigation.navigate("Início")
    }
    archiveAndUnarchiveNote() {
        this.setState({ archived: !this.state.archived })
    }

    render() {
        if (this.props.route.params.image.length > 10) {
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
                    <StatusBar
        hidden
      />
                    <Content>
                        <Image style={{ width: 400, height: 300 }} source={{ uri: this.props.route.params.image }}></Image>
                    </Content>
                    <Content padder style={Styles.majorColor}>
                        <Form>
                            <Input value={this.state.title} placeholder="Título" placeholderTextColor="#a2a2a3" style={{ fontSize: 20, color: '#eee' }} onChangeText={(title) => this.captureTitle(title)} />
                            <Textarea value={this.state.content} rowSpan={5} placeholder="Nota" placeholderTextColor="#a2a2a3" onChangeText={(content) => this.captureContent(content)} style={{ fontSize: 16, color: '#eee' }}/>
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
                <StatusBar
        hidden
      />
                <Content padder style={Styles.majorColor}>
                    <Form>
                        <Input value={this.state.title} placeholder="Título" placeholderTextColor="#a2a2a3" onChangeText={(title) => this.captureTitle(title)} style={{ fontSize: 20, color: '#eee' }}/>
                        <Textarea value={this.state.content} rowSpan={5} placeholder="Nota" placeholderTextColor="#a2a2a3" onChangeText={(content) => this.captureContent(content)} style={{ fontSize: 16, color: '#eee' }}/>
                    </Form>
                </Content>
            </Container>
            )
        }
    }
}