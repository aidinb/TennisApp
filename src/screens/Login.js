import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import BackImage from "../components/BackImage";
import UI from '../assets/UI';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import CCheckbox from '../components/CCheckbox'
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // email: 'rob@socialbrothers.nl',
            //  pass: 'wachtwoord',
            email: '',
            pass: '',
            checked: true,
            isLoading: false
        };
    }

    onLogin = () => {
        const {store, navigator} = this.props;
        this.setState({isLoading: true})
        store.getAuthenticate({
            email: this.state.email,
            pass: this.state.pass,
        },this.state.checked).then(() => {
            this.setState({isLoading: false})
            navigator.push({
                screen: 'Menu',
                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                animationType: 'fade',
                passProps: {backTitle: 'Login'}

            })
        }).catch((e) => {
            this.setState({isLoading: false})
            store.Authenticate = [];
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


    }

    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <BackImage/>

                <Navbar title={'Login'} leftBtnTitle={this.props.backTitle} onPressLeftBtn={() => navigator.push({
                    screen: 'Index',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',
                })}/>
                <ScrollView style={{flex: 1}} contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}>
                    <KeyboardAvoidingView behavior={'position'} contentContainerStyle={{paddingBottom: 80}}>
                        <View style={{
                            flexDirection: 'row',
                            padding: 10,
                            alignSelf: 'center',
                            width: width - 60,
                            alignItems: 'center',
                            paddingLeft: 5,
                            marginTop: 10
                        }}>
                            <Image source={require('../assets/images/emailIcon.png')}
                                   style={{
                                       width: 24,
                                       height: 14,
                                       resizeMode: 'contain'

                                   }}/>
                            <Text
                                style={[UI.regularWhiteText25, {
                                    fontSize: 17,
                                    marginLeft: 5
                                }]}>Email</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                            width: width - 60,
                            alignItems: 'center',
                        }}>
                            <CTextInput placeholder={'Voer je email adres in'}
                                        keyboardType={'email-address'}
                                        onChangeText={(text) => this.setState({email: text})}
                                        value={this.state.email}/>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            padding: 10,
                            alignSelf: 'center',
                            width: width - 60,
                            alignItems: 'center',
                            marginTop: 0,
                            paddingLeft: 5
                        }}>
                            <Image source={require('../assets/images/passIcon.png')}
                                   style={{
                                       width: 40,
                                       height: 20,
                                       resizeMode: 'contain',
                                       marginLeft: -13
                                   }}/>
                            <Text
                                style={[UI.regularWhiteText25, {
                                    fontSize: 17,
                                    marginLeft: -5
                                }]}>Wachtwoord</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                            width: width - 60,
                            alignItems: 'center',
                        }}>
                            <CTextInput placeholder={'Voer je wachtwoord in'}
                                        secureTextEntry={true}
                                        onChangeText={(text) => this.setState({pass: text})}
                                        value={this.state.pass}/>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            padding: 10,
                            alignSelf: 'center',
                            width: width - 60,
                            alignItems: 'center',
                            marginTop: 10,
                            paddingLeft: 5,
                            paddingRight: 5,
                            justifyContent: 'space-between'
                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <CCheckbox checked={this.state.checked}
                                           onPress={() => this.state.checked === true ? this.setState({checked: false}) : this.setState({checked: true})}/>

                                <Text
                                    style={[UI.regularWhiteText25, {
                                        fontSize: 12,
                                        marginLeft: 5
                                    }]}>Aangemeld blijven</Text>
                            </View>
                        </View>

                        <View style={{width: width, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                            <CButton title={'Inloggen'} backgroundColor={UI.COLORS_HEX.blue}
                                     color={UI.COLORS_HEX.black}
                                     onPress={this.onLogin}/>
                        </View>

                    </KeyboardAvoidingView>
                </ScrollView>
                {this.state.isLoading && <Loading/>}
            </View>
        )


    }
}