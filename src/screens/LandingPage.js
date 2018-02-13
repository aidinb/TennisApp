import React from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Linking,
    FlatList,
    Platform,
    Image,
    TextInput,
    Alert
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import lstore from 'react-native-simple-store';

import UI from '../assets/UI';
import CButton from '../components/CButton';

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

    }

    onNavigatorEvent(event) {
        const {store, navigator} = this.props;
        switch (event.id) {
            case 'willAppear':
                break;
            case 'didAppear':

                break;
            case 'willDisappear':
                break;
            case 'didDisappear':

                break;
        }
    }

    componentDidMount() {
        const {navigator, store} = this.props;
        lstore.get("profile").then(user=> {
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
                            'Authentication Failed',
                            'Please check your username or password',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                        )
                    } else {
                        Alert.alert(
                            'common.slowConnection',
                            'common.pleaseTryAgainLater',
                            [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                        )
                    }
                });
            }else{
                navigator.push({
                    screen: 'Index',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',

                })
            }
        })
    }

    componentWillUnmount() {

    }


    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 1}}>
                <Image source={require('../assets/images/436417.png')}
                       style={{
                           position: 'absolute',
                           top: 0,
                           bottom: 0,
                           left: 0,
                           right: 0
                       }}/>

            </View>
        )


    }
}