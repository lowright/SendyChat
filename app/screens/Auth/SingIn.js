import React, {Component} from 'react'
import {Text, View, Button, StyleSheet,TouchableOpacity, TouchableWithoutFeedback, Modal, FlatList, Animated,} from 'react-native'
import { Icon, CheckBox } from 'react-native-elements'
import { Container, Item, Input} from 'native-base'
// Import data for countries
import data from '../../static/countries'

// Default render of country flag
const defaultFlag = data.filter(obj => obj.name === 'Ukraine')[0].flag

// Default render of country code
const defaultCode = data.filter(obj => obj.name === 'Ukraine')[0].dial_code

class SingInScreen extends React.Component {

  static navigationOptions = {
    title: 'SingIn Screen',
  };

  constructor(props) {
    super(props)

    this.state = {
      user: null,
      phone: '',
      password : 'qwe123!Q',
      fadeIn: new Animated.Value(0),
      fadeOut: new Animated.Value(1),
      isHidden: false,
      dial_code: defaultCode,
      modalVisible: false,
      checked : false,
      codeInput: '',
      message: '',
      confirmResult: null,
      statusSendCode : false
    }
  }

  onChangeText(key, value) { this.setState({[key]: value }) }

  signIn = async () => {
    const { phone } = this.state;
    const settings = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({phone})
  };
    try {
      const data = await fetch(`https://frozen-oasis-23821.herokuapp.com/api/v1/sendphone`, settings);
      const json = await data.json()
      if(JSON.stringify(data.status) === '200'){
        this.props.navigation.navigate('ConfirmCode', {phone})
      } else{
        alert(JSON.stringify(json.message))
      }
    } 
    catch (error) { alert(error) }
  };

  fadeIn() {
    Animated.timing(
      this.state.fadeIn,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }
    ).start()
    this.setState({isHidden: true})
  }
  
  fadeOut() {
    Animated.timing(
      this.state.fadeOut,
      {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }
    ).start()
    this.setState({isHidden: true})
  }

  showModal() {
    this.setState({ modalVisible: true })
  }
  
  hideModal() {
    this.setState({ modalVisible: false })
    this.refs.FourthInput._root.focus()
  }

  async getCountry(country) {
    const countryData = await data
    try {
      const countryCode = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      const dial_code = await countryData.filter(
        obj => obj.name === country
      )[0].dial_code
      // Set data from user choice of country
      this.setState({ dial_code })
      await this.hideModal()
    }
    catch (err) {
      console.log(err)
    }
  }
  
    render() {
      const { navigation } = this.props;
      let { fadeOut, fadeIn, isHidden, dial_code } = this.state
      const countryData = data
      return (
        <View style={styles.container}>
          <Container style={styles.infoContainer}>
            <View style={styles.container}>
              <View style={styles.logoContainer}>
                {
                  isHidden 
                  ?
                  <Animated.Image 
                    source={require('../../assaets/images/logo.png')}  
                    style={{ opacity: fadeIn, width: 200, height: 200}}/>
                  :
                  <Animated.Image 
                    source={require('../../assaets/images/logo.png')}  
                    style={{ opacity: fadeOut, width: 200.46, height: 200 }}/>
                }
                </View>
                <Text style={styles.title}>Для авторизации или регистрации введите номер телефона</Text>
                <Item style={styles.itemStyle}>
                  <TouchableOpacity onPress={() => this.showModal()} style={{flexDirection : 'row',  alignItems : 'center'}}>
                    <Text style={{fontSize: 18, color : 'grey'}}>{dial_code}</Text>
                    <Icon 
                      name='heartbeat'
                      type='font-awesome'
                      style={[styles.iconStyle, { marginLeft: 5 }]}
                      onPress={() => this.showModal()}
                    />
                  </TouchableOpacity>
                  <Input
                    style={styles.input}
                    placeholderTextColor='#adb4bc'
                    keyboardType={'phone-pad'}
                    returnKeyType='done'
                    pattern={['[\w-]+_[0-9a-zA-Z]+']}
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={false}
                    ref='FourthInput'
                    value={this.state.phone}
                    onChangeText={(val) => {
                      if (this.state.phone===''){
                        // render UK phone code by default when Modal is not open
                        this.onChangeText('phone', dial_code + val)
                      } else {
                        // render country code based on users choice with Modal
                        this.onChangeText('phone',  val)
                      }}
                    }
                    onFocus={() => this.fadeOut()}
                    onEndEditing={() => this.fadeIn()}
                  />
                  <Modal
                    animationType="slide" // fade
                    transparent={false}
                    visible={this.state.modalVisible}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flex: 10, backgroundColor: '#020202' }}>
                        <FlatList
                          data={countryData}
                          keyExtractor={(item, index) => index.toString()}
                          renderItem={
                            ({ item }) =>
                            <TouchableWithoutFeedback 
                              onPress={() => this.getCountry(item.name)}>
                              <View 
                                style={
                                  [
                                    styles.countryStyle, 
                                    {
                                      flexDirection: 'row', 
                                      alignItems: 'center',
                                      justifyContent: 'space-between'
                                    }
                                  ]
                                }>
                                <Text style={{fontSize: 45}}>
                                  {item.flag}
                                </Text>
                                <Text style={{fontSize: 15, color: '#000'}}>
                                  {item.name} ({item.dial_code})
                                </Text>
                              </View>
                            </TouchableWithoutFeedback>
                          }
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => this.hideModal()} 
                        style={styles.closeButtonStyle}>
                        <Text style={styles.textStyle}>
                          Close
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Modal>
                </Item>
                <CheckBox
                  style={styles.checkBox}
                  left
                  title='Согласие на обработку данных'
                  checkedIcon='dot-circle-o'
                  uncheckedIcon='circle-o'
                  checked={this.state.checked}
                  onPress={() => this.setState({checked: !this.state.checked})}
                />
              <TouchableOpacity disabled={this.state.checked ? false : true}
                onPress={() => this.signIn()}
                style={styles.buttonStyle}
              >
                <Text style={styles.buttonText}>
                  Продолжить
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => alert('Modal')}
                style={styles.techBtn}
              >
                <Text style={styles.techSupp}>
                  Техническая поддержка
                </Text>
              </TouchableOpacity>
            </View>
          </Container>
        </View>
      )
        // <View style={styles.container}>
        //   <Button title="SingIn Screen" onPress={() => this.props.navigation.navigate('ConfirmCode')} />
        // </View>
    }
  
}

export default SingInScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent : 'space-between',
    marginBottom : 10
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  infoContainer: {
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  title : {
    fontSize : 20,
    textAlign : 'center'
  },
  itemStyle: {
    marginBottom: 10,
  },
  techSupp : {
    textAlign : 'center'
  },
  iconStyle: {
    color: '#fff',
    fontSize: 28,
    marginRight: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#00AEEF',
    padding: 14,
    marginBottom: 10,
    borderRadius: 32,
    marginHorizontal : 20,
    marginTop : 10
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
  logoContainer: {
    alignItems: 'center',
  },
  textStyle: {
    padding: 5,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  countryStyle: {
    flex: 1,
    backgroundColor: 'white',
    borderTopColor: '#211f',
    borderTopWidth: 1,
    paddingHorizontal : 15
  },
  closeButtonStyle: {
    flex: 1,
    alignItems: 'center', 
    backgroundColor: '#00AEEF',
  }
})