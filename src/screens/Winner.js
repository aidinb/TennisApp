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
    Picker
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
import Box from "../components/Box";

@inject("store") @observer
export default class Winner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gameScore: {player1: 0, player2: 0, games: [{p1: 0, p2: 0}, {p1: 0, p2: 0}, {p1: 0, p2: 0}]},
            player1: {punt: true, winner: false, forced: false, unforced: false},
            player2: {punt: true, winner: false, forced: false, unforced: false},
            service1Disable: false,
            service2Disable: false,


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

                <Navbar title={'Wedstrijd ' + store.Court} rightBtnColor={UI.COLORS_HEX.orange} rightBtnTitle={'Bewerk'}
                        onPressRightBtn={() => alert('Start')} leftBtnTitle={'Undo'}
                        onPressLeftBtn={() => navigator.pop({
                            animated: true,
                            animationType: 'fade',
                        })}/>


                <ScrollView contentContainerStyle={{paddingBottom: 70, alignItems: 'center'}}>
                    <View
                        style={{width: width, padding: 15, alignItems: 'center', marginTop: 5}}>

                        <View style={{
                            width: width - 70,
                            backgroundColor: UI.COLORS_HEX.gray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            borderRadius: 5,
                            marginTop: 5
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 18,
                                    marginTop: -3,
                                }}>Punt gewonnen door</Text>
                            {this.state.service1Disable === true && <View style={{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                borderRadius: 5,

                            }}/>}
                        </View>

                        <View style={{
                            width: width - 70,
                            backgroundColor: UI.COLORS_HEX.gray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            borderRadius: 5,
                            marginTop: 10,
                            flexDirection: 'row',
                            paddingTop: 0,
                            paddingBottom: 0
                        }}>
                            <View style={{
                                width: (width - 70) / 2,
                                borderColor: UI.COLORS_HEX.blue,
                                borderRightWidth: 1,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                height: 30,
                                flexDirection: 'row',
                                paddingRight: 10,
                                paddingLeft: 10
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.white,
                                        fontSize: 17,
                                        marginTop: -3,
                                    }}>{store.Match.player1}</Text>
                                {store.Service === store.Match.player1 && <Image source={require('../assets/images/ball.png')}
                                                                           style={{
                                                                               width: 18,
                                                                               height: 18,
                                                                               resizeMode: 'contain',
                                                                           }}/>}
                            </View>
                            <View style={{
                                width: (width - 70) / 2, justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                                paddingRight: 10,
                                paddingLeft: 10,
                            }}>
                                <Text
                                    style={{
                                        fontFamily: UI.FONT.regular,
                                        color: UI.COLORS_HEX.white,
                                        fontSize: 17,
                                        marginTop: -3,
                                    }}>{store.Match.player2}n</Text>
                                {store.Service === store.Match.player2 && <Image source={require('../assets/images/ball.png')}
                                                                          style={{
                                                                              width: 18,
                                                                              height: 18,
                                                                              resizeMode: 'contain',
                                                                          }}/>}

                            </View>
                            {this.state.service1Disable === true && <View style={{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                borderRadius: 5,

                            }}/>}

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: width - 90,

                        }}>
                            <Box title={'Punt'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => {
                                     if (store.HasWinner === true) {
                                         this.setState({
                                             player1: {punt: true, winner: true, forced: false, unforced: false},
                                             player2: {punt: false, winner: false, forced: true, unforced: true},
                                             service1Disable: true,
                                             service2Disable: true
                                         })
                                     } else {
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     }

                                 }}
                                 selected={this.state.player1.punt}/>
                            <Box title={'Punt'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => {
                                     if (store.HasWinner === true) {
                                         this.setState({
                                             player1: {punt: false, winner: false, forced: true, unforced: true},
                                             player2: {punt: true, winner: true, forced: false, unforced: false},
                                             service1Disable: true,
                                             service2Disable: true
                                         })
                                     } else {
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     }
                                 }}
                                 selected={this.state.player2.punt}/>
                        </View>
                    </View>
                    {store.HasWinner === true && <View>
                        <View style={{
                            width: width - 25,
                            backgroundColor: UI.COLORS_HEX.gray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            borderRadius: 5,
                            marginTop: 15
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 18,
                                    marginTop: -3,
                                }}>{store.Match.player1}</Text>
                            {this.state.service1Disable === false && <View style={{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                borderRadius: 5,

                            }}/>}

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: width - 20,

                        }}>
                            <Box title={'Winner'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => {
                                     if (store.HasStroke === true) {
                                         navigator.push({
                                             screen: 'SlagType',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     } else {
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     }

                                 }}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.player1.winner}
                                 service1Disable={this.state.service1Disable}
                            />
                            <Box title={'Forced\n error'} colors={['#CD118C', '#EB008B', '#F074AC']}
                                 onPress={() => {
                                     if (store.HasStroke === true) {
                                         navigator.push({
                                             screen: 'SlagType',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     } else {
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     }
                                 }}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.player1.forced}
                                 service1Disable={this.state.service1Disable}
                            />
                            <Box title={'Unforced\n error'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => {
                                     if (store.HasStroke === true) {
                                         navigator.push({
                                             screen: 'SlagType',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     } else {
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     }
                                 }}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.player1.unforced}
                                 service1Disable={this.state.service1Disable}
                            />
                        </View>

                        <View style={{
                            width: width - 25,
                            backgroundColor: UI.COLORS_HEX.gray,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            borderRadius: 5,
                            marginTop: 15
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 18,
                                    marginTop: -3,
                                }}>{store.Match.player2}</Text>
                            {this.state.service2Disable === false && <View style={{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                borderRadius: 5,

                            }}/>}

                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: width - 20,

                        }}>
                            <Box title={'Winner'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => {
                                     if (store.HasStroke === true) {
                                         navigator.push({
                                             screen: 'SlagType',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     } else {
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     }
                                 }}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.player2.winner}
                                 service2Disable={this.state.service2Disable}
                            />
                            <Box title={'Forced\n error'} colors={['#CD118C', '#EB008B', '#F074AC']}
                                 onPress={() => {
                                     if (store.HasStroke === true) {
                                         navigator.push({
                                             screen: 'SlagType',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     } else {
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     }
                                 }}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.player2.forced}
                                 service1Disable={this.state.service2Disable}
                            />
                            <Box title={'Unforced\n error'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => {
                                     if (store.HasStroke === true) {
                                         navigator.push({
                                             screen: 'SlagType',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     } else {
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Undo'}
                                         })
                                     }
                                 }}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.player2.unforced}
                                 service1Disable={this.state.service2Disable}
                            />
                        </View>
                    </View>}
                </ScrollView>
                <Footer/>

            </View>
        )


    }
}