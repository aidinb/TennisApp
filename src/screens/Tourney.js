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
    Switch,
    KeyboardAvoidingView
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
export default class Tourney extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tourney: ''
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
                <Navbar title={'Zoek toernooi'} leftBtnTitle={this.props.backTitle}
                        onPressLeftBtn={() => navigator.push({
                            screen: 'Menu',
                            navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                            animationType: 'fade',

                        })}/>


                <PersonRow title={'Hanneke Siemens'}/>
                    <View style={{width: width, padding: 20}}>
                        <Text
                            style={{
                                fontFamily: UI.FONT.regular,
                                color: UI.COLORS_HEX.white,
                                fontSize: 16,
                            }}>De toernooileiding heeft een toernooinummer
                            aangemaakt. Voer deze in om vervolgens een
                            baan te kiezen die aan jou is toegewezen.</Text>
                    </View>

                    <KeyboardAvoidingView behavior={'position'}
                                          style={{width: width, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{
                            borderRadius: 15,
                            width: width - 60,
                            backgroundColor: UI.COLORS_HEX.lightBlack,
                            height: 160,
                            padding: 15
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.bold,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 16,
                                }}>Toernooinummer</Text>
                            <CTextInput keyboardType={'numeric'} borderRadius={13}
                                        placeholder={'Voer toernooinummer in'}
                                        onChangeText={(text) => this.setState({tourney: text})}
                                        value={this.state.tourney} style={{
                                marginTop: 10, shadowColor: UI.COLORS_HEX.black,
                                shadowOffset: {width: 0, height: 0},
                                shadowOpacity: 0.7, color: UI.COLORS_HEX.white, paddingLeft: 30
                            }} width={width - 85}
                                        backgroundColor={UI.COLORS_HEX.gray}/>
                            <Ionicons style={{position: 'absolute', top: 55, left: 22}} name="md-search" size={20}
                                      color={'silver'}/>
                            <View style={{
                                width: width - 85,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 15

                            }}>
                                <CButton title={'Ga verder'} backgroundColor={UI.COLORS_HEX.blue}
                                         color={UI.COLORS_HEX.white}
                                         onPress={() => {
                                             navigator.push({
                                                 screen: 'Kiespartij',
                                                 navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                                 animationType: 'fade',
                                                 passProps: {backTitle: 'Toernooi'}

                                             })
                                         }}/>
                            </View>
                        </View>


                    </KeyboardAvoidingView>

                <Footer/>


            </View>
        )


    }
}