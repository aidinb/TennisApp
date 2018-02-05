import React, {Component} from 'react';
import {
    View,
    Dimensions,
    Text,
    TouchableOpacity
} from 'react-native';
import UI from '../assets/UI';
let {height, width} = Dimensions.get('window');

export default class CButton extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <TouchableOpacity style={{
                width: this.props.width ? this.props.width : width / 2 - 25,
                height: this.props.height ? this.props.height : 40,
                borderRadius: this.props.borderRadius ? this.props.borderRadius : 20,
                backgroundColor: this.props.backgroundColor,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: 'rgba(0,0,0,0.7)',
                shadowOffset: {width: 3, height: 3},
                shadowOpacity: 0.7,
                elevation: 5,

            }} activeOpacity={0.8} onPress={this.props.onPress}>
                <Text style={{
                    fontFamily: this.props.fontFamily ? this.props.fontFamily : UI.FONT.regular,
                    fontSize: this.props.fontSize ? this.props.fontSize : 18,
                    color:this.props.color ? this.props.color : UI.COLORS_HEX.white,

                }}>{this.props.title}</Text>
            </TouchableOpacity>

        );
    }


}
