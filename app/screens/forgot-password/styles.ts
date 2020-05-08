import { StyleSheet } from "react-native"
import { color, dimensions, fontsize } from "../../theme"

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: color.ImageBackgroundColor,
  },
  contentStyle: {
    flex: 1,
  },
  textStyle: {
    color: color.text,
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 10,
    fontFamily: "OpenSans-Semibold",
  },
  inputStyle: {
    marginHorizontal: 20,
    height: dimensions.height / 15.6,
    borderRadius: 10,
    borderColor: "#969696",
    borderWidth: 0,
    textAlign: "center",
    color: color.textColor,
    fontSize: 19,
    fontFamily: "OpenSans",
  },
  wallpaper: { flex: 1 },
  logo: {
    height: 80,
    width: 80,
    marginTop: 10,
    alignSelf: "center",
    marginVertical: 10,
  },
  button: {
    marginHorizontal: 20,
    height: dimensions.height / 15.6,
    borderRadius: 10,
    marginTop: 20,
    color: color.buttonColor,
  },
  buttonText: {
    color: color.text,
    fontSize: fontsize.buttonText,
    fontWeight: "600",
    fontFamily: "OpenSans-Semibold",
  },
  header: {
    backgroundColor: "transparent",
    height: 88,
  },
  backArrow: {
    height: 40,
    width: 40,
    marginTop: 84,
    marginLeft: 20,
    marginVertical: 10,
  },
})

export default styles
