import React from 'react';
import {
    Text,
    View,
    Dimensions,
    Image,
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import BackImage from "../components/BackImage";

import UI from '../assets/UI';
import CButton from '../components/CButton';

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{alignItems: 'center', justifyContent: 'space-around', flex: 1}}>
                <BackImage/>
                <View style={[UI.absoluteView, {
                    backgroundColor: 'rgba(0,0,0,0.6)'
                }]}/>
                <View style={[UI.absoluteView, {
                    height: width / 2 - 40,
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                }]}>
                    <View>
                        <Text
                            style={[UI.regularWhiteText25,{fontSize: 45}]}>GameSet<Text
                            style={{
                                fontFamily: UI.FONT.blackItalic,
                                fontSize: 45,
                                color: UI.COLORS_HEX.orange
                            }}>Stats</Text></Text>
                        <Text
                            style={[UI.regularWhiteText25, {
                                marginTop: -10,
                                paddingLeft: 6
                            }]}>Always
                            winning</Text>
                    </View>
                </View>

                <View style={{
                    position: 'absolute',
                    bottom: 15,
                    left: 0,
                    right: 0,
                    backgroundColor: 'transparent',
                    flex: 1
                }}>
                    <View style={{width: width, padding: 10}}>
                        <Text
                            style={UI.regularWhiteText25}>Welkom bij
                            GameSe<Text
                                style={[UI.regularWhiteText25, {
                                    color: UI.COLORS_HEX.orange
                                }]}>Stats</Text></Text>
                    </View>

                    <View style={{width: width, marginTop: 10, padding: 10}}>
                        <Text
                            style={[UI.regularWhiteText25, {
                                paddingLeft: 0,
                                padding: 20,
                            }]}>Heb je nog
                            geen
                            account, registeer
                            je eerst als Supervisor en/of Log in.</Text>
                    </View>
                    <View
                        style={{width: width, flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20}}>
                        <CButton title={'Registreren'} backgroundColor={UI.COLORS_HEX.blue}/>
                        <CButton title={'Inloggen'} backgroundColor={UI.COLORS_HEX.white} color={UI.COLORS_HEX.black}
                                 onPress={() => {
                                     navigator.push({
                                         screen: 'Login',
                                         navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                         animationType: 'fade',
                                         passProps: {backTitle: 'Registreren'}
                                     })
                                 }}/>
                    </View>
                </View>

            </View>
        )


    }
}