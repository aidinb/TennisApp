import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import UI from '../assets/UI';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Box from "../components/Box";
import BackImage from "../components/BackImage";

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class Winner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            player1: {punt: true, winner: false, forced: false, unforced: false},
            player2: {punt: true, winner: false, forced: false, unforced: false},
            service1Disable: false,
            service2Disable: false,
            scrollHeight: ''
        };

    }

    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <BackImage/>

                <View style={[UI.absoluteView,{
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }]}/>

                <Navbar title={'Wedstrijd ' + store.Court.name}/>


                <ScrollView contentContainerStyle={{paddingBottom: 70, alignItems: 'center'}}
                            ref={ref => this.myScroll = ref}
                            onLayout={ev => this.state.scrollHeight = ev.nativeEvent.layout.height}>
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
                                style={[UI.regularWhiteText25,{
                                    fontSize: 18,
                                    marginTop: -3,
                                }]}>Punt gewonnen door</Text>
                            {this.state.service1Disable === true && <View style={[UI.absoluteView,{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                borderRadius: 5,

                            }]}/>}
                        </View>

                        <View style={{
                            width: width - 70,
                            backgroundColor: UI.COLORS_HEX.gray,
                            alignItems: 'center',
                            justifyContent: 'center',
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
                                flexDirection: 'row',
                                paddingLeft: 10,
                                padding: 5,
                            }}>
                                <Text
                                    style={[UI.regularWhiteText25,{
                                        fontSize: 17,
                                        marginTop: -3,
                                        width: (width - 150) / 2
                                    }]} numberOfLines={1}>{store.Match.player1.replace('+',' / ')}</Text>
                                {store.Service === 1 && <Image source={require('../assets/images/ball.png')}
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
                                padding: 5,
                                paddingLeft: 10
                            }}>
                                <Text
                                    style={[UI.regularWhiteText25,{
                                        fontSize: 17,
                                        marginTop: -3,
                                        width: (width - 150) / 2
                                    }]} numberOfLines={1}>{store.Match.player2.replace('+',' / ')}</Text>
                                {store.Service === 2 && <Image source={require('../assets/images/ball.png')}
                                                               style={{
                                                                   width: 18,
                                                                   height: 18,
                                                                   resizeMode: 'contain',
                                                               }}/>}

                            </View>
                            {this.state.service1Disable === true && <View style={[UI.absoluteView,{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                borderRadius: 5,

                            }]}/>}

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            width: width - 90,

                        }}>
                            <Box title={'Punt'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => {
                                     if (store.HasWinner === true) {
                                         this.myScroll.scrollTo({y: this.state.scrollHeight/3});
                                         this.setState({
                                             player1: {punt: true, winner: true, forced: false, unforced: false},
                                             player2: {punt: false, winner: false, forced: true, unforced: true},
                                             service1Disable: true,
                                             service2Disable: true
                                         })
                                     } else {
                                         this.props.puntPress(1)
                                         navigator.pop()
                                     }

                                 }}
                                 selected={this.state.player1.punt}/>
                            <Box title={'Punt'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => {
                                     if (store.HasWinner === true) {
                                         this.myScroll.scrollTo({y: this.state.scrollHeight/3});
                                         this.setState({
                                             player1: {punt: false, winner: false, forced: true, unforced: true},
                                             player2: {punt: true, winner: true, forced: false, unforced: false},
                                             service1Disable: true,
                                             service2Disable: true
                                         })
                                     } else {
                                         this.props.puntPress(2)
                                         navigator.pop()
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
                            borderRadius: 5,
                            marginTop: 15,
                            padding: 5
                        }}>
                            <Text
                                style={[UI.regularWhiteText25,{
                                    fontSize: 18,
                                    marginTop: -3,
                                }]}>{store.Match.player1}</Text>
                            {this.state.service1Disable === false && <View style={[UI.absoluteView,{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                borderRadius: 5,

                            }]}/>}

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
                                             passProps: {
                                                 backTitle: 'Undo',
                                                 puntPress: this.props.puntPress,
                                                 playerPoint: this.state.player1.punt === true ? 1 : 2,
                                                 forced: 'WINNER'
                                             }
                                         })
                                     } else {
                                         this.props.puntPress(this.state.player1.punt === true ? 1 : 2, 'WINNER')
                                         navigator.pop()
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
                                             passProps: {
                                                 backTitle: 'Undo',
                                                 puntPress: this.props.puntPress,
                                                 playerPoint: this.state.player1.punt === true ? 1 : 2,
                                                 forced: 'FORCED_ERROR'
                                             }
                                         })
                                     } else {
                                         this.props.puntPress(this.state.player1.punt === true ? 1 : 2, 'FORCED_ERROR')
                                         navigator.pop()
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
                                             passProps: {
                                                 backTitle: 'Undo',
                                                 puntPress: this.props.puntPress,
                                                 playerPoint: this.state.player1.punt === true ? 1 : 2,
                                                 forced: 'UNFORCED_ERROR'
                                             }
                                         })
                                     } else {
                                         this.props.puntPress(this.state.player1.punt === true ? 1 : 2, 'UNFORCED_ERROR')
                                         navigator.pop()
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
                            borderRadius: 5,
                            marginTop: 15,
                            padding: 5
                        }}>
                            <Text
                                style={[UI.regularWhiteText25,{
                                    fontSize: 18,
                                    marginTop: -3,
                                }]}>{store.Match.player2}</Text>
                            {this.state.service2Disable === false && <View style={[UI.absoluteView,{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                borderRadius: 5,

                            }]}/>}

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
                                             passProps: {
                                                 backTitle: 'Undo',
                                                 puntPress: this.props.puntPress,
                                                 playerPoint: this.state.player1.punt === true ? 1 : 2,
                                                 forced: 'WINNER'
                                             }
                                         })
                                     } else {
                                         this.props.puntPress(this.state.player1.punt === true ? 1 : 2, 'WINNER')
                                         navigator.pop()
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
                                             passProps: {
                                                 backTitle: 'Undo',
                                                 puntPress: this.props.puntPress,
                                                 playerPoint: this.state.player1.punt === true ? 1 : 2,
                                                 forced: 'FORCED_ERROR'
                                             }
                                         })
                                     } else {
                                         this.props.puntPress(this.state.player1.punt === true ? 1 : 2, 'FORCED_ERROR')
                                         navigator.pop()
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
                                             passProps: {
                                                 backTitle: 'Undo',
                                                 puntPress: this.props.puntPress,
                                                 playerPoint: this.state.player1.punt === true ? 1 : 2,
                                                 forced: 'UNFORCED_ERROR'
                                             }
                                         })
                                     } else {
                                         this.props.puntPress(this.state.player1.punt === true ? 1 : 2, 'UNFORCED_ERROR')
                                         navigator.pop()
                                     }
                                 }}
                                 fontFamily={UI.FONT.bold}
                                 selected={this.state.player2.unforced}
                                 service1Disable={this.state.service2Disable}
                            />
                        </View>
                    </View>}
                </ScrollView>
                <Footer image={store.SponserImage}/>

            </View>
        )


    }
}