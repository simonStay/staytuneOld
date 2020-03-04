import { StyleSheet } from "react-native"
import { color, dimensions, fontsize, spacing } from "../../theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: color.ImageBackgroundColor,
  },
  header: { backgroundColor: color.primaryColor, height: 88 },
  mapView: { flex: 1 },
  headerTitle: {
    fontSize: 24,
    color: color.headerTitle,
    alignSelf: "center",
    marginTop: 15,
    fontFamily: "OpenSans-Semibold",
  },
  profilePicView: {
    width: dimensions.width / 2 - 60,
    height: dimensions.width / 2 - 60,
    borderRadius: (dimensions.width / 2 - 60) / 2,
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: color.text,
  },
  profilePic: {
    width: dimensions.width / 2 - 60,
    height: dimensions.width / 2 - 60,
    borderRadius: (dimensions.width / 2 - 60) / 2,
  },
  startPlan: {
    width: dimensions.width - 40,
    marginLeft: 20,
    position: "absolute",
    height: 60,
    backgroundColor: color.buttonColor,
    marginTop: dimensions.width == 414 ? dimensions.height - 300 : dimensions.height - 240,
    borderRadius: 10,
  },
  buttonText: {
    color: color.text,
    fontSize: fontsize.buttonText,
    alignSelf: "center",
    fontWeight: "600",
    fontFamily: "OpenSans-Semibold",
  },
  icon: {
    width: dimensions.width * 0.076,
    marginRight: 10,
    height: dimensions.width * 0.076,
    alignSelf: "flex-end",
    transform: [{ rotateY: "180deg" }],
  },
  left: {
    flex: 0.8,
    justifyContent: "center",
    height: 60,
  },
  right: {
    flex: 0.2,
    height: 60,
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
})

export default styles
