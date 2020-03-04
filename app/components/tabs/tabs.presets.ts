import { ViewStyle } from "react-native"
import { color, dimensions } from "../../theme"

const TABVIEW: ViewStyle = {
  height: dimensions.height * 0.06,
  width: dimensions.width,
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: 'transparent'
}

export const presets = {
  default: TABVIEW,
}

export type tabsPresets = keyof typeof presets
