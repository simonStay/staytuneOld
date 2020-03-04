import { ViewStyle } from "react-native"
import { color, dimensions } from "../../theme"

const TABVIEW: ViewStyle = {
  height: dimensions.height * 0.09,
  width: dimensions.width,
  flexDirection: 'row',
  justifyContent: 'space-around',
  backgroundColor: color.ImageBackgroundColor
}

export const presets = {
  default: TABVIEW,
}

export type bottomTabPresets = keyof typeof presets
