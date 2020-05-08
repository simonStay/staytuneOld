import { StyleSheet } from "react-native"
import { color, fontsize, dimensions, spacing } from "../../theme"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: color.transparent,
    },
    wallpaper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { backgroundColor: color.primaryColor },
    headerTitle: {
        color: color.headerTitle,
        fontFamily: "OpenSans-Semibold",
        marginRight: spacing[3]
    },
    placeText: {
        color: color.textColor,
        fontFamily: "OpenSans-Semibold",
        fontWeight: '600',
        marginLeft: dimensions.width * 0.016,
        fontSize: fontsize.buttonText,
        textShadowColor: color.textColor,
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 0,
    },
    leftIcon: { fontSize: fontsize.editprofileText },
    rightText: {
        color: color.textColor,
        fontFamily: "OpenSans",
        fontWeight: '600',
        marginTop: dimensions.width * 0.016,
        marginLeft: dimensions.width * 0.016,
        fontSize: fontsize.notificationText,
    },
    button: {
        width: dimensions.width / 5.6,
        height: dimensions.width / 5.6,
        borderRadius: dimensions.width * 0.6,
        backgroundColor: '#61ff96',
        flexDirection: "row",
        justifyContent: 'space-evenly'
    },
    buttonText: {
        color: color.textColor,
        fontSize: fontsize.notificationText,
        alignSelf: "center",
        fontWeight: "600",
        fontFamily: "OpenSans-Semibold",
    },
    lottie: {
        width: 100,
        height: 100,
    },
})

export default styles
