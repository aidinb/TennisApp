import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Platform,
    FlatList
} from 'react-native';
import UI from '../assets/UI';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {inject, observer} from 'mobx-react/native';

let {height, width} = Dimensions.get('window');

@inject("store") @observer
export default class KiesCat extends Component {
    constructor(props) {
        super(props);
    }

    renderItem = ({item, index}) => {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => this.props.onSelectKies(item)}
                              style={{
                                  width: width,
                                  padding: 15,
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  paddingTop: 10
                              }}>

                <Text
                    style={{
                        fontFamily: UI.FONT.regular,
                        color: UI.COLORS_HEX.white,
                        fontSize: 17,
                        marginTop: -3,
                        flex: 1
                    }}>{item.name}</Text>
                <Ionicons name="ios-arrow-forward" size={28} color={UI.COLORS_HEX.darkGray}/>

            </TouchableOpacity>
        )
    }

    render() {
        const {store, navigator} = this.props;

        return (

            <View style={{
                height:height,
                paddingTop:20,
                paddingBottom:20,
                backgroundColor:Platform.OS==='ios'?'transparent':UI.COLORS_HEX.black,
                flex:1
            }}>
                    {store.TournamentCourts && <FlatList data={store.TournamentCourts}
                                                         keyExtractor={(item, index) => 'Court_' + item.id}
                                                         renderItem={this.renderItem}
                                                         contentContainerStyle={{alignItems: 'center'}}
                                                         style={{
                                                             width: Platform.OS === 'ios' ? width - 30 : width,
                                                             padding: 10,
                                                         }}
                    />}

            </View>

        );
    }


}
