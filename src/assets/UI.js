import {Platform} from 'react-native';
exports.COLORS_HEX = {
    white: '#FFFFFF',
    orange: '#F7931E',
    blue: '#29ABE2',
    black: '#000000',
    lightBlack: '#1A1A1A',
    darkGray: 'rgba(255,255,255,0.8)',
    lightGray: 'rgba(255,255,255,0.5)',
    gray: '#4D4D4D',
    boxGray:'#333333',
    whiteBoxBlur:'rgba(255,255,255,0.85)'

};

exports.FONT = {
    regular: "DINPro-Regular",
    medium: "DINPro-Medium",
    blackItalic: "dinpro-blackitalic",
    bold: "DINPro-Bold",
    italic: "dinpro-italic",

};

exports.NAVIGATION_STYLE = {
    navBarTextColor: '#404040',
    navBarTextFontFamily: "Arial",
    navBarTextFontSize: 16,
    navBarButtonColor: '#404040',
    navBarTitleTextCentered: true,
    topBarElevationShadowEnabled: false,
    statusBarColor: 'black',
    navBarNoBorder: true,
    navBarTransparent: true,
    drawUnderNavBar: true,
    navBarTranslucent: Platform.OS === 'ios',
    drawUnderTabBar: true,
    statusBarTextColorScheme: 'light',
    screenBackgroundColor: 'black',
};
