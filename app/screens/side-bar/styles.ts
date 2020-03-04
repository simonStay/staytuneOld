import { StyleSheet } from "react-native"
import { color, dimensions, fontsize, spacing } from "../../theme/"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primaryColor,
    },
    buttonText: {
        color: color.text,
        fontSize: fontsize.buttonText,
        fontWeight: "600",
        fontFamily: "OpenSans-Semibold"
    },
    nameStyle: {
        color: "white",
        fontSize: fontsize.buttonText,
        fontWeight: "600",
        fontFamily: "OpenSans-Semibold",
        alignSelf: 'center',
        marginBottom: 10
    },
    profilePicOutterView: {
        flex: 0.26,
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePicView: {
        width: dimensions.width / 2 - 60,
        height: dimensions.width / 2 - 60,
        borderRadius: (dimensions.width / 2 - 60) / 2,
        marginHorizontal: 20,
        marginVertical: 20,
        backgroundColor: color.text
    },
    profilePic: {
        width: dimensions.width / 2 - 60,
        height: dimensions.width / 2 - 60,
        borderRadius: (dimensions.width / 2 - 60) / 2,
    },
    buttonView: {
        flex: 0.12,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'orange'
    },
    editProfileButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.width / 2 - 30,
        height: dimensions.width / 4 - 50,
        marginBottom: dimensions.width * 0.06
    },
    editprofileText: {
        color: color.primaryColor,
        fontSize: fontsize.editprofileText,
        fontFamily: "OpenSans-Semibold"
    },
    menuItemsView: {
        flex: 0.73,
        justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: 'blue'
    },
    row: {
        marginHorizontal: spacing[5],
        marginVertical: spacing[3],
        flexDirection: 'row',
        // alignItems: 'baseline'
    },
    line: {
        width: '90%',
        height: 1,
        backgroundColor: color.line,
        marginLeft: 15,
        marginRight: 15,
    },
    itemIcon: {
        height: dimensions.width * 0.06,
        width: dimensions.width * 0.06,
        marginTop: 0,
        marginLeft: 3,
        marginRight: 7
    },
    itemText: {
        color: color.text,
        fontSize: fontsize.menuText,
        fontFamily: "OpenSans-Semibold"
    }
})

export default styles
