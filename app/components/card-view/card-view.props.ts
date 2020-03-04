import { ViewStyle, ViewProps as ViewProperties } from "react-native"
import { cardViewPresets } from "./card-view.presets"

export interface ViewProps extends ViewProperties {

  children?: React.ReactNode
  txOptions?: object
  text?: string
  style?: ViewStyle | ViewStyle[]
  preset?: cardViewPresets
}
