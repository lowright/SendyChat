import React, {Component} from 'react'
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Image
} from 'react-native'
import {Header, List, ListItem} from 'react-native-elements'
import {Button, Dialog, Colors, PanningProvider, Constants} from 'react-native-ui-lib';
import {TouchableOpacity} from 'react-native-gesture-handler';
//Import Components
import ChatList from '../../components/ChatList'
import CreateChatIcon from '../../components/CreateChatIcon'

class HomeScreen extends React.Component {

    static navigationOptions = {
        title: 'Чаты '
    };

    constructor(props) {
        super(props);

        this.SCROLL_TYPE = {
            NONE: 'none',
            VERTICAL: 'vertical',
            HORIZONTAL: 'horizontal'
        };

        this.state = {
            loading: false,
            data: [
                {
                    userName: 'Andrew Lutsenko',
                    resentleMessage: 'Сегодня что делаешь?',
                    date: new Date().getHours() + `.` + new Date().getMinutes(),
                    id: '1'
                }, 
                {
                    userName: 'Новый диалог',
                    resentleMessage: '',
                    date: new Date().getHours() + `.` + new Date().getMinutes(),
                    id: '2'
                }, 
            ],
            panDirection: PanningProvider.Directions.UP,
            position: 'bottom',
            scroll: this.SCROLL_TYPE.NONE,
            showHeader: true,
            isRounded: true,
            showDialog: false
        };
    }

    componentDidMount() {
        this.state.data.push({
            userName : 'New',
            id : '3'
        })
    }
    

    logInChat = () => {
        this
            .props
            .navigation
            .navigate('PrivatChat')
    }

    showDialog = () => {
        this.setState({showDialog: true});
    };

    hideDialog = () => {
        this.setState({showDialog: false});
    };

    createNewChat = () => {
        this.setState({showDialog: false});
        this
            .props
            .navigation
            .navigate('CreateNewChat')
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
    };

    getDialogKey = height => {
        const {position} = this.state;
        return `dialog-key-${position}-${height}`;
    };

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
    };

    render() {
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
                    data={this.state.data}
                    renderItem={({item}) => <ChatList
                        userName={item.userName}
                        resentleMessage={item.resentleMessage}
                        date={item.date}
                        logInChat={this.logInChat}
                    />}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        );
    }
}

export default HomeScreen

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