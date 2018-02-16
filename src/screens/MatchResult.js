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
export default class MatchResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            set0Point1: '',
            set0Point2: '',
            set1Point1: '',
            set1Point2: '',
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
        const {store, navigator} = this.props;

        if (store.Play.score.previousSets.length > 1) {
            this.setState({set1Point1 : store.WinnerPlayer.score.previousSets[1].player1});
            this.setState({set1Point2 : store.WinnerPlayer.score.previousSets[1].player2});
        }
        if (store.Play.score.previousSets.length >0) {
            this.setState({set0Point1 : store.WinnerPlayer.score.previousSets[0].player1});
            this.setState({set0Point2 : store.WinnerPlayer.score.previousSets[0].player2});
        }
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

                <Navbar title={'Wedstrijd ' + store.Court.name} rightBtnColor={UI.COLORS_HEX.orange} leftBtnTitle={'Terug'}
                        onPressLeftBtn={() => navigator.pop({
                            animated: true,
                            animationType: 'fade',
                        })}/>


                <ScrollView contentContainerStyle={{paddingBottom: 70}}>
                    <View
                        style={{width: width, padding: 15, alignItems: 'center', marginTop: 5}}>
                        <View>
                            <View style={{
                                width: width - 30,
                                flexDirection: 'row',
                            }}>
                                <View style={{
                                    paddingLeft: 10,
                                    justifyContent: 'center',
                                    backgroundColor: UI.COLORS_HEX.gray,
                                    borderRadius: 3,
                                    flex: 0.7,
                                    paddingRight: 10,
                                    padding: 3

                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.white,
                                            fontSize: 20,
                                            marginTop: -2
                                        }}>{store.Match.player1}</Text>
                                </View>
                                <View style={{
                                    paddingLeft: 10,
                                    borderRadius: 5,
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    flex: 0.5

                                }}>
                                    <View style={{
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3,
                                        justifyContent: 'center',
                                        alignItems: 'center'


                                    }}>
                                        {/*<TextInput style={{*/}
                                        {/*flex: 1, justifyContent: 'center',*/}
                                        {/*alignItems: 'center',*/}
                                        {/*fontSize:22,*/}
                                        {/*fontFamily: UI.FONT.bold,*/}
                                        {/*color:UI.COLORS_HEX.white,*/}


                                        {/*}}*/}
                                        {/*underlineColorAndroid='rgba(0,0,0,0)'*/}
                                        {/*autoCapitalize={'none'}*/}
                                        {/*onChangeText={(text) => this.setState({score11: text})}*/}
                                        {/*value={this.state.score11}/>*/}

                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: store.WinnerPlayer.score.currentSet.player1>=6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{store.WinnerPlayer.score.currentSet.player1}</Text>
                                    </View>
                                    <View style={{
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3,
                                        justifyContent: 'center',
                                        alignItems: 'center'

                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: this.state.set1Point1 !== '' && this.state.set1Point1 >=6 ? UI.COLORS_HEX.orange : this.state.set0Point1!==''&&this.state.set0Point1>=6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.set1Point1 !== '' ? this.state.set1Point1 : this.state.set0Point1!==''?this.state.set0Point1:0}</Text>
                                    </View>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3
                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: this.state.set1Point1 !== '' &&this.state.set0Point1>=6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.set1Point1 !== '' && this.state.set0Point1!== '' ?this.state.set0Point1:0}</Text>
                                    </View>

                                </View>
                            </View>

                            <View style={{
                                width: width - 30,
                                flexDirection: 'row',
                                marginTop: 3
                            }}>
                                <View style={{
                                    justifyContent: 'space-between',
                                    backgroundColor: UI.COLORS_HEX.gray,
                                    borderRadius: 3,
                                    flex: 0.7,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    padding: 3
                                }}>
                                    <Text
                                        style={{
                                            fontFamily: UI.FONT.regular,
                                            color: UI.COLORS_HEX.white,
                                            fontSize: 20,
                                            marginTop: -2
                                        }}>{store.Match.player2}</Text>
                                </View>
                                <View style={{
                                    paddingLeft: 10,
                                    borderRadius: 5,
                                    justifyContent: 'space-around',
                                    flexDirection: 'row',
                                    flex: 0.5

                                }}>
                                    <View style={{
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3,
                                        justifyContent: 'center',
                                        alignItems: 'center'


                                    }}>
                                        {/*<TextInput style={{*/}
                                        {/*flex: 1, justifyContent: 'center',*/}
                                        {/*alignItems: 'center',*/}
                                        {/*fontSize:22,*/}
                                        {/*fontFamily: UI.FONT.bold,*/}
                                        {/*color:UI.COLORS_HEX.white,*/}


                                        {/*}}*/}
                                        {/*underlineColorAndroid='rgba(0,0,0,0)'*/}
                                        {/*autoCapitalize={'none'}*/}
                                        {/*onChangeText={(text) => this.setState({score11: text})}*/}
                                        {/*value={this.state.score11}/>*/}

                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: store.WinnerPlayer.score.currentSet.player2 >= 6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{store.WinnerPlayer.score.currentSet.player2}</Text>
                                    </View>
                                    <View style={{
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3,
                                        justifyContent: 'center',
                                        alignItems: 'center'

                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: this.state.set1Point2 !== '' && this.state.set1Point2 >=6 ? UI.COLORS_HEX.orange : this.state.set1Point2===''&&this.state.set0Point2!==''&&this.state.set0Point2>=6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.set1Point2 !== '' ? this.state.set1Point2 : this.state.set0Point2!==''?this.state.set0Point2:0}</Text>
                                    </View>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: (width - 40) / 8 - 4,
                                        backgroundColor: UI.COLORS_HEX.gray,
                                        borderRadius: 3
                                    }}>
                                        <Text style={{
                                            fontSize: 24,
                                            fontFamily: UI.FONT.bold,
                                            color: this.state.set1Point2 !== '' &&this.state.set0Point2>=6 ? UI.COLORS_HEX.orange : UI.COLORS_HEX.white,
                                        }}>{this.state.set1Point2 !== '' && this.state.set0Point2!== '' ?this.state.set0Point2:0}</Text>
                                        </View>

                                </View>
                            </View>
                        </View>
                        <View style={{
                            width: width - 30,
                            flexDirection: 'row',
                            height: 25,
                            alignItems: 'center'
                        }}>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 15,
                                    marginTop: -3,
                                }}>Partij duur: </Text>
                            <Text
                                style={{
                                    fontFamily: UI.FONT.regular,
                                    color: UI.COLORS_HEX.white,
                                    fontSize: 15,
                                    marginTop: -3,
                                }}>{store.EndTimeMatch} </Text>

                        </View>
                        <Text
                            style={{
                                fontFamily: UI.FONT.blackItalic,
                                color: UI.COLORS_HEX.white,
                                fontSize: 32,
                                marginTop: 15,
                            }}>{store.WinnerPlayer.winner === 1 ? store.WinnerPlayer.player1 : store.WinnerPlayer.player2}</Text>
                        <Text
                            style={{
                                fontFamily: UI.FONT.blackItalic,
                                color: UI.COLORS_HEX.white,
                                fontSize: 32,
                                marginTop: -3,
                            }}>Gefeliciteerd!</Text>

                        <Image source={require('../assets/images/placeholder.png')}
                               style={{
                                   width: 90,
                                   height: 90,
                                   zIndex: 1
                               }}/>
                        <View style={{marginTop: 40}}>
                            <CButton title={'Toon GameSetStat'} fontSize={16} width={width - 60}
                                     backgroundColor={UI.COLORS_HEX.blue}
                                     color={UI.COLORS_HEX.white}
                                     onPress={() => {
                                         navigator.push({
                                             screen: 'Statics',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Registreren'}
                                         })
                                     }}/>
                        </View>
                    </View>
                </ScrollView>


            </View>
        )


    }
}