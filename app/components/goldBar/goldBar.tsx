import * as React from "react"
import { View } from "react-native"
import { presets } from "./goldBar.presets"
import { ViewProps } from "./goldBar.props"
import { color } from "../../theme"
import { mergeAll, flatten } from "ramda"
import LinearGradient from 'react-native-linear-gradient';

export function GoldBarView(props: ViewProps) {
  // grab the props
  const { preset = "default", txOptions, text, children, style: styleOverride, ...rest } = props
  const content = text || children
  const style = mergeAll(flatten([presets[preset] || presets.default, styleOverride]))
  return (
    <View>
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }} end={{ x: 1.0, y: 0.0 }}
        locations={[0, 0.2, 0.4, 0.6, 0.8, 1]}
        colors={color.goldBar}
        style={style}
        {...rest}>
        {content}
      </LinearGradient>
    </View>
  )
}
