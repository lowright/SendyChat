import React, { Component } from 'react';
import { View, Button, Text, TextInput, ScrollView } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import '@react-native-firebase/app';


import Authentication from './app/screens/Auth/Authentication';
import Preloader from './app/screens/Auth/Preloader';
import ConfirmCode from './app/screens/Auth/ConfirmCode'
import Registration from './app/screens/Auth/Registration';
import StartWork from './app/screens/Auth/StartWork';

//Screens Chat
import GlobalChat from './app/screens/Chat/GlobalChat'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyCywi0HVRCuF7IouiMYwYToVBruk-BaZgI",
    authDomain: "sendychat-a816c.firebaseapp.com",
    databaseURL: "https://sendychat-a816c.firebaseio.com",
    projectId: "sendychat-a816c",
    storageBucket: "sendychat-a816c.appspot.com",
    messagingSenderId: "16575438579",
    appId: "1:16575438579:web:8101815f3c5aecc8ee2186",
    measurementId: "G-1S81KZ04XS"
  })
}

//Import Navigators

  //AuthNavigation
  import AuthNavigator from './app/navigation/AuthNavigation/AuthNavigation'

//
  
class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      isLogIn: false,
    }

  }

  performTimeConsumingTask = async() => {
    return new Promise((resolve) =>
      setTimeout(
        () => { resolve('result') },
        1400
      )
    );
  }


  async componentDidMount() {
    // Preload data from an external API
    // Preload data using AsyncStorage
    const data = await this.performTimeConsumingTask();
  
    if (data !== null) {
      this.setState({ isLoading: false });
    }
    
  }

  render () {
    
    if (this.state.isLogIn) {
      return <GlobalChat />;
    }

    return (
      <AuthNavigator />
    )

  }

}



export default App


// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.unsubscribe = null;
//     this.state = {
//       user: null,
//       message: '',
//       codeInput: '',
//       phoneNumber: '',
//       confirmResult: null,
//     };
//   }
//   // 43:7a:60:f7:4a:d8:40:8c:a5:5e:4e:70:89:1d:da:f4:07:ef:0a:76
//   componentDidMount() {
//     this.unsubscribe = auth().onAuthStateChanged((user) => {
//       if (user) {
//         this.setState({ user: user.toJSON() });
//       } else {
//         // User has been signed out, reset the state
//         this.setState({
//           user: null,
//           message: '',
//           codeInput: '',
//           phoneNumber: '+380',
//           confirmResult: null,
//         });
//       }
//     })
//   }

//   componentWillUnmount() {
//      if (this.unsubscribe) this.unsubscribe();
//   }

//   signIn = () => {
//     const { phoneNumber } = this.state;
//     this.setState({ message: 'Sending code ...' });
   
//     firebase.auth().signInWithPhoneNumber(phoneNumber)
//       .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
//       .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
//   };

//   confirmCode = () => {
//     const { codeInput, confirmResult } = this.state;

//     if (confirmResult && codeInput.length) {
//       confirmResult.confirm(codeInput)
//         .then((user) => {
//           this.setState({ message: 'Code Confirmed!' });
//         })
//         .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
//     }
//   };

//   signOut = () => {
//    auth().signOut();
//   }

//   renderPhoneNumberInput() {
//    const { phoneNumber } = this.state;

//     return (
//       <View style={{ padding: 25 }}>
//         <Text>Enter phone number:</Text>
//         <TextInput
//           autoFocus
//           style={{ height: 40, marginTop: 15, marginBottom: 15 }}
//           onChangeText={value => this.setState({ phoneNumber: value })}
//           placeholder={'Phone number ... '}
//         />
//         <Button title="Sign In" color="green" onPress={this.signIn} />
//       </View>
//     );
//   }

//   renderMessage() {
//     const { message } = this.state;

//     if (!message.length) return null;

//     return (
//       <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
//     );
//   }

//   renderVerificationCodeInput() {
//     const { codeInput } = this.state;

//     return (
//       <View style={{ marginTop: 25, padding: 25 }}>
//         <Text>Enter verification code below:</Text>
//         <TextInput
//           autoFocus
//           style={{ height: 40, marginTop: 15, marginBottom: 15 }}
//           onChangeText={value => this.setState({ codeInput: value })}
//           placeholder={'Code ... '}
//           value={codeInput}
//         />
//         <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
//       </View>
//     );
//   }

//   render() {
//     const { user, confirmResult } = this.state;
//     return (
//       <View style={{ flex: 1 }}>

//         {!user && !confirmResult && this.renderPhoneNumberInput()}

//         {this.renderMessage()}

//         {!user && confirmResult && this.renderVerificationCodeInput()}

//         {user && (
//           <View
//             style={{
//               padding: 15,
//               justifyContent: 'center',
//               alignItems: 'center',
//               flex: 1,
//             }}
//           >
//             <Text style={{ fontSize: 25 }}>Signed In!</Text>
//             <Text>{JSON.stringify(user)}</Text>
//             <Button title="Sign Out" color="red" onPress={this.signOut} />
//           </View>
//         )}
//       </View>
//     );
//   }
// }

// export default  App