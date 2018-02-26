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
                paddingLeft: 10,
                borderColor: UI.COLORS_HEX.orange,
                borderBottomWidth: 1,
                paddingBottom: 10,
            }}>
                {this.props.url!==undefined &&
                    <Image source={{uri: this.props.url}}
                           style={{
                               width: 70,
                               height: 70,
                               borderRadius:35
                           }}/>}
                <Text
                    style={{
                        fontFamily: UI.FONT.regular,
                        color: UI.COLORS_HEX.white,
                        fontSize: 22,
                        marginLeft: 10,
                        flex: 1
                    }}>{this.props.title}</Text>
            </View>

        );
    }


}
