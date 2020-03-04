import { ViewStyle } from "react-native"
import { color, dimensions } from "../../theme"

const GRADIENTVIEW: ViewStyle = {
  height: dimensions.height * 0.016,
  width: dimensions.width,
}

export const presets = {
  default: GRADIENTVIEW,
}

export type goldBarPresets = keyof typeof presets
