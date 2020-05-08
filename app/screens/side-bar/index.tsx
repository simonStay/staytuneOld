import React, { Component } from "react"
import { View, FlatList, Image, TouchableOpacity, ScrollView } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Icon } from "../../components/icon"
import { Text } from "../../components/text"
import { GoldBarView } from "../../components/goldBar"
import ImageLoad from 'react-native-image-placeholder';

import { connect } from "react-redux"

const MenuItems = [
    { id: 0, type: "Start a plan", icon: "startplan" },
    //{ id: 1, type: "Itinerary suggestions", icon: "travelsuggestions" },
    { id: 2, type: "Travel preference", icon: "preference" },
    { id: 3, type: "Digital souvenir", icon: "souvenir" },
    { id: 4, type: "Select tour guide", icon: "tourguide" },
    { id: 5, type: "Saved locations", icon: "savedlocation" },
    { id: 6, type: "Budget", icon: "budget" },
    { id: 7, type: "Signout", icon: "logout" },
]

interface Props {
    navigation: NavigationScreenProp<NavigationState>
    onCloseMenu: any
    userInfo: any
    userProfileInfo: any
}

interface sideMenuItems {
    profilePic: string
    userName: string
}

class SideBar extends Component<Props, sideMenuItems, {}> {
    constructor(props: Props) {
        super(props)
        this.state = {
            profilePic: "",
            userName: ''
        }
    }

    async componentDidMount() {
        //console.log('nextProps_123:', nextProps.user.userDetails)
        try {
            let userDetails = await this.props.userProfileInfo
            //console.log('sidebar_componentDidMount:', this.props.userProfileInfo)
            if (userDetails.profilePic == undefined || userDetails.profilePic == "undefined") {
            } else {
                await this.setState({
                    profilePic: userDetails.profilePic,
                })
            }
            if (userDetails.firstname == undefined || userDetails.firstname == "undefined" &&
                userDetails.lastname == undefined || userDetails.lastname == "undefined") {
            } else {
                await this.setState({
                    userName: userDetails.firstname + ' ' + userDetails.lastname
                })
            }
        } catch (error) {
            console.log("error_123:", error)
        }

    }

    async componentWillReceiveProps(nextProps) {
        //console.log('nextProps_123:', nextProps.user.userDetails)
        try {
            let userDetails = await nextProps.userProfileInfo
            // console.log('nextProps_123_component:', nextProps.userProfileInfo)
            if (userDetails.profilePic == undefined || userDetails.profilePic == "undefined") {
            } else {
                await this.setState({
                    profilePic: userDetails.profilePic,
                })
            }
            if (userDetails.firstname == undefined || userDetails.firstname == "undefined" &&
                userDetails.lastname == undefined || userDetails.lastname == "undefined") {
            } else {
                await this.setState({
                    userName: userDetails.firstname + ' ' + userDetails.lastname
                })
            }
        } catch (error) {
            console.log("error_123:", error)
        }
    }

    onEditProfile() {
        this.props.onCloseMenu('Edit Profile');
    }

    onSelectedValue(value) {
        if (value == "Start a plan") {
            this.props.onCloseMenu("Start a plan")
        } else if (value == "Start a plan") {
            this.props.onCloseMenu("Start a plan")
        } else if (value == "Itinerary suggestions") {
            this.props.onCloseMenu("Itinerary suggestions")
        } else if (value == "Travel preference") {
            this.props.onCloseMenu("Travel preference")
        } else if (value == "Digital souvenir") {
            this.props.onCloseMenu("Digital souvenir")
        } else if (value == "Select tour guide") {
            this.props.onCloseMenu("Select tour guide")
        } else if (value == "Saved locations") {
            this.props.onCloseMenu("Saved locations")
        } else if (value == "Budget") {
            this.props.onCloseMenu("Budget")
        } else if (value == "Signout") {
            this.props.onCloseMenu("Signout")
        }
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={this.onSelectedValue.bind(this, item.type)}>
                <View style={styles.row}>
                    <Icon icon={item.icon} style={styles.itemIcon} />
                    <Text style={styles.itemText}>{item.type}</Text>
                </View>
                <View style={styles.line}></View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.profilePicOutterView}>
                        <View style={styles.profilePicView}>
                            <ImageLoad
                                isShowActivity={false}
                                style={styles.profilePic}
                                borderRadius={styles.profilePic.borderRadius}
                                loadingStyle={{ size: 'large', color: 'blue' }}
                                source={{ uri: this.state.profilePic }}
                                placeholderSource={require('./../../assests/person-placeholder.png')}
                                placeholderStyle={styles.profilePic}
                            />
                        </View>
                    </View>

                    <Text style={styles.nameStyle}>{this.state.userName}</Text>
                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={this.onEditProfile.bind(this)}>
                            <GoldBarView style={styles.editProfileButton}>
                                <Text style={styles.editprofileText}>EDIT PROFILE</Text>
                            </GoldBarView>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menuItemsView}>
                        <FlatList
                            data={MenuItems}
                            renderItem={this.renderItem.bind(this)}
                            scrollEnabled={false}
                        />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        userInfo: state.user.login,
    }),
    {},
)(SideBar)
