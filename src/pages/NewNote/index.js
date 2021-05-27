import React, { Component } from 'react';
import { Container, Content, Header, Left, Body, Right, Title, Subtitle, Button, Icon, Form, Input, Item, Textarea } from 'native-base';
import Styles from '../../styles/Styles'
export default class NewNote extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
    }
    captureTitle(title){
        this.setState({title: title})
    }
    captureContent(content){
        this.setState({content: content})
    }
    saveAndBack(){
        //salva no banco se não estiver vazia
        if(this.state.title.length > 0 || this.state.content.length > 0){
            //salva a nota
            console.log('salvou a nota')
        }
        this.props.navigation.goBack()
    }

    render() {
        return (
            <Container>
                <Header style={Styles.header}>
                    <Left>
                        <Button transparent onPress={() => this.saveAndBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Right>
                        <Icon name="alarm-outline" style={Styles.archiveAlarmIcon} />
                        <Icon name="archive-outline" style={Styles.archiveAlarmIcon} />
                    </Right>
                </Header>
                <Content padder style={Styles.majorColor}>
                    <Form>
                        <Input placeholder="Título" placeholderTextColor="#a2a2a3" style={{ fontSize: 20 }} onChangeText={ (title) => this.captureTitle(title)}/>
                        <Textarea rowSpan={5} placeholder="Nota" placeholderTextColor="#a2a2a3" onChangeText={(content) => this.captureContent(content)} />
                    </Form>
                </Content>
            </Container>
        );
    }
}