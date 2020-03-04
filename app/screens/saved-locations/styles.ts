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
    alignItems: "center",
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
  cityText: {
    fontSize: fontsize.percentTitle,
    color: color.text,
    fontWeight: '600',
    fontFamily: "OpenSans-Semibold",
    alignSelf: 'center'
  },
  transparentView: {
    width: dimensions.width,
    height: dimensions.width / 2,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.42, position: 'absolute'
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
  imageView: {
    width: dimensions.width,
    height: dimensions.width / 2
  },
  elevateView: {
    width: dimensions.width,
    height: dimensions.width / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgae: {
    width: dimensions.width,
    height: dimensions.width / 2 - 30,
  },
  footer: {
    width: dimensions.width - 6,
    height: dimensions.width / 7,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
  },
  budgetText: {
    fontSize: fontsize.editprofileText,
    color: color.text,
    fontWeight: '600',
    fontFamily: "OpenSans-Semibold",
    alignSelf: 'center'
  },
  checkImage: {
    width: dimensions.width / 6 - 40,
    height: dimensions.width / 6 - 40,
    borderRadius: (dimensions.width / 6 - 40) / 2,
    backgroundColor: "white",
    position: "absolute",
    top: 0,
    right: 0,
    margin: 3,
  },
  icon: {
    width: dimensions.width * 0.076,
    height: dimensions.width * 0.076,
    alignSelf: 'center'
  },
  button: {
    marginHorizontal: 20,
    height: dimensions.height / 15.6,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    color: color.buttonColor,
    flexDirection: "row",
  },
  buttonText: {
    color: color.text,
    fontSize: fontsize.buttonText,
    alignSelf: "flex-end",
    fontWeight: "600",
    fontFamily: "OpenSans-Semibold",
  },
  buttonLeft: { flex: 0.6, justifyContent: "flex-end" },
  buttonRight: { flex: 0.4, justifyContent: "flex-start" },
  lottie: {
    width: 100,
    height: 100,
  },
})

export default styles
