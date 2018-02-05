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
    KeyboardAvoidingView
} from 'react-native';
import {inject, observer} from 'mobx-react/native';

let {height, width} = Dimensions.get('window');
import UI from '../assets/UI';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import CCheckbox from '../components/CCheckbox'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Navbar from '../components/Navbar';

@inject("store") @observer
export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            checked: true
        };
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

    }

    componentWillUnmount() {

    }


    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <Image source={require('../assets/images/436417.png')}
                       style={{
                           position: 'absolute',
                           top: 0,
                           bottom: 0,
                           left: 0,
                           right: 0
                       }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }}/>
                <Navbar title={'Login'} leftBtnTitle={this.props.backTitle} onPressLeftBtn={() => navigator.push({
                    screen: 'Index',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',
                })}/>
                <ScrollView>
                    <KeyboardAvoidingView behavior={'position'} contentContainerStyle={{paddingBottom:80}}>

                    <View style={{width: width, justifyContent: 'center', alignItems: 'center', marginTop: 15}}>
                        <Image source={require('../assets/images/placeholder.png')}
                               style={{
                                   width: 130,
                                   height: 130
                               }}/>
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                        alignSelf: 'center',
                        width: width - 60,
                        alignItems: 'center',
                        paddingLeft: 5
                    }}>
                        <Image source={require('../assets/images/emailIcon.png')}
                               style={{
                                   width: 24,
                                   height: 14,
                                   resizeMode: 'contain'

                               }}/>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 17,
                                marginLeft: 5
                            }}>Email</Text>
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
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 17,
                                marginLeft: -5
                            }}>Wachtwoord</Text>
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
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 12,
                                    marginLeft: 5
                                }}>Aangemeld blijven</Text>
                        </View>
                        <View style={{
                            borderBottomWidth: 0.5,
                            borderColor: UI.COLORS_HEX.white,
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingBottom: 1
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 12,
                                }}>Wachtwoord vergeten</Text>
                        </View>
                    </View>

                <View style={{width: width, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <CButton title={'Inloggen'} backgroundColor={UI.COLORS_HEX.blue} color={UI.COLORS_HEX.black}
                             onPress={() => {
                                 navigator.push({
                                     screen: 'Menu',
                                     navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                     animationType: 'fade',
                                     passProps: {backTitle: 'Login'}

                                 })
                             }}/>
                </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        )


    }
}