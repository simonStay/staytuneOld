import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { spacing, fontsize, dimensions, color } from "../../theme"
import { Text } from "./../text"

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button"

const RADIO_CONTAINER: ViewStyle = {
  height: dimensions.height / 15.6,
  marginLeft: 20,
  marginRight: 20,
  marginTop: spacing[4],
  width: dimensions.width - 40,
  backgroundColor: "#fff",
  borderRadius: 10,
  minHeight: 44,
  justifyContent: 'center',
  alignItems: 'center'
}
const RADIO_ALIGN: ViewStyle = { flex: 1, flexDirection: "row" }
const RADIO_TEXT: TextStyle = {
  fontSize: fontsize.editprofileText,
  marginLeft: dimensions.width * 0.014,
  color: color.textColor,
  textAlign: "center",
  alignSelf: "center"
}

export interface RadioButtonProps {
  marialStatus: any
  selectedIndex: any
  selectedValue: any
  onPress: any
}

export const RadioButtonView: React.FunctionComponent<RadioButtonProps> = props => {
  return (
    <View style={RADIO_CONTAINER}>
      <View style={RADIO_ALIGN}>
        <Text style={RADIO_TEXT}>Martial Status:</Text>
        <RadioForm formHorizontal={true} animation={true} style={{ justifyContent: 'center', alignItems: 'center', marginTop: dimensions.width * 0.014 }}>
          {props.marialStatus.map((obj, i) => {
            return (
              <RadioButton labelHorizontal={true} key={i}>
                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={props.selectedIndex === i}
                  onPress={props.onPress}
                  buttonInnerColor={"orange"}
                  buttonOuterColor={"#000"}
                  buttonSize={dimensions.width * 0.046}
                  buttonStyle={{}}
                  buttonWrapStyle={{ alignSelf: "center", marginLeft: dimensions.width * 0.014 }}
                  allowFontScaling={false}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  onPress={props.onPress}
                  labelStyle={{
                    fontWeight: "400",
                    fontFamily: "OpenSans-Semibold",
                    fontSize: fontsize.notificationText,
                    alignSelf: "center",
                    marginLeft: dimensions.width * 0.014,
                    color: "#000",
                  }}
                  labelWrapStyle={{}}
                  allowFontScaling={false}
                />
              </RadioButton>
            )
          })}
        </RadioForm>
      </View>
    </View>
  )
}
