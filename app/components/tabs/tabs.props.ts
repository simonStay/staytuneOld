import { ViewStyle, ViewProps as ViewProperties } from "react-native"
import { tabsPresets } from "./tabs.presets"

export interface ViewProps extends ViewProperties {

  children?: React.ReactNode
  txOptions?: object
  text?: string
  style?: ViewStyle | ViewStyle[]
  preset?: tabsPresets
  TabsList?: [] | object
  onPress?: (newValue: any) => void
  selectedTabId: any
  length: any
  map: any,
  tabItemColor: any,
  separatorColor: any,
  selectedTabColor: any,
  selectedTabLineColor: any,
  separatorStyle: any,
  tabBottomStyle: any,
  tabTextStyle: any,
}
