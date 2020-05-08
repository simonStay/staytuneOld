import { StyleSheet } from "react-native"
import { color, dimensions, fontsize, spacing } from "../../theme"

const styles = StyleSheet.create({
    searchView: {
        marginTop: 10,
        position: "absolute"
    },
    searchBar: {
        width: dimensions.width - 20,
        marginLeft: 10,
        position: "absolute",
        height: dimensions.width == 414 ? 60 : 44,
        borderRadius: 10,
        backgroundColor: "#fff",
    },
    withSearchList: {
        width: dimensions.width - 20,
        marginLeft: 10,
        position: "absolute",
        height: dimensions.width == 414 ? 60 : 44,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: "#fff"
    },
    searchList: {
        flex: 1,
        position: "absolute",
        backgroundColor: "#fff",
        marginTop: dimensions.width == 414 ? 60 : 44,
        width: dimensions.width - 20,
        marginLeft: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
    },
    searchIcon: {
        width: dimensions.width == 414 ? 30 : 20,
        height: dimensions.width == 414 ? 30 : 20
    },
    searchTextinput: {
        height: dimensions.width == 414 ? 60 : 44,
        fontFamily: "OpenSans",
        fontSize: 18
    },
    singlePlace: { paddingVertical: 15, borderBottomWidth: 2, borderBottomColor: color.line },
    topPlace: { paddingVertical: 15, borderBottomWidth: 2, borderTopWidth: 2, borderBottomColor: color.line, borderTopColor: color.line },
    placeAlign: { flex: 1, justifyContent: 'center' },
    text: { marginLeft: 20, fontFamily: "OpenSans", }
})

export default styles
