import React from 'react';
import {
    View,
    Dimensions,
    Image,
    Alert
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import lstore from 'react-native-simple-store';
import UI from '../assets/UI';

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        const {navigator, store} = this.props;
        lstore.get("profile").then(user => {
            if (user) {
                const {store, navigator} = this.props;
                store.getAuthenticate({
                    email: user.email,
                    pass: user.password,
                }).then(() => {
                    this.setState({isLoading: false})
                    navigator.push({
                        screen: 'Menu',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {backTitle: 'Login'}
                    })
                }).catch((e) => {

                    if (e.response && e.response.status) {
                        Alert.alert(
                            'Inloggen is mislukt',
                            'Controleer je gebruikersnaam en wachtwoord',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                        )
                    } else {
                        Alert.alert(
                            'Trage verbinding',
                            'Probeer het later opnieuw',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                        )
                    }
                });
            } else {
                navigator.push({
                    screen: 'Index',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',

                })
            }
        })
    }


    render() {
        return (
            <View style={{
                alignItems: 'center',
                justifyContent: 'space-around',
                flex: 1,
                backgroundColor: UI.COLORS_HEX.black
            }}>
                <Image source={require('../assets/images/BackImage.png')}
                       style={{
                           position: 'absolute',
                           top: 0,
                           bottom: 0,
                           left: 0,
                           right: 0,
                           resizeMode: 'contain', width: width, height: height,
                       }}/>

            </View>
        )


    }
}