import React, { Component } from 'react';
import { Container, Header, Content, DatePicker, Text, View } from 'native-base';
export default class DateP extends Component {
  constructor(props) {
    super(props);
   
  }
  
  render() {
    return (      
        <DatePicker
          defaultDate={new Date(2018, 4, 4)}
          minimumDate={new Date(2018, 1, 1)}
          maximumDate={new Date(2018, 12, 31)}
          locale={"en"}
          timeZoneOffsetInMinutes={undefined}
          modalTransparent={false}
          animationType={"fade"}
          androidMode={"default"}
          placeHolderText="Select date"
          textStyle={{ color: "green" }}
          placeHolderTextStyle={{ color: "#d3d3d3" }}
          onDateChange={this.setDate}
          disabled={false}
        />        
    );
  }
}