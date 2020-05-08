import { StyleSheet } from "react-native"
import { color, fontsize, dimensions } from "../../theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: color.transparent,
  },
  wallpaper: { flex: 1 },
  innerContainer: {
    flex: 1,
    marginHorizontal: dimensions.width * 0.0246,
    marginTop: dimensions.width * 0.016
  },
  innerCardView: {
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: dimensions.width * 0.036
  },
  notificationView: { flexDirection: 'row' },
  notificationText: {
    color: color.lightLine,
    fontSize: fontsize.notificationText,
    fontFamily: "OpenSans-semibold",
    textShadowColor: color.textColor,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 0,
    textAlign: 'justify',
    marginTop: dimensions.width * 0.016
  },
  iconView: {
    width: dimensions.width * 0.146,
    height: dimensions.width * 0.146,
    borderRadius: (dimensions.width * 0.146) / 2,
    borderWidth: 0.6,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  },
  appIcon: {
    width: dimensions.width * 0.126,
    height: dimensions.width * 0.126,
    alignSelf: 'center',
  },
  titleView: {
    flex: 0.6,
    paddingLeft: 6
  },
  appName: {
    color: color.textColor,
    fontSize: fontsize.notificationText,
    alignSelf: "flex-start",
    fontFamily: "OpenSans-semibold",
  },
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
  lottie: {
    width: 100,
    height: 100,
  },
})

export default styles
