import React, {Component, useState} from 'react'
import AsyncStorage from '@react-native-community/async-storage';

import {Animated, Image, SafeAreaView, Text, TouchableOpacity} from 'react-native';

import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field';

import styles, {ACTIVE_CELL_BG_COLOR, CELL_BORDER_RADIUS, CELL_SIZE, DEFAULT_CELL_BG_COLOR, NOT_EMPTY_CELL_BG_COLOR} from '../../static/style';



const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 4;
const source = {
    uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-88' +
            '0d-86ecb053413d.png'
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            toValue: isFocused
                ? 1
                : 0,
            duration: 250
        }),
        Animated.spring(animationsScale[index], {
            toValue: hasValue
                ? 0
                : 1,
            duration: hasValue
                ? 300
                : 250
        })
    ]).start();
};


const ConfirmCode =  ({navigation}) => {
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({value, setValue});
    const renderCell = ({index, symbol, isFocused}) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [
                        0, 1
                    ],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
                })
                : animationsColor[index].interpolate({
                    inputRange: [
                        0, 1
                    ],
                    outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR]
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [
                    0, 1
                ],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS]
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [
                            0, 1
                        ],
                        outputRange: [0.2, 1]
                    })
                }
            ]
        };

        // Run animation on next event loop tik Because we need first return new style
        // prop and then animate this value
        setTimeout(() => {
            animateCell({hasValue, index, isFocused});
    }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused
                    ? <Cursor/>
                    : null)}
            </AnimatedText>
        );
    };

    const applyCode = async () => {
        
        const navigationProps = navigation.state.params;
        const settings = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone : navigationProps.phone,
            code : value
          })
        };
        try {
          const data = await fetch(`https://frozen-oasis-23821.herokuapp.com/api/v1/checksmscode`, settings);
          const json = await data.json()
          if(JSON.stringify(data.status) === "400"){
            await navigation.navigate('Registration', {phone : navigationProps.phone})
          } else{
            await AsyncStorage.setItem('userToken', JSON.stringify(json.access_token));
            await navigation.navigate('User');
          }
        } 
        catch (error) { alert(error) }
    }

    return (
        <SafeAreaView style={styles.root}>
            <Image style={styles.icon} source={source}/>
            <Text style={styles.subTitle}>
                Введите код подтверждения{'\n'}
                отправленый Вам
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                renderCell={renderCell}
            />
            <TouchableOpacity onPress={() => applyCode()} style={styles.techBtn}>
                <Text style={styles.resendCode}>
                    Отпроавить код 
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

// class ConfirmCode extends React.Component {
//     static navigationOptions = {
//       title: 'Confirm',
//     };
  
//     render() {
//       return (
//         <View style={styles.container}>
//           <Button title="Sign in!" onPress={this._signInAsync} />
//           <Button title="Registration" onPress={() => this.props.navigation.navigate('Regist')} />
//         </View>
//       );
//     }
    
   
// }

export default ConfirmCode

