import React, {Component} from 'react'
import {
    Container,
    Header,
    Content,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Thumbnail,
    Text,
	
} from 'native-base';
import { TouchableOpacity, View } from 'react-native'
import { Avatar } from 'react-native-elements';

export const ContactsList = ({title, name, number, createChat}) => {
    return (
		<TouchableOpacity
			onPress={() => createChat()}
		>
			<View style={{flexDirection : 'row', width : '100%', paddingHorizontal : 10, marginBottom : 5}}>
				<Left >
					<Avatar size="medium" rounded title={title} />
				</Left>
				<Body>
					<Text style={{textAlign: 'left'}}>{name}</Text>
					<Text note>{number}</Text>
				</Body>
			</View>
		</TouchableOpacity>
    );
}

export default ContactsList