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
    rightTextStyle: {
        fontFamily: "OpenSans-Semibold",
        marginLeft: - spacing[1],
        alignSelf: 'center'
    },
    textStyle: {
        color: color.text,
        fontSize: fontsize.screenTitle,
        textAlign: "center",
        marginHorizontal: spacing[1],
        //marginBottom: spacing[1],
        marginTop: spacing[7],
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
        paddingVertical: 0
        //marginTop: 6
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
        color: color.buttonColor,
        flexDirection: 'row',
        marginTop: spacing[6],
        marginBottom: spacing[6]
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
    icon: {
        width: dimensions.width * 0.076,
        marginRight: 3,
        height: dimensions.width * 0.076,
        alignSelf: 'flex-end',
        transform: [{ rotateY: '180deg' }],
    },
    scrollContainer: { flex: 1, justifyContent: 'center' },
    lottie: {
        width: 100,
        height: 100,
    },
})

export default styles
