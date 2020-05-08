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
  textField: {
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
  scrollContainer: { flex: 1, justifyContent: "center" },
  logo: {
    height: 80,
    width: 80,
    marginTop: 100,
    alignSelf: "center",
    marginVertical: 10,
  },
  welcomeText: {
    color: color.text,
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 10,
    fontFamily: "OpenSans-Semibold",
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
  bottomText: {
    fontSize: 19,
    color: color.text,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    fontFamily: "OpenSans-Semibold",
  },
})

export default styles
