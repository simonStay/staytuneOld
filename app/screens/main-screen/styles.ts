import { StyleSheet } from "react-native"
import { color, dimensions, fontsize } from "../../theme"
import { textPresets } from '../../components/button/button.presets';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: color.ImageBackgroundColor
    },
    wallpaper: { flex: 1 },
    header: { backgroundColor: color.primaryColor },
    headerView: { backgroundColor: color.primaryColor },
    headerTitle: {
        color: color.headerTitle,
        fontFamily: "OpenSans-Semibold"
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
    scrollContainer: { flex: 1, justifyContent: 'center' },
})

export default styles
