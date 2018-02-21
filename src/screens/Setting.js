import React from 'react';
import {
    Text,
    View,
    ScrollView,
    Dimensions,
    Platform,
    StyleSheet,
    Switch
} from 'react-native';
import {inject, observer} from 'mobx-react/native';

import UI from '../assets/UI';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PersonRow from "../components/PersonRow";
import Loading from '../components/Loading'
import BackImage from '../components/BackImage'

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class Setting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            punten: true,
            isLoading: false

        };

    }

    onSavePress = () => {
        const {store, navigator} = this.props;
        this.setState({isLoading: true});

        store.setSettings({
            service: store.HasService === true ? 1 : 0,
            score_type: store.HasWinner === true ? 1 : 0,
            shot: store.HasStroke === true ? 1 : 0,
            shot_type: store.HasStrokeType === true ? 1 : 0,
        }).then(() => {
            this.setState({isLoading: false});
            navigator.push({
                screen: 'Menu',
                navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                animationType: 'fade',

            })
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
                <Navbar title={'Statistieken instellingen'} rightBtnTitle={'Opslaan'} onPressRightBtn={this.onSavePress}
                        leftBtnTitle={this.props.backTitle} onPressLeftBtn={() => navigator.push({
                    screen: 'Menu',
                    navigatorStyle: {...UI.NAVIGATION_STYLE, navBarHidden: true},
                    animationType: 'fade',

                })}/>

                <PersonRow title={store.User.name}/>
                <ScrollView contentContainerStyle={{paddingBottom: 70}}>
                    <View style={{width: width, padding: 20, paddingTop: 10, paddingBottom: 10}}>
                        <Text
                            style={[UI.regularWhiteText25,{
                                fontSize: 16,
                            }]}>Geef in deze stap aan wat je aan statistieken wilt
                            terug zien. Kies daarna voor “Save”.</Text>
                    </View>

                    <View style={[styles.listView,{marginTop:0}]}>
                        <Text
                            style={[UI.regularWhiteText25,{
                                fontSize: 16,
                            }]}>Punten teller</Text>
                        <Switch style={{transform: [{scaleX: .8}, {scaleY: .8}]}} onTintColor={UI.COLORS_HEX.orange}
                                tintColor={Platform.OS === 'ios' ? UI.COLORS_HEX.orange : UI.COLORS_HEX.lightGray}
                                thumbTintColor={'white'} onValueChange={(val) => this.setState({punten: true})}
                                value={this.state.punten} disabled={true}/>
                    </View>

                    <View style={styles.listView}>
                        <Text
                            style={[UI.regularWhiteText25,{
                                fontSize: 16,
                            }]}>Service</Text>
                        <Switch style={{transform: [{scaleX: .8}, {scaleY: .8}]}} onTintColor={UI.COLORS_HEX.orange}
                                tintColor={Platform.OS === 'ios' ? UI.COLORS_HEX.orange : UI.COLORS_HEX.lightGray}
                                thumbTintColor={'white'} onValueChange={(val) => store.setHasService(val)}
                                value={store.HasService}/>
                    </View>

                    <View style={styles.listView}>
                        <Text
                            style={[UI.regularWhiteText25,{
                                fontSize: 16,
                            }]}>Winner, (Un)forced Error</Text>
                        <Switch style={{transform: [{scaleX: .8}, {scaleY: .8}]}} onTintColor={UI.COLORS_HEX.orange}
                                tintColor={Platform.OS === 'ios' ? UI.COLORS_HEX.orange : UI.COLORS_HEX.lightGray}
                                thumbTintColor={'white'} onValueChange={(val) => store.setHasWinner(val)}
                                value={store.HasWinner}/>
                    </View>
                    <View style={styles.listView}>
                        <Text
                            style={[UI.regularWhiteText25,{
                                fontSize: 16,
                            }]}>Slag (BH/FH)</Text>
                        <Switch style={{transform: [{scaleX: .8}, {scaleY: .8}]}} onTintColor={UI.COLORS_HEX.orange}
                                tintColor={Platform.OS === 'ios' ? UI.COLORS_HEX.orange : UI.COLORS_HEX.lightGray}
                                thumbTintColor={'white'} onValueChange={(val) => store.setHasStroke(val)}
                                value={store.HasStroke}/>
                    </View>


                    <View style={styles.listView}>
                        <Text
                            style={[UI.regularWhiteText25,{
                                fontSize: 16,
                            }]}>Type slag</Text>
                        <Switch style={{transform: [{scaleX: .8}, {scaleY: .8}]}} onTintColor={UI.COLORS_HEX.orange}
                                tintColor={Platform.OS === 'ios' ? UI.COLORS_HEX.orange : UI.COLORS_HEX.lightGray}
                                thumbTintColor={'white'} onValueChange={(val) => {

                            if (store.HasStroke === false && store.HasStrokeType === false) {
                                store.setHasStroke(true)
                            }
                            store.setHasStrokeType(val);
                        }}
                                value={store.HasStrokeType}/>
                    </View>
                </ScrollView>
                <Footer/>

                {this.state.isLoading && <Loading/>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    listView: {
        width: width,
        padding: 20,
        backgroundColor: UI.COLORS_HEX.gray,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 6,
        paddingBottom: 6,
        alignItems: 'center',
        marginTop: 10
    },
});

