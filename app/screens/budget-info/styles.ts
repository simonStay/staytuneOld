import { StyleSheet } from "react-native"
import { color, dimensions, fontsize, spacing } from "../../theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.transparent,
  },
  innerCircle: {},
  wallpaper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  initialText: {
    color: color.text,
    fontSize: 31,
    fontWeight: "600",
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: "OpenSans-Semibold",
    textShadowColor: color.textColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0
  },
  progressCircleView: { flexDirection: 'row', marginBottom: dimensions.width * 0.06 },
  percentText: {
    color: color.textColor,
    fontSize: fontsize.percentTitle,
    textAlign: "center",
    fontFamily: "OpenSans-bold",
    fontWeight: "600",
    textShadowColor: color.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  spentText: {
    color: color.textColor,
    fontSize: fontsize.menuText,
    alignSelf: "center",
    fontFamily: "OpenSans-Semibold",
    textShadowColor: color.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  totalBudgetText: {
    color: color.textColor,
    fontSize: fontsize.screenTitle,
    textAlign: "center",
    fontFamily: "OpenSans-bold",
    fontWeight: "600",
    textShadowColor: color.primary,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  amountText: {
    color: color.text,
    fontSize: fontsize.screenTitle,
    textAlign: "center",
    fontFamily: "OpenSans-bold",
    fontWeight: "600",
    textShadowColor: color.textColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  warnText: {
    color: "#e32616",
    fontSize: fontsize.editprofileText,
    textAlign: "center",
    fontFamily: "OpenSans-bold",
    fontWeight: "600",
    textShadowColor: color.textColor,
    textShadowOffset: { width: 0.6, height: 1 },
    textShadowRadius: 0,
    marginBottom: spacing[6]
  },
  line: { height: 0.6, width: dimensions.width / 3, backgroundColor: color.primaryColor, alignSelf: 'center', marginVertical: 10 },
  leftContainer: {
    flex: 0.54,
    alignItems: 'center',
    // backgroundColor: 'grey',
    padding: 10
  },
  rightContainer: {
    flex: 0.46,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'pink',
    padding: 10
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
  cardHeader: {
    height: dimensions.width * 0.13,
    justifyContent: 'space-between',
    backgroundColor: color.primary,
    flexDirection: 'row'
  },
  headerText: {
    color: color.textColor,
    fontSize: fontsize.editprofileText,
    fontFamily: "OpenSans-bold",
    marginLeft: spacing[3],
    alignSelf: 'center'
  },
  dateText: {
    color: color.textColor,
    fontSize: fontsize.smallText,
    fontWeight: '600',
    fontFamily: "OpenSans",
    alignSelf: 'center',
    marginRight: spacing[3]
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.background,
    padding: spacing[3],
  },
  bodyText: {
    color: color.textColor,
    fontSize: fontsize.editprofileText,
    fontFamily: "OpenSans",
  }
})

export default styles
