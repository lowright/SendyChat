import React, { Component } from 'react';
import { PermissionsAndroid, StyleSheet, Button, View, FlatList } from 'react-native';
import Contacts from 'react-native-contacts';
import ContactsList from '../../components/ContactList'
import AsyncStorage from '@react-native-community/async-storage';
import {Header} from 'react-native-elements'
import Icon from '../../components/Icon'

class CreateNewChat extends Component{

  state = {
    contact : []
  }

  phoneSort = {
    phones : []
  }

  getUserPhone = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.'
      }
    )
    Contacts.getAll((err, contacts) => {
      if (err) {
        alert(err)
      } 
      this.setState({contact : contacts})
      contacts.map( item => 
        item.phoneNumbers.map(i => 
          this.phoneSort.phones.push(i.number)
        )
      )
    })
  }

  sortUserIsRegistration = async () => {
    const res = await AsyncStorage.getItem('userToken');
    const token = res.slice(1,-1)
    // console.log(token)
    // console.log(this.phoneSort)
    const settings = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token  
      },
      body: {
        phones : [
          '+380502440826'
        ]
      }
    };
    try {
      const data = await fetch(`https://secret-peak-55840.herokuapp.com/api/v1/get_sendychat_users_numbers`, settings);
      const json = await data.json()
      console.log(json)
    } 
    catch (error) { console.log(error) }
  }

  async componentDidMount () {
    const contact = this.phoneSort.phones
    await this.getUserPhone()
    console.log(contact)
  }
  
  createChat = () => {
    this.props.navigation.navigate('PrivatChat')
  }

  render() {
    const { contact } = this.state
    return (
      <>
        <Header 
           leftComponent={<Icon src={require('../../assaets/images/back.png')} />}
           centerComponent={{ text: 'Контакты', style: { color: '#000', fontSize : 18 } }}
           containerStyle={styles.header}
        />
        <FlatList
          data={contact}
          renderItem={({ item }) => (  
            <ContactsList
              title={item.displayName.substring(0, 1)}
              name={item.displayName}
              number={item.phoneNumbers.map(i => i.number)}
              createChat={this.createChat}
            />
          )}
          keyExtractor={item => item.recordID}
        />
      </>
    );
  }
}

export default CreateNewChat


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header : {
    backgroundColor: '#ECF3F5',
    borderBottomWidth : 0.4,
    paddingBottom : 0,
    borderBottomColor : '#000',
    paddingTop : 0,
    height : 60,
    marginBottom : 5
  }
});