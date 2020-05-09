import React, { PureComponent } from 'react';
import { PermissionsAndroid, StyleSheet, Button, View, FlatList } from 'react-native';
import Contacts from 'react-native-contacts';
import {Header} from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import Icon from '../../components/Icon'
import { connect } from 'react-redux'

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
    await this.reqSortContacts()
    
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


  async reqSortContacts() {
    const res = await AsyncStorage.getItem('userToken');
    const token = res.slice(1,-1)
    const settings = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body : {
        phones : this.state.contact
      }
    };
    try {
      const res = await fetch(`https://nameless-forest-37690.herokuapp.com/api/v1/get_sendychat_users_numbers`, settings);
      const data = await res.json()
      console.log(data)
    } catch (error) {
      alert(error)
    }
  }

  

  render() {
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

//Get Something date from redux
const mapStateToProps = state => ({
  contacts : state.contactsNumber //Try to get Contacts from reducers contactsNumber
})

//Fot Use Actions
const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewChat)


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