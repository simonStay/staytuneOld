import { StyleSheet } from "react-native"
import { color, dimensions, fontsize, spacing } from "../../theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: color.transparent,
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
  listImage: {
    width: dimensions.width / 2,
    height: dimensions.width / 2,
    alignItems: 'center',
    justifyContent: "center",
  },
  textStyle: {
    color: color.text,
    fontSize: fontsize.screenTitle,
    textAlign: "center",
    marginHorizontal: spacing[1],
    marginVertical: spacing[5],
    fontFamily: "OpenSans-Semibold",
    textShadowColor: color.textColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  transparentView: {
    width: dimensions.width / 2,
    height: dimensions.width / 2,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: "center",
    opacity: 0.42,
  },
  categoryText: {
    color: color.text,
    fontSize: fontsize.editprofileText,
    alignSelf: "center",
    fontFamily: "OpenSans-Semibold",
    textShadowColor: color.textColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  elevateView: {
    width: dimensions.width / 2,
    height: dimensions.width / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkImage: {
    width: dimensions.width / 6 - 40,
    height: dimensions.width / 6 - 40,
    borderRadius: (dimensions.width / 6 - 40) / 2,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    right: 0,
    margin: 3
  },
  icon: {
    width: dimensions.width * 0.076,
    marginRight: 3,
    height: dimensions.width * 0.076,
    alignSelf: 'flex-end',
    transform: [{ rotateY: '180deg' }],
  },
  button: {
    marginHorizontal: 20,
    height: dimensions.height / 15.6,
    borderRadius: 10,
    marginVertical: dimensions.width * 0.016,
    color: color.buttonColor,
    flexDirection: 'row'
  },
  buttonText: {
    color: color.text,
    fontSize: fontsize.buttonText,
    alignSelf: 'flex-end',
    fontWeight: "600",
    fontFamily: "OpenSans-Semibold",
  },
  buttonLeft: { flex: 0.6, justifyContent: 'flex-end' },
  buttonRight: { flex: 0.4, justifyContent: 'flex-start' },
  lottie: {
    width: 100,
    height: 100,
  },
})

export default styles
