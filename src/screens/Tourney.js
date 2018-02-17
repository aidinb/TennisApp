import React from 'react';
import {
    Text,
    View,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    Alert
} from 'react-native';
import {inject, observer} from 'mobx-react/native';

import UI from '../assets/UI';
import CButton from '../components/CButton';
import CTextInput from '../components/CTextInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";
import Loading from '../components/Loading'
import BackImage from '../components/BackImage'

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class Tourney extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tourney: '',
            isLoading: false

        };
    }

    onTourneyPress = () => {
        const {store, navigator} = this.props;
        if (this.state.tourney.length > 0) {
            this.setState({isLoading: true})
            store.getTournamentByNumber({
                tournament_number: this.state.tourney,
            }).then(() => {
                this.setState({isLoading: false})

                console.log(store.TournamentByNumber)

                if (store.TournamentByNumber.id > 0) {
                    navigator.push({
                        screen: 'Kiespartij',
                        navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                        animationType: 'fade',
                        passProps: {backTitle: 'Toernooi'}

                    })
                }
            }).catch((e) => {
                this.setState({isLoading: false})
                console.log(e.response)
                if (e.response && e.response.status) {
                    Alert.alert(
                        'Error',
                        'Tournament not found',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                    )
                } else {
                    Alert.alert(
                        'Slow Connection',
                        'please Try Again Later',
                        [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                    )
                }
            });
        } else {
            Alert.alert(
                'Error',
                'Please Enter the tournament number',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
            )
        }
    };

    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <BackImage/>
                <View style={[UI.absoluteView,{
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }]}/>
                <Navbar title={'Zoek toernooi'} leftBtnTitle={this.props.backTitle}
                        onPressLeftBtn={() => navigator.push({
                            screen: 'Menu',
                            navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                            animationType: 'fade',

                        })}/>


                <PersonRow title={store.User.name}/>
                <View style={{width: width, padding: 20}}>
                    <Text
                        style={[UI.regularWhiteText25,{
                            fontSize: 16,
                        }]}>Voer hier het unieke toernooinummer in welke de toernooileiding je vertrekt heeft en klik op 'Ga verder'.</Text>
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
                            style={[UI.regularWhiteText25,{
                                fontSize: 16,
                            }]}>Toernooinummer</Text>
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
                                     onPress={this.onTourneyPress}/>
                        </View>
                    </View>
                </KeyboardAvoidingView>

                <Footer/>
                {this.state.isLoading && <Loading/>}
            </View>
        )


    }
}