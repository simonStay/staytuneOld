import * as React from "react"
import { TouchableOpacity, Image } from "react-native"
import { viewPresets } from "./avatar.presets"
import { AvatarProps } from "./avatar.props"
import { mergeAll, flatten } from "ramda"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Avatar(props: AvatarProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    avatarStyle: avatarStyleOverride,
    children,
    ...rest
  } = props

  const viewStyle = mergeAll(flatten([viewPresets[preset] || viewPresets.primary, styleOverride]))
  const avatarStyle = { width: 100, height: 100, borderRadius: 50 }

  const content = children || (
    <Image
      source={{ uri: "https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png" }}
      style={avatarStyle}
    />
  )

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {content}
    </TouchableOpacity>
  )
}
