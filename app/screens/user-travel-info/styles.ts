import { StyleSheet } from "react-native"
import { color, dimensions } from "../../theme"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: color.transparent
    },
    wallpaper: { flex: 1 },
    header: { height: 88 },
    headerTitle: {
        fontSize: 24,
        color: color.headerTitle,
        alignSelf: 'center',
        marginTop: 15,
        fontFamily: "OpenSans-Semibold"
    },
    nameText: {
        color: color.text,
        fontSize: 23,
        fontWeight: "600",
        fontFamily: "OpenSans",
    },
    editText: {
        color: color.text,
        fontSize: 16,
        fontFamily: "OpenSans",
    },
    userContainer: {
        flex: 1,
        flexDirection: "row"
    },
    leftContainer: {
        flex: 0.3,
        //backgroundColor: "orange",
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightContainer: {
        flex: 0.7,
        flexDirection: "column",
        //backgroundColor: "blue",
        alignItems: 'baseline'
    },
    profilePicView: {
        width: dimensions.width / 2.6 - 60,
        height: dimensions.width / 2.6 - 60,
        borderRadius: (dimensions.width / 2.6 - 60) / 2,
        marginHorizontal: 20,
        //marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    profilePic: {
        width: dimensions.width / 2.6 - 60,
        height: dimensions.width / 2.6 - 60,
        borderRadius: (dimensions.width / 2.6 - 60) / 2,
        backgroundColor: color.background
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
    userInfoUpperText: {
        color: color.text,
        fontSize: 25,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "OpenSans-Semibold",
        textShadowColor: color.textColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0
    },
    userInfoBottomText: {
        color: "blue",
        fontSize: 19,
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: "OpenSans-Semibold",
    },
    line: {
        width: dimensions.width / 2,
        alignSelf: 'center',
        height: 1,
        backgroundColor: color.storybookDarkBg,
        marginTop: 3,
        marginBottom: 10
    },
    scrollContainer: { flex: 1, justifyContent: 'center' },
})

export default styles
