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
    height: dimensions.width == 414 ? 60 : 44,
    backgroundColor: color.buttonColor,
    marginTop: dimensions.width == 414 ? dimensions.height - 320 : dimensions.height - 240,
    borderRadius: 10,
  },
  disableStartPlan: {
    width: dimensions.width - 40,
    marginLeft: 20,
    position: "absolute",
    height: dimensions.width == 414 ? 60 : 44,
    backgroundColor: '#cccccc',
    marginTop: dimensions.width == 414 ? dimensions.height - 320 : dimensions.height - 240,
    borderRadius: 10,
  },
  filter: {
    width: dimensions.width == 414 ? 60 : 50,
    marginLeft: dimensions.width - 80,
    position: "absolute",
    height: dimensions.width == 414 ? 60 : 50,
    backgroundColor: '#000',
    marginTop: dimensions.width == 414 ? dimensions.height - 250 : dimensions.height - 190,
    borderRadius: dimensions.width == 414 ? 30 : 25,
  },
  searchBar: {
    width: dimensions.width - 20,
    marginLeft: 10,
    position: "absolute",
    height: dimensions.width == 414 ? 60 : 44,
    borderRadius: 10,
    backgroundColor: "#fff",
    marginTop: 10,
    //marginTop: dimensions.width == 414 ? 84 : 64,
    // borderRadius: ,
  },
  searchTextinput: {
    height: dimensions.width == 414 ? 60 : 44,
  },
  autoSearchView: {
    position: "absolute",
    marginTop: dimensions.width == 414 ? 70 : 54,
    marginLeft: 10,
    height: dimensions.height / 4,
    width: dimensions.width - 20,
    backgroundColor: "#fff",
  },
  searchIcon: {
    width: dimensions.width == 414 ? 30 : 20,
    height: dimensions.width == 414 ? 30 : 20
  },
  buttonText: {
    color: color.text,
    fontSize: dimensions.width == 414 ? fontsize.buttonText : 20,
    marginTop: dimensions.width == 414 ? 10 : 8,
    alignSelf: "center",
    fontWeight: "600",
    fontFamily: "OpenSans-Semibold",
  },
  icon: {
    width: dimensions.width * 0.076,
    marginRight: 10,
    height: dimensions.width * 0.076,
    alignSelf: "flex-end",
    marginTop: dimensions.width == 414 ? 12 : 10,
    transform: [{ rotateY: "180deg" }],
  },
  left: {
    flex: 0.8,
    //justifyContent: "center",
    height: 60,
  },
  right: {
    flex: 0.2,
    height: 60,
    //  justifyContent: "center",
  },
  map: {
    flex: 1,
  },
  topIcon: { width: 100, position: 'absolute', top: 0, right: 0, marginTop: dimensions.width == 414 ? 35 : 20 },
  list: {
    height: dimensions.width == 414 ? dimensions.height - 174 : dimensions.height - 154,
    backgroundColor: 'white'
  },
  goldBar: { width: dimensions.width == 414 ? 60 : 50, height: dimensions.width == 414 ? 60 : 50, borderRadius: dimensions.width == 414 ? 30 : 25 },
  filterIcon: { marginTop: dimensions.width == 414 ? 15 : 10, alignSelf: 'center', height: 30, width: 30 },
  initialUserModal: { height: 150, width: dimensions.width - 40, backgroundColor: '#FFFFFF', alignSelf: 'center', marginTop: dimensions.width == 414 ? dimensions.height / 2 : dimensions.height / 2 - 40, borderWidth: 1, borderRadius: 10, borderColor: 'transparent' },
  modalHeader: {
    height: 100
  },
  headerText: {
    fontSize: dimensions.width == 414 ? 18 : 17,
    color: '#000',
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    fontFamily: "OpenSans",
  },
  skipButton: {
    height: 50,
    width: 100,
    backgroundColor: 'orange',
    borderColor: 'transparent',
    alignSelf: "flex-end",
    borderWidth: 1,
    borderBottomRightRadius: 10
  },
  headerAlign: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalFooter: {
    height: 50
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 40,
    alignSelf: "center",
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fff'
  },
  triangleDown: {
    transform: [
      { rotate: '180deg' }
    ]
  }
  //cross: { width: 100, position: 'absolute', top: 0, right: 0, marginTop: dimensions.width == 414 ? 35 : 30 }
})

export default styles
