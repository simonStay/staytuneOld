import { StyleSheet } from "react-native"
import { color, dimensions, fontsize } from "../../theme/"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: color.ImageBackgroundColor,
  },
  wallpaper: { flex: 1 },
  header: { backgroundColor: color.primaryColor, height: 88 },
  headerTitle: {
    fontSize: 24,
    color: color.headerTitle,
    alignSelf: "center",
    marginTop: 15,
    fontFamily: "OpenSans-Semibold",
  },
  scrollContainer: { flex: 1 },
  button: {
    marginHorizontal: 20,
    height: dimensions.height / 15.6,
    marginVertical: dimensions.width * 0.016,
    color: color.buttonColor,
  },
  buttonText: {
    color: color.text,
    fontSize: fontsize.buttonText,
    fontWeight: "600",
    fontFamily: "OpenSans-Semibold",
  },
  avatar: {
    width: dimensions.width / 3 - 40,
    height: dimensions.width / 3 - 40,
    borderRadius: (dimensions.width / 3 - 40) / 2,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  avatarImage: {
    width: dimensions.width / 3 - 40,
    height: dimensions.width / 3 - 40,
    borderRadius: (dimensions.width / 3 - 40) / 2,
    alignSelf: "center",
    position: "absolute",
  },
  avatarView: {
    width: dimensions.width / 3 - 40,
    height: dimensions.width / 3 - 40,
  },
  checkImage: {
    width: dimensions.width / 6 - 40,
    height: dimensions.width / 6 - 40,
    borderRadius: (dimensions.width / 6 - 40) / 2,
    backgroundColor: "white",
    alignSelf: "flex-end",
    zIndex: 9,
  },
  tourGuideText: {
    color: color.textColor,
    fontSize: fontsize.notificationText,
    fontWeight: "600",
    alignSelf: 'center',
    fontFamily: "OpenSans",
    marginTop: 6,
    textShadowColor: color.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  }
})

export default styles
