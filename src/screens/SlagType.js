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
export default class SlagType extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            foreHand: true,
            backHand: true,
            slag: true,
            drop: false,
            smash: false,
            ground: false,
            lob: false,
            volley: false,


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

                <Navbar title={'Wedstrijd ' + store.Court.name} rightBtnColor={UI.COLORS_HEX.orange}
                        rightBtnTitle={'Bewerk'}
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
                                style={[UI.regularWhiteText25,{
                                    fontSize: 18,
                                    marginTop: -3,
                                }]}>Slag</Text>
                            {this.state.slag === false && <View style={[UI.absoluteView,{
                                backgroundColor: UI.COLORS_HEX.whiteBoxBlur,
                                borderRadius: 5,
                            }]}/>}
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            width: width - 90,

                        }}>
                            <Box title={'Fore-\nhand'} colors={['#00914C', '#00A550', '#64C08A']}
                                 onPress={() => {
                                     if (store.HasStrokeType === true) {
                                         this.setState({
                                             slag: false,
                                             backHand: false,
                                             drop: true,
                                             smash: true,
                                             ground: true,
                                             lob: true,
                                             volley: true,
                                             foreHand: true
                                         })
                                     } else {
                                         this.props.puntPress(this.props.playerPoint, this.props.forced, 'FH');
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Set up'}
                                         })
                                     }


                                 }}
                                 selected={this.state.foreHand}/>
                            <Box title={'Back-\nhand'} colors={['#0095DA', '#00AEEE', '#2BC4F3']}
                                 onPress={() => {
                                     if (store.HasStrokeType === true) {
                                         this.setState({
                                             slag: false,
                                             foreHand: false,
                                             drop: true,
                                             smash: true,
                                             ground: true,
                                             lob: true,
                                             volley: true,
                                             backHand: true
                                         })
                                     } else {
                                         this.props.puntPress(this.props.playerPoint, this.props.forced, 'BH');
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Set up'}
                                         })
                                     }
                                 }}
                                 selected={this.state.backHand}/>
                        </View>
                    </View>
                    {store.HasStrokeType === true && <View>
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
                                }]}>Type Slag</Text>
                        </View>
                        <View style={{
                            width: width - 60,
                            flexDirection: 'row',
                            justifyContent: 'space-around'
                        }}>
                            <View style={{
                                justifyContent: 'space-between',
                            }}>
                                <Box title={'Drop-\nshot'} colors={['#FAAC18', '#FFCA05', '#FFE7A3']}
                                     onPress={() => {
                                         this.props.puntPress(this.props.playerPoint, this.props.forced, 'BH', 'DROPSHOT');
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Set up'}
                                         })
                                     }}
                                     selected={this.state.drop}/>
                                <Box title={'Smash'} colors={['#C7B299', '#C7B299', '#C7B299']}
                                     onPress={() => {
                                         this.props.puntPress(this.props.playerPoint, this.props.forced, 'BH', 'SMASH');
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Set up'}
                                         })
                                     }}
                                     selected={this.state.smash}/>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Box title={'Ground-\nstroke'} colors={['#666666', '#808080', '#999999']}
                                     onPress={() => {
                                         this.props.puntPress(this.props.playerPoint, this.props.forced, 'BH', 'GROUNDSTROKE');
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Set up'}
                                         })
                                     }}
                                     selected={this.state.ground}/>
                            </View>
                            <View style={{
                                justifyContent: 'space-between',

                            }}>
                                <Box title={'Lob'} colors={['#CD118C', '#EB008B', '#F074AC']}
                                     onPress={() => {
                                         this.props.puntPress(this.props.playerPoint, this.props.forced, 'BH', 'LOB');
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Set up'}
                                         })
                                     }}
                                     selected={this.state.lob}/>
                                <Box title={'Volley'} colors={['#93278F', '#93278F', '#93278F']}
                                     onPress={() => {
                                         this.props.puntPress(this.props.playerPoint, this.props.forced, 'BH', 'VALLEY');
                                         navigator.push({
                                             screen: 'Services',
                                             navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                                             animationType: 'fade',
                                             passProps: {backTitle: 'Set up'}
                                         })
                                     }}
                                     selected={this.state.volley}/>
                            </View>
                        </View>
                    </View>}
                </ScrollView>
                <Footer/>

            </View>
        )


    }
}