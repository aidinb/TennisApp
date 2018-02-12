import React from 'react';
import {
    View,
    Dimensions,
    ActivityIndicator,
    Text
} from 'react-native';


let {height, width} = Dimensions.get('window');
import UI from '../assets/UI';


export default class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

    }


    render() {
        return (
            <View style={{
                position: 'absolute',
                top: 0,
                paddingTop: height / 2-70,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                zIndex: 200,
            }}
            >
                <View style={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    width: width-40,
                    height: width/2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15, paddingTop: 20
                }}>
                    <ActivityIndicator size="large" color={UI.COLORS_HEX.white}/>
                    <Text
                        style={{marginTop: 25, fontFamily: UI.FONT.bold, color: UI.COLORS_HEX.white, fontSize: 17}}>Loading</Text>

                </View>

            </View>
        )


    }
}