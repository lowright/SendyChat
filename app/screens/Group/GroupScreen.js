import React, {Component} from 'react'
import { StyleSheet, Text, FlatList, View, SafeAreaView} from 'react-native';
import CardItem from '../../components/CardItem'


export default class GroupScreen extends Component {

    constructor(props){
        super(props)
        this.state = {
            data : [
                {
                    id: '1',
                    raiting : '4.8',
                    title : 'дал дал ушёл',
                    url : 'https://vdrifte.ru/images/pilots/155732242553273.jpg',
                    price : '300',
                },
                {
                    id: '2',
                    raiting : '3.8',
                    title : 'бэквард',
                    url : 'https://a.d-cd.net/6f73cc04k2d1-960.jpg',
                    price : '300',
                },
                {
                    id: '3',
                    raiting : '99.8',
                    title : 'title',
                    url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLTmp1MutsHGgAEAaY9k_Q8QLey1m-8C2T_ozKg9xSRhRKSGTl&usqp=CAU',
                    price : '300',
                }
                ,
                {
                    id: '4',
                    raiting : '99.8',
                    title : 'title',
                    url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLTmp1MutsHGgAEAaY9k_Q8QLey1m-8C2T_ozKg9xSRhRKSGTl&usqp=CAU',
                    price : '300',
                }
                ,
                {
                    id: '5',
                    raiting : '99.8',
                    title : 'title',
                    url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLTmp1MutsHGgAEAaY9k_Q8QLey1m-8C2T_ozKg9xSRhRKSGTl&usqp=CAU',
                    price : '300',
                }
                ,
                {
                    id: '6',
                    raiting : '99.8',
                    title : 'title',
                    url : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRLTmp1MutsHGgAEAaY9k_Q8QLey1m-8C2T_ozKg9xSRhRKSGTl&usqp=CAU',
                    price : '300',
                }
            ]
        }
    }

    getDAta = (id) => {
        alert(id)
    }

    render () {
        return (
            <View style={styles.container}>
               <SafeAreaView style={styles.container}>
                <FlatList
                    data = {this.state.data}
                    numColumns={2}
                    renderItem={
                        ({item}) => (
                            <CardItem
                                raiting = {item.raiting}
                                title = {item.title}
                                url = {item.url}
                                price = {item.price}
                                showId={() => this.getDAta(item.id)}
                            />
                        )
                    }
                    keyExtractor={(item) => item.id}
                />
            </SafeAreaView>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    cardItemWrapper : {
        width: '47.5%',
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    cardImageWrapper : {
        width: '100%',
    },
    cardItemDesc : {
        paddingTop: 6,
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    cardItemRaitingWrapper : {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardItemRaiting : {
        color: "#979797",
        fontSize: 10,
        lineHeight: 12,
    },
    cardItemStatus : {
        color: "#BD006C",
        fontSize: 10,
        lineHeight: 12,
        textTransform: 'uppercase',
    },
    cardItemTitle : {
        marginTop: 2,
        color: "#333333",
        fontSize: 12,
        lineHeight: 12,
        marginBottom: 8,
    },
    cardItemPrice : {
        color: "#BD006C",
        fontSize: 12,
        lineHeight : 15,
    },
})




