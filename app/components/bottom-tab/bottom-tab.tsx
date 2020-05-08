import * as React from "react"
import { View, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { presets } from "./bottom-tab.presets"
import { ViewProps } from "./bottom-tab.props"
import { mergeAll, flatten } from "ramda"
import { color, dimensions, fontsize } from "../../theme"
import { Badge, } from 'native-base';
import { Text } from './../text'


export function BottomTab(props: ViewProps) {

  // grab the props
  const { preset = "default",
    txOptions,
    text,
    children,
    style: styleOverride,
    tabs,
    tabStyle,
    tabTextStyle,
    ...rest } = props
  const content = text || children
  const style = mergeAll(flatten([presets[preset] || presets.default, styleOverride]))
  const TAB_VIEW: ViewStyle = {
    backgroundColor: color.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.width / tabs.length,
  }
  const TAB_TEXT: TextStyle = { color: color.text, fontSize: fontsize.screenTitle }
  let Tabs = []
  tabs.map((res, i) => {
    Tabs.push(
      <TouchableOpacity style={{ ...TAB_VIEW, ...tabStyle, borderLeftWidth: i == 0 ? 0 : 0.6, borderLeftColor: 'white' }} onPress={() => props.onPress(res)}>
        {/* <Badge primary style={{ alignSelf: 'center', minWidth: dimensions.width * 0.066, minHeight: dimensions.width * 0.066 }}>
          <Text style={{ alignSelf: 'center', fontSize: fontsize.smallText }}>6</Text>
        </Badge> */}
        < Text style={{ ...TAB_TEXT, ...tabTextStyle }}>{res.tab}</Text>
      </TouchableOpacity>
    )
  })

  return (
    <View style={style}
      {...rest}>
      {Tabs}
    </View>
  )
}
