import { ViewStyle } from "react-native"
import { color, dimensions } from "../../theme"

const CARD_VIEW: ViewStyle = {
  backgroundColor: 'white',
  marginBottom: 15,
  shadowColor: '#363636',
  shadowOffset: {
    width: 0,
    height: 6
  },
  shadowRadius: 1,
  shadowOpacity: 0.9,
  elevation: 6
}

export const presets = {
  default: CARD_VIEW,
}

export type cardViewPresets = keyof typeof presets
