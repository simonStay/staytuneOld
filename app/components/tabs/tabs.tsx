import * as React from "react"
import { View, Text, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { presets } from "./tabs.presets"
import { ViewProps } from "./tabs.props"
import { mergeAll, flatten } from "ramda"
import { color, dimensions, fontsize } from "../../theme"

let tabSeparatorMarginLeft;
let tabSeparatorMarginRight;
if (dimensions.width == 320) {
  tabSeparatorMarginLeft = 3.1
  tabSeparatorMarginRight = 0
} else if (dimensions.width == 375) {
  tabSeparatorMarginLeft = 0
  tabSeparatorMarginRight = 0
} else if (dimensions.width == 414) {
  tabSeparatorMarginLeft = 6.5
  tabSeparatorMarginRight = 0
} else {
  tabSeparatorMarginLeft = 0
  tabSeparatorMarginRight = 0
}

export function Tabs(props: ViewProps) {

  // grab the props
  const { preset = "default",
    txOptions,
    text,
    children,
    style: styleOverride,
    tabItemColor,
    selectedTabColor,
    separatorStyle,
    tabBottomStyle,
    tabTextStyle, ...rest } = props
  const content = text || children
  const style = mergeAll(flatten([presets[preset] || presets.default, styleOverride]))

  const TAB_ITEM_COLOR = props.tabItemColor || "white"
  const TAB_COLOR = props.selectedTabColor || "white"

  let Tabs = [];
  props.TabsList.map((res, i) => {
    Tabs.push(
      <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row', justifyContent: 'center', height: dimensions.height * 0.06 }} onPress={() => props.onPress(res)}>
        <View style={{ marginHorizontal: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}  >
            <Text style={{ color: i === props.selectedTabId ? TAB_COLOR : TAB_ITEM_COLOR, fontSize: fontsize.notificationText, fontFamily: 'OpenSans-Semibold', ...tabTextStyle }}>
              {res.tab}
            </Text>

          </ View>
          {i === props.selectedTabId ?
            (<View style={{ height: 1.6, width: '100%', backgroundColor: "blue", marginTop: 3, ...tabBottomStyle }}></View>)
            : null}
        </View>
        {i === props.TabsList.length - 1 ?
          null
          : (<View style={{ height: dimensions.height * 0.03, width: 1.6, backgroundColor: "blue", marginLeft: tabSeparatorMarginLeft, marginRight: tabSeparatorMarginRight, ...separatorStyle }} />)
        }

      </TouchableOpacity>)
  })


  return (
    <View style={style}
      {...rest}>
      {Tabs}
    </View>
  )
}
