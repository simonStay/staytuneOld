import { StyleSheet } from "react-native"
import { color, dimensions, fontsize, spacing } from "../../theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: color.ImageBackgroundColor,
  },
  innerCircle: {},
  wallpaper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: color.primaryColor },
  headerTitle: {
    color: color.headerTitle,
    fontFamily: "OpenSans-Semibold",
    marginRight: spacing[3]
  },
  initialText: {
    color: color.text,
    fontSize: 31,
    fontWeight: "600",
    alignSelf: 'center',
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
    color: color.text,
    fontSize: fontsize.buttonText,
    textAlign: "center",
    fontFamily: "OpenSans-bold",
    fontWeight: "600",
    textShadowColor: color.textColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  amountText: {
    color: color.text,
    fontSize: fontsize.buttonText,
    textAlign: "center",
    fontFamily: "OpenSans-bold",
    fontWeight: "600",
    textShadowColor: color.textColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  leftContainer: {
    flex: 0.54,
    alignItems: 'center',
    //backgroundColor: 'grey',
    padding: 10
  },
  rightContainer: {
    flex: 0.46,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'pink', 
    padding: 10
  },
  button: {
    marginHorizontal: 20,
    height: dimensions.height / 15.6,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 30,
    flexDirection: "row",
  },
  buttonText: {
    color: color.text,
    fontSize: fontsize.buttonText,
    alignSelf: "center",
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
    justifyContent: 'center',
    backgroundColor: color.primary,
  },
  headerText: {
    color: color.textColor,
    fontSize: fontsize.editprofileText,
    fontFamily: "OpenSans-bold",
    marginLeft: spacing[3],
    textAlign: 'center'
  },
  signText: {
    color: color.textColor,
    fontSize: fontsize.percentTitle,
    fontFamily: "OpenSans-bold",
    marginLeft: spacing[3],
    textAlign: 'center'
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: color.background,
    padding: spacing[3],
    alignItems: 'center',
    justifyContent: 'center'
  },
  bodyText: {
    color: color.textColor,
    fontSize: fontsize.editprofileText,
    fontFamily: "OpenSans",
  },
  textStyle: {
    color: color.text,
    fontSize: fontsize.screenTitle,
    textAlign: "center",
    marginHorizontal: spacing[1],
    marginBottom: spacing[5],
    marginTop: spacing[7],
    fontFamily: "OpenSans-Semibold",
    textShadowColor: color.textColor,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0,
  },
  inputStyle: {
    width: dimensions.width / 2,
    height: dimensions.height / 15.6,
    borderRadius: 10,
    borderColor: "#969696",
    borderWidth: 1,
    textAlign: "center",
    color: color.textColor,
    fontSize: fontsize.editprofileText,
    fontFamily: "OpenSans",
    alignSelf: 'center'
  },
})

export default styles
