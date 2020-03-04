import * as React from "react"
import { View, Image, ImageStyle } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"
import { spacing, dimensions } from "../../theme"

const ROOT: ImageStyle = {
  resizeMode: "contain",
  height: dimensions.width * 0.10,
  width: dimensions.width * 0.10,
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle } = props
  const style: ImageStyle = { ...ROOT, ...styleOverride }

  return (
    <View style={containerStyle}>
      <Image style={style} source={icons[icon]} />
    </View>
  )
}
