import React, { Component } from "react"
import { View, TextInput, FlatList } from "react-native"
import { Text } from '../text'
import { Icon } from "../icon"
import styles from "./styles"
import SearchBarProps from "./search-bar.props"

class SearchBar extends Component<SearchBarProps, {}> {
    constructor(props: SearchBarProps) {
        super(props)
    }
    placesListView(item, index) {
        console.log("index", index)
        console.log("item_123", JSON.stringify(item))
        return (
            <View style={index == 0 ? styles.topPlace : styles.singlePlace}>
                <View style={styles.placeAlign}>
                    <Text style={styles.text}>{item.primaryText}</Text>
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.searchView}>
                <View style={this.props.SearchValue !== "" ? styles.withSearchList : styles.searchBar}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 0.2 }} >
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon icon={"search"} style={styles.searchIcon} />
                            </View>
                        </View>
                        <View style={{ flex: 0.8 }} >
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    underlineColorAndroid="white"
                                    placeholder="Search any place...."
                                    value={this.props.SearchValue}
                                    style={styles.searchTextinput}
                                    onChange={this.props.onSearchValueChange}
                                    // editable={false}
                                    onTouchStart={this.props.onTouchStart}
                                    allowFontScaling={false} />
                            </View>
                        </View>
                    </View>
                </View>
                {this.props.places.length != 0 && this.props.SearchValue !== '' ? (
                    <View style={styles.searchList}>
                        <FlatList
                            data={this.props.places}
                            renderItem={({ item, index }) => this.placesListView(item, index)}
                        />
                    </View>
                ) : null}
            </View>
        )
    }
}

export default SearchBar