import { ViewStyle, ViewProps as ViewProperties } from "react-native"
import { goldBarPresets } from "./goldBar.presets"

export interface ViewProps extends ViewProperties {

  children?: React.ReactNode
  txOptions?: object
  text?: string
  style?: ViewStyle | ViewStyle[]
  preset?: goldBarPresets
}
