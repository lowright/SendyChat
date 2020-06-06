import React, {Component} from 'react'
import { View, Image, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'

export const CardItem = ({raiting,title,url,price, showId}) => {
    return (


            <View style={styles.cardItemWrapper}>
                <View style={styles.cardImageWrapper}>
                    <TouchableOpacity
                        onPress={() => showId()}
                    >
                        <Image
                            source = {{uri: `${url}`}}
                            style={{
                                width : "100%",
                                height : 0,
                                paddingBottom: '100%',
                                borderTopLeftRadius: 4,
                                borderTopRightRadius: 4,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardItemDesc}>
                    <View style={styles.cardItemRaitingWrapper}>
                        <Text style={styles.cardItemRaiting}>{raiting}</Text>
                        <Text style={styles.cardItemStatus}>NEW!</Text>
                    </View>
                    <Text style={styles.cardItemTitle}>{title}</Text>
                    <Text style={styles.cardItemPrice}>{`${price}P`}</Text>
                </View>
            </View>
    )
}

export default CardItem

const styles = StyleSheet.create({
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