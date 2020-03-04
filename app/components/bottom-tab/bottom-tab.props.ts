import { ViewStyle, ViewProps as ViewProperties } from "react-native"
import { bottomTabPresets } from "./bottom-tab.presets"

export interface ViewProps extends ViewProperties {
  children?: React.ReactNode
  txOptions?: object
  text?: string
  style?: ViewStyle | ViewStyle[]
  preset?: bottomTabPresets
  TabsList?: [] | object
  onPress?: (newValue: any) => void
  tabs: any
  tabStyle?: ViewStyle | ViewStyle[]
  tabTextStyle?: any
}
