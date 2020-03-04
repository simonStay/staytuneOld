import { StyleSheet } from "react-native"
import { color, dimensions, fontsize, spacing } from "../../theme"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: color.ImageBackgroundColor
    },
    wallpaper: { flex: 1 },
    header: { backgroundColor: color.primaryColor },
    headerTitle: {
        color: color.headerTitle,
        fontFamily: "OpenSans-Semibold",
        marginRight: spacing[3]
    },
    textStyle: {
        color: color.text,
        fontSize: fontsize.screenTitle,
        textAlign: "center",
        marginHorizontal: spacing[1],
        marginBottom: spacing[1],
        marginTop: spacing[6],
        fontFamily: "OpenSans-Semibold",
        textShadowColor: color.textColor,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 0,
    },
    inputStyle: {
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
    button: {
        marginHorizontal: 20,
        height: dimensions.height / 15.6,
        borderRadius: 10,
        marginBottom: 30,
        color: color.buttonColor,
        flexDirection: 'row',
        //marginTop: dimensions.height / 6.5
    },
    buttonText: {
        color: color.text,
        fontSize: fontsize.buttonText,
        alignSelf: 'center',
        fontWeight: "600",
        fontFamily: "OpenSans-Semibold",
    },
    iconStyle: {
        width: 30,
        height: 30,
        justifyContent: 'flex-end',
        alignItems: 'center',
        tintColor: '#fff'
    },
    scrollContainer: { flex: 1, justifyContent: 'center' },
    mainListView: {
        marginHorizontal: 10,
        backgroundColor: color.primaryColor,
        marginTop: dimensions.width * 0.063,
        height: dimensions.width * 0.149,
        justifyContent: 'center',
        paddingHorizontal: 10,
        // shadowColor: 'blue',
        // shadowOffset: { width: 1, height: 1 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 6
    },
    subListView: {
        marginHorizontal: 10,
        backgroundColor: color.text,
        justifyContent: 'center',
    },
    subListRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        height: dimensions.width * 0.149,
        backgroundColor: color.background,
        width: '100%',
        borderBottomColor: color.lightLine,
        alignItems: 'center'
    },
    preferenceRow: {
        flexDirection: 'row',
    },
    preferenceLeftRow: {
        flex: 0.9
    },
    preferenceRightRow: {
        flex: 0.1,
        alignItems: 'flex-end'
    },
    preferenceText: {
        color: color.text,
        fontSize: fontsize.menuText,
        fontWeight: "600",
        alignSelf: 'flex-start',
        fontFamily: "OpenSans-Semibold",
    },
    toggleBackIcon: {
        width: dimensions.width * 0.06,
        height: dimensions.width * 0.06,
        justifyContent: 'flex-end',
        tintColor: '#fff',
        transform: [{ rotateY: '180deg' }],
    },
    subListLeftRow: {
        flex: 0.84,
        justifyContent: 'center'
    },
    subListRightRow: {
        flex: 0.16,
        alignItems: 'flex-end'
    },
    subcategoryText: {
        color: color.textColor,
        fontSize: fontsize.menuText,
        alignSelf: 'flex-start',
        fontFamily: "OpenSans-Semibold",
    },
    trackOn: {
        backgroundColor: color.headerTitle,
        borderColor: color.lightLine
    },
    trackOff: {
        backgroundColor: color.switchInitialColor,
        borderColor: color.lightLine
    },
    thumbOff: { backgroundColor: color.background },
    thumbOn: { backgroundColor: color.ImageBackgroundColor },
    lottie: {
        width: 100,
        height: 100,
    },
})

export default styles
