import { Dimensions } from "react-native";

export const AppColors = {

    themeColor: '#625b9c',
    secondThemeColor: '#ffc3a0',
    whiteColor:'#ffffff',
    grayColor:"gray",
    blackColor:'#000000',
    darkBrown:"#4b2e2e"
}



export const AppFonts= {
  FontBold: 'Montserrat-Bold',
  FontBoldItalic: 'Montserrat-BoldItalic',
  FontExtraBold: 'Montserrat-ExtraBold',
  FontExtraBoldItalic: 'Montserrat-ExtraBoldItalic',
  FontExtraLightItalic: 'Montserrat-ExtraLightItalic',
  FontItalic: 'Montserrat-Italic',
  FontLight: 'Montserrat-Light',
  FontLightItalic: 'Montserrat-LightItalic',
  FontMedium: 'Montserrat-Medium',
  FontMediumItalic: 'Montserrat-MediumItalic',
  FontRegular: 'Montserrat-Regular',
  FontSemiBold: 'Montserrat-SemiBold',
  FontSemiBoldItalic: 'Montserrat-SemiBoldItalic',
  FontBlack: 'Montserrat-Black',
  FontBlackItalic: 'Montserrat-BlackItalic',
  FontExtraLight: 'Montserrat-ExtraLight',
  FontThin: 'Montserrat-Thin',
  FontThinItalic: 'Montserrat-ThinItalic',
}

  const { width, height } = Dimensions.get('window');

  export function setWidth(percentage:number) {

    return width*percentage/100
    
  }

  export function setHeight(percentage:number) {
    return height*percentage/100
    
  }


  