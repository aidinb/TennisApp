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
    TextInput
} from 'react-native';
import {inject, observer} from 'mobx-react/native';

let {height, width} = Dimensions.get('window');
import UI from '../assets/UI';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import CCheckbox from '../components/CCheckbox'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";

@inject("store") @observer
export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
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
        const {navigator, store} = this.props;

        store.setServices(false)

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
                <Navbar title={'Home'} rightBtnTitle={'Logout'} onPressRightBtn={() => navigator.push({
                    screen: 'Login',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',
                    passProps:{backTitle:'Registration'}
                })}/>



               <PersonRow title={'Hanneke Siemens'}/>

                <TouchableOpacity onPress={() => {
                    store.setServices(true)
                    navigator.push({
                        screen: 'Setting',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps:{backTitle:'Home'}
                    })
                }} activeOpacity={0.7} style={{
                    width: width,
                    flexDirection: 'row',
                    padding: 20,
                    justifyContent: 'space-between'
                }}>
                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                        }}>Stap 1: Settings</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.7} onPress={() => navigator.push({
                    screen: 'Tourney',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',
                    passProps:{backTitle:'Home'}

                })} style={{
                    width: width,
                    flexDirection: 'row',
                    padding: 20,
                    justifyContent: 'space-between',
                    paddingTop: 0
                }}>
                    <Text
                        style={{
                            fontFamily: UI.FONT.regular,
                            color: UI.COLORS_HEX.white,
                            fontSize: 17,
                        }}>Stap 2: Zoek toernooi en start</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>
                </TouchableOpacity>
               <Footer/>

            </View>
        )


    }
}