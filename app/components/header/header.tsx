import * as React from "react"
import { View, ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button"
import { Icon } from "../icon"
import { Text } from "../text"
import { spacing, dimensions } from "../../theme"
import { translate } from "../../i18n/"

// static styles

let headerHeight;
if (dimensions.width == 320) {
  headerHeight = 64
} else if (dimensions.width == 375) {
  headerHeight = 64
} else if (dimensions.width == 414) {
  headerHeight = 88
} else {
  headerHeight = 64
}

const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing[4],
  alignItems: "center",
  paddingTop: dimensions.height * 0.036,
  //paddingBottom: spacing[5],
  //justifyContent: "center",
  height: headerHeight
}
const TITLE: TextStyle = { textAlign: "center", color: '#E0B34A', fontSize: dimensions.width * 0.056, }
const TITLE_MIDDLE: ViewStyle = { flex: 1, alignItems: "center" }
const LEFT: ViewStyle = { width: dimensions.width * 0.2 }
const RIGHT: ViewStyle = { width: dimensions.width * 0.096 }
const RIGHT_TITLE: TextStyle = { color: '#E0B34A', fontSize: dimensions.width * 0.051, alignSelf: 'center' }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header: React.FunctionComponent<HeaderProps> = props => {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    rightText,
    rightTextStyle,
    titleStyle,
    from
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || "";
  const rightTxt = rightText || ""

  return (
    <View style={{ ...ROOT, ...style }}>
      {leftIcon ? (
        <Button preset="link" style={LEFT} onPress={onLeftPress}>
          <Icon icon={leftIcon} />
        </Button>
      ) : (
          <View style={LEFT} />
        )}
      <View style={TITLE_MIDDLE}>
        <Text style={{ ...TITLE, ...titleStyle }} text={header} />
      </View>
      {rightIcon ? from === 'interest' ? (<TouchableOpacity style={RIGHT} onPress={onRightPress}>
        <Text style={{ ...RIGHT_TITLE, ...rightTextStyle }} text={'Skip'} />
      </TouchableOpacity>) : (
          <Button preset="link" style={RIGHT} onPress={onRightPress}>
            <Icon icon={rightIcon} />
          </Button>
        ) : (
          <TouchableOpacity style={RIGHT} onPress={onRightPress}>
            <Text style={{ ...RIGHT_TITLE, ...rightTextStyle }} text={rightTxt} />
          </TouchableOpacity>
        )}
    </View>
  )
}
