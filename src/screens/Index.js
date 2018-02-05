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


@inject("store") @observer
export default class Index extends React.Component {

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
                <View style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)'
                }}/>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: width / 2 - 40,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View>
                        <Text
                            style={{fontFamily: UI.FONT.regular, fontSize: 45, color: UI.COLORS_HEX.white}}>GameSet<Text
                            style={{
                                fontFamily: UI.FONT.blackItalic,
                                fontSize: 45,
                                color: UI.COLORS_HEX.orange
                            }}>Stats</Text></Text>
                        <Text
                            style={{
                                fontFamily: UI.FONT.italic,
                                color: UI.COLORS_HEX.white,
                                fontSize: 26,
                                marginTop: -10,
                                paddingLeft: 6
                            }}>Always
                            winning</Text>
                    </View>
                </View>

                <View style={{
                    position: 'absolute',
                    bottom: 15,
                    left: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                    flex:1

                }}>
                    <View style={{width: width, padding: 10}}>
                        <Text
                            style={{fontFamily: UI.FONT.bold, fontSize: 25, color: UI.COLORS_HEX.white}}>Welkom bij
                            GameSe<Text
                                style={{
                                    fontFamily: UI.FONT.bold,
                                    fontSize: 25,
                                    color: UI.COLORS_HEX.orange
                                }}>Stats</Text></Text>
                    </View>

                    <View style={{width: width, marginTop: 10, padding: 10}}>
                        <Text
                            style={{
                                paddingLeft: 0,
                                padding: 20,
                                fontFamily: UI.FONT.regular,
                                fontSize: 25,
                                color: UI.COLORS_HEX.white
                            }}>Heb je nog
                            geen
                            account, registeer
                            je eerst als Supervisor en/of Log in.</Text>
                    </View>
                    <View style={{width: width, flexDirection: 'row', justifyContent: 'space-around',marginBottom:20}}>
                        <CButton title={'Registreren'} backgroundColor={UI.COLORS_HEX.blue}/>
                        <CButton title={'Inloggen'} backgroundColor={UI.COLORS_HEX.white} color={UI.COLORS_HEX.black}
                                 onPress={() => {
                                     navigator.push({
                                         screen: 'Login',
                                         navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                         animationType: 'fade',
                                         passProps:{backTitle:'Registreren'}
                                     })
                                 }}/>
                    </View>
                </View>

            </View>
        )


    }
}