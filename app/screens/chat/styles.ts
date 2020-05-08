import { StyleSheet } from "react-native"
import { color, dimensions } from "../../theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: color.transparent,
    paddingTop: dimensions.width * 0.036
  },
  wallpaper: { flex: 1 },
  initialText: {
    color: color.text,
    fontSize: 31,
    fontWeight: "600",
    alignSelf: "center",
    fontFamily: "OpenSans-Semibold",
    textShadowColor: color.textColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  scrollContainer: { flex: 1, justifyContent: "center" },
})

export default styles
