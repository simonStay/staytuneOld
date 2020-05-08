import * as React from "react"
import { View, TouchableOpacity, ViewStyle, TextStyle, ScrollView, FlatList } from "react-native"
import { presets } from "./tabs.presets"
import { ViewProps } from "./tabs.props"
import { mergeAll, flatten } from "ramda"
import { color, dimensions, fontsize } from "../../theme"
import { Text } from './../text'

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

export const Tabs: React.FunctionComponent<ViewProps> = props => {

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
  const TAB_COLOR = props.selectedTabColor || "blue"
  const TAB_VIEW: ViewStyle = {
    backgroundColor: color.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.width / props.TabsList.length,
  }

  var tabs = props.TabsList
  //const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null
  return (
    <View style={style}
      {...rest}>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: dimensions.width * 0.0106 }}
        horizontal
        data={tabs}
        renderItem={({ item, }) => (
          <TouchableOpacity style={{ marginLeft: item.id == 0 ? 0 : dimensions.width * 0.056, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }} onPress={() => props.onPress(item)}>
            <Text style={{ color: item.id == props.selectedTabId ? TAB_COLOR : TAB_ITEM_COLOR, fontSize: fontsize.notificationText, fontFamily: 'OpenSans', alignSelf: 'center', ...tabTextStyle }}>
              {item.tab}
            </Text>
            {item.id === props.selectedTabId ?
              (<View style={{ height: 1.6, width: '100%', marginBottom: -dimensions.width * 0.0076, backgroundColor: "blue", ...tabBottomStyle }}></View>)
              : null}
          </TouchableOpacity>)}
      />
    </View>
  )
}
