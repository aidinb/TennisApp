import React, {Component} from 'react';
import {
    Dimensions,
    TextInput
} from 'react-native';
import UI from '../assets/UI';

let {height, width} = Dimensions.get('window');

export default class CButton extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <TextInput style={[{
                width: this.props.width ? this.props.width : width - 60,
                height: this.props.height ? this.props.height : 40,
                borderRadius: this.props.borderRadius ? this.props.borderRadius : 20,
                backgroundColor: this.props.backgroundColor?this.props.backgroundColor:UI.COLORS_HEX.white,
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: 'rgba(0,0,0,0.7)',
                shadowOffset: {width: 3, height: 3},
                shadowOpacity: 0.7,
                paddingLeft: 15
            },this.props.style]}
                       underlineColorAndroid='rgba(0,0,0,0)'
                       autoCapitalize={this.props.autoCapitalize?this.props.autoCapitalize:'none'}
                       secureTextEntry={!!this.props.secureTextEntry}
                       keyboardType={this.props.keyboardType?this.props.keyboardType:'default'}
                       onChangeText={(text) => this.props.onChangeText(text)}
                       value={this.props.value ? this.props.value : ''}
                       placeholder={this.props.placeholder}
                       placeholderTextColor={this.props.placeholderColor?this.props.placeholderColor:'silver'}
            />

        );
    }


}
