import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import {inject, observer} from 'mobx-react/native';
import UI from '../assets/UI';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";
import BackImage from "../components/BackImage";
import lstore from 'react-native-simple-store';

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            checked: true
        };

    }


    componentDidMount() {
        const {navigator, store} = this.props;
        store.getSponser().then(()=>{
            console.log(store.Sponser)
        });

        store.setServices(false);
        this.setState({isLoading:true});
        store.getListSettings().then(() => {
            if (store.ListSettings.service && store.ListSettings.service === "1") {
                store.setHasService(true)
            } else {
                store.setHasService(false)
            }
            if (store.ListSettings.score_type && store.ListSettings.score_type === "1") {
                store.setHasWinner(true)
            } else {
                store.setHasWinner(false)
            }
            if (store.ListSettings.shot && store.ListSettings.shot === "1") {
                store.setHasStroke(true)
            } else {
                store.setHasStroke(false)
            }
            if (store.ListSettings.shot_type && store.ListSettings.shot_type === "1") {
                store.setHasStrokeType(true)
            } else {
                store.setHasStrokeType(false)
            }

            this.setState({isLoading:false});

        })

    }


    render() {
        const {navigator, store} = this.props;
        return (
            <View style={{flex: 1}}>
                <BackImage/>
                <View style={[UI.absoluteView,{
                    backgroundColor: 'rgba(0,0,0,0.8)'
                }]}/>
                <Navbar title={'Home'} rightBtnTitle={'Logout'} onPressRightBtn={() => {
                    lstore.delete("profile");
                    navigator.push({
                    screen: 'Login',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',
                    passProps:{backTitle:'Registration'}
                })}}/>

               <PersonRow title={store.User.name}/>

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
                        style={[UI.regularWhiteText25,{
                            fontSize: 17,
                        }]}>Stap 1: Statistieken instellingen</Text>
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
                        style={[UI.regularWhiteText25,{
                            fontSize: 17,
                        }]}>Stap 2: Zoek toernooi en start</Text>
                    <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>
                </TouchableOpacity>
               <Footer image={store.SponserImage}/>
            </View>
        )


    }
}