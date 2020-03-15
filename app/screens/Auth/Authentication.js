import React from 'react'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  Animated,
} from 'react-native'
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/app';
import { Icon, CheckBox } from 'react-native-elements'
import {
  Container,
  Item,
  Input} from 'native-base'

// Import data for countries
import data from '../../static/countries'
// Default render of country flag
const defaultFlag = data.filter(obj => obj.name === 'Ukraine')[0].flag

// Default render of country code
const defaultCode = data.filter(obj => obj.name === 'Ukraine')[0].dial_code

export default class Authentication extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      phoneNumber: '',
      password : 'qwe123!Q',
      fadeIn: new Animated.Value(0),  // Initial value for opacity: 0
      fadeOut: new Animated.Value(1),  // Initial value for opacity: 1
      isHidden: false,
      dial_code: defaultCode,
      modalVisible: false,
      checked : false,
      codeInput: '',
      message: '',
      confirmResult: null,
    }
  }
  
  // Get user input
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  // Methods for logo animation
  componentDidMount() {
    this.unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '',
          confirmResult: null,
        });
      }
    })
    
    this.fadeIn()
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    auth().signInWithPhoneNumber(phoneNumber)
      .then( confirmResult => this.props.navigation.navigate('ConfirmCode',{ confirmResult }))
      .catch(error => alert(error.message));
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
  // Functions for Phone Input
  showModal() {
    this.setState({ modalVisible: true })
    // console.log('Shown')
  }
  hideModal() {
    this.setState({ modalVisible: false })
    // refocus on phone Input after selecting country and/or closing Modal
    this.refs.FourthInput._root.focus()
    // console.log('Hidden')
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
                  source={{uri : 'https://img.icons8.com/bubbles/2x/telegram-app.png'}}  
                  style={{ opacity: fadeIn, width: 200, height: 200}}/>
                :
                <Animated.Image 
                  source={{uri : 'https://img.icons8.com/bubbles/2x/telegram-app.png'}}  
                  style={{ opacity: fadeOut, width: 200.46, height: 200 }}/>
              }
              </View>
              <Text style={styles.title}>Для авторизации или регистрации введите номер телефона</Text>
              <Item style={styles.itemStyle}>
                <TouchableOpacity style={{flexDirection : 'row',  alignItems : 'center'}}>
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
                  value={this.state.phoneNumber}
                  onChangeText={(val) => {
                    if (this.state.phoneNumber===''){
                      // render UK phone code by default when Modal is not open
                      this.onChangeText('phoneNumber', dial_code + val)
                    } else {
                      // render country code based on users choice with Modal
                      this.onChangeText('phoneNumber',  val)
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
                    <View style={{ flex: 10, paddingTop: 80, backgroundColor: '#5059ae' }}>
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
                              <Text style={{fontSize: 20, color: '#fff'}}>
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
  }
}

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
    backgroundColor: '#5059ae',
    borderTopColor: '#211f',
    borderTopWidth: 1,
    padding: 12,
  },
  closeButtonStyle: {
    flex: 1,
    padding: 12,
    alignItems: 'center', 
    backgroundColor: '#b44666',
  }
})