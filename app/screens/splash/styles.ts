import { StyleSheet } from "react-native"
import { color } from "../../theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.ImageBackgroundColor,
  },
  contentStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  subTextStyle: { color: "white", fontSize: 41, fontWeight: "600" },
  textStyle: { color: "white", fontSize: 26, fontWeight: "600" },
})

export default styles
