import React, { PureComponent } from 'react';
import { PermissionsAndroid, StyleSheet, Button, View, FlatList } from 'react-native';
import Contacts from 'react-native-contacts';
import ContactsList from '../../components/ContactList'
import AsyncStorage from '@react-native-community/async-storage';
import {Header} from 'react-native-elements'
import Icon from '../../components/Icon'

class CreateNewChat extends PureComponent{

  constructor(props){
    super(props)

    this.state = {
      contact : {},
      phones : [],
    }
  }

  async componentDidMount () {
    await this.getPhoneContacts()
    setTimeout(() => {
      console.log(this.state.phones)
    }, 3000)
  }

  async getPhoneContacts() {
    const { phones } = this.state
    try {
      const req = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: "Phone Number",
          message: "Could we get Phone Number.",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      )
      if (req === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Success get Local Cotacts");
        Contacts.getAll((err, contacts) => {
          if (err) {
            console.log(err)
          } 
          contacts.map( item => 
            item.phoneNumbers.map(i => 
              phones.push((i.number).replace(/[^+0-9]/gim,''))
            )
          )
        })
      } else {
        console.log("Somth went wrong");
      }
    } catch (err) {
      console.log(err);
    }
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
        {/* <FlatList
          data={ contact }
          renderItem={({ item }) => (  
            <ContactsList
              title={item.displayName.substring(0, 1)}
              name={item.displayName}
              number={item.phoneNumbers.map(i => i.number)}
              createChat={() => this.createChat}
            />
          )}
          keyExtractor={item => item.recordID}
        /> */}
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