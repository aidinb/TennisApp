import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import UI from '../assets/UI';
let {height, width} = Dimensions.get('window');

export default class PersonRow extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{
                flexDirection: 'row',
                width: width,
                alignItems: 'center',
                padding: 10,
                paddingLeft: 15,
                borderColor: UI.COLORS_HEX.orange,
                borderBottomWidth: 1,
                paddingBottom: 10
            }}>
                <Image source={require('../assets/images/placeholder.png')}
                       style={{
                           width: 70,
                           height: 70
                       }}/>
                <Text
                    style={{
                        fontFamily: UI.FONT.regular,
                        color: UI.COLORS_HEX.white,
                        fontSize: 22,
                        marginLeft: 15
                    }}>{this.props.title}</Text>
            </View>

        );
    }


}
