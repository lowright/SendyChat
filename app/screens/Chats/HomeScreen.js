import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Image,
    ActivityIndicator
} from 'react-native'
import {Header, List, ListItem, ThemeConsumer} from 'react-native-elements'
import {Button, Dialog, Colors, PanningProvider, Constants} from 'react-native-ui-lib';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux'
import dialogsFetch from '../../actions/userDialogsAction'
import Pusher from 'pusher-js/react-native';


//Import Components
import ChatList from '../../components/ChatList'
import CreateChatIcon from '../../components/CreateChatIcon'

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Чаты '
    }

    constructor(props) {
        super(props);

        this.SCROLL_TYPE = {
            NONE: 'none',
            VERTICAL: 'vertical',
            HORIZONTAL: 'horizontal'
        };

        this.state = {
            panDirection: PanningProvider.Directions.UP,
            position: 'bottom',
            scroll: this.SCROLL_TYPE.NONE,
            showHeader: true,
            isRounded: true,
            showDialog: false,
            mess : []
        };

        Pusher.logToConsole = true;
    }

    async ConnectedSocet(){
        const res = await AsyncStorage.getItem('userToken');
        const token = res.slice(1,-1)
        this.pusher = new Pusher('2dd9afb004598ae19b67', {
          activityTimeout: 60000,
          cluster: 'mt1',
          forceTLS: true,
          authEndpoint: "https://nameless-forest-37690.herokuapp.com/broadcasting/auth",
          auth:{
            headers:{
              'Authorization': 'Bearer ' + token,
              'Access-Control-Allow-Origin': '*',
            }
          }
        })
        this.messagesChanel = this.pusher.subscribe('private-messages.' + this.props.user.data.id)
        this.messagesChanel.bind("App\\Events\\MessageSent", data => {
          this.setState({mess : data})
        })
    }

    async componentDidMount() {
        await this.getDialogs()
        await this.ConnectedSocet()
    }

    async getDialogs() {
        const res = await AsyncStorage.getItem('userToken');
        const token = res.slice(1,-1)
        try {
            await this.props.fetchData("https://nameless-forest-37690.herokuapp.com/api/v1/get_users", {
                method: 'GET',
                headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
                }, 
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    

    logInChat = id => {
        this.props.navigation.navigate('PrivatChat', { id })
    }

    showDialog = () => {
        this.setState({showDialog: true});
    }

    hideDialog = () => {
        this.setState({showDialog: false});
    }

    createNewChat = () => {
        this.setState({showDialog: false});
        this.props.navigation.navigate('CreateNewChat')
    }

    renderContent = () => {
        return (
            <View style={styles.modalWrapper}>

                <Button style={styles.modalButton} onPress={() => this.createNewChat()}>
                    <Image
                        source={require('../../assaets/images/chat.png')}
                        style={{
                        width: 30,
                        height: 30,
                        alignItems: 'flex-start'
                    }}/>
                    <Text style={styles.buttonTitle}>Создать чат</Text>
                </Button>

                <Button style={styles.modalButton} onPress={() => alert(1)}>
                    <Image
                        source={require('../../assaets/images/groupChat.png')}
                        style={{
                        width: 30,
                        height: 30,
                        alignItems: 'flex-start'
                    }}/>
                    <Text style={styles.buttonTitle}>Создать групповой чат</Text>
                </Button>

                <Button style={styles.modalButton} onPress={() => alert(1)}>
                    <Image
                        source={require('../../assaets/images/chanel.png')}
                        style={{
                        width: 30,
                        height: 30,
                        alignItems: 'flex-start'
                    }}/>
                    <Text style={styles.buttonTitle}>Создать канал</Text>
                </Button>

            </View>
        )
    }

    getDialogKey = height => {
        const {position} = this.state;
        return `dialog-key-${position}-${height}`;
    }

    renderDialog = () => {
        const {
            showDialog,
            panDirection,
            position,
            scroll,
            showHeader,
            isRounded
        } = this.state;
        const renderPannableHeader = showHeader
            ? this.renderPannableHeader
            : undefined;
        const height = scroll !== this.SCROLL_TYPE.NONE
            ? '70%'
            : undefined;

        return (
            <Dialog
                migrate
                useSafeArea
                key={this.getDialogKey(height)}
                top={position === 'top'}
                bottom={position === 'bottom'}
                height={height}
                panDirection={panDirection}
                containerStyle={isRounded
                ? styles.roundedDialog
                : styles.dialog}
                visible={showDialog}
                onDismiss={this.hideDialog}
                renderPannableHeader={renderPannableHeader}
                pannableHeaderProps={this.pannableTitle}
                supportedOrientations={this.supportedOrientations}>
                {this.renderContent()}
            </Dialog>
        );
    }

    render() {

        const { isLoading, data } = this.props.dialog

        if (isLoading === false) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator  color={'#000'} />
                </View>
            )
        }

        return (
            <SafeAreaView style={{ flex: 1}}>
                <Header
                    centerComponent={{
                    text: 'Чаты',
                    style: {color: '#000',fontSize: 18 }
                }}
                    rightComponent={< CreateChatIcon openCreateSettModal = {
                    this.showDialog
                } />}
                    containerStyle={styles.header}
                /> 
                
                {this.renderDialog()}

                <FlatList
                    data={data}
                    renderItem={({item}) => 
                        <ChatList
                            userName={item.nickname}
                            resentleMessage={item.phone}
                            // date={item.date}
                            logInChat={() => this.logInChat(item.id)}
                        />
                    }
                    keyExtractor={item => `${item.id}`}
                />
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    console.log('Set Props From Store >>>>>>>>')
    console.log(JSON.stringify(state))
    return {
        dialog : state.userDialog,
        user : state.userData
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchData : (url, config) => dispatch(dialogsFetch(url, config))
    }
}
  
export default connect( mapStateToProps,mapDispatchToProps )(HomeScreen)
  

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%'
    },
    header: {
        backgroundColor: '#ECF3F5',
        borderBottomWidth: 0.2,
        paddingBottom: 0,
        borderBottomColor: '#000',
        paddingTop: 0,
        height: 60
    },
    listChatWrapper: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
        paddingTop: 25
    },
    searchChanel: {
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 30,
        padding: 0,
        paddingLeft: 5,
        paddingRight: 5,
        width: '70%',
        textAlign: 'center',
        marginBottom: 25
    },
    dialog: {
        backgroundColor: Colors.white
    },
    roundedDialog: {
        backgroundColor: Colors.white,
        marginBottom: Constants.isIphoneX
            ? 0
            : 20,
        borderRadius: 12
    },
    button: {
        margin: 5,
        alignSelf: 'flex-start'
    },
    verticalScroll: {
        marginTop: 20
    },
    horizontalTextContainer: {
        alignSelf: 'center',
        position: 'absolute',
        top: 10
    },
    modalButton: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start'
    },
    modalWrapper: {
        padding: 10
    },
    buttonTitle: {
        marginLeft: 10,
        fontSize: 16
    }
})