import React, { Component } from "react"
import { View, Image, Alert } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { color, dimensions } from "../../theme"
import { Text } from "../../components/text"
import LinearGradient from "react-native-linear-gradient"

import { Tabs } from "../../components/tabs"
import { getUserDetails } from "../../redux/actions/user"
import { userSavedLocations } from "../../redux/actions/travel"
import { getBudgetByTravelId } from "../../redux/actions/budget"

import { connect } from "react-redux"
import SavedLocations from "../saved-locations"
import BudgetInfo from "../budget-info"

import ImageLoad from 'react-native-image-placeholder';

interface Props {
    navigation: NavigationScreenProp<NavigationState>
    tabId: any
    userSavedLocations: any
    getUserDetails: any
    userInfo: any
    handleSelectedValue: any
    onRef: any
    user: any
    travel: any
    getBudgetByTravelId: any
    budget: any
    selectedTab: any
}
interface UserInformation {
    selectedTabId: any
    fullName: string
    firstName: string
    lastName: string
    email: string
    city: string
    state: string
    zip: string
    profilePic: string
    userId: any
    userToken: any
    travelPreferenceId: any
}

const profilePic =
    "https://leics-fire.gov.uk/wp-content/uploads/2017/04/person-placeholder-300x300.png"
const TabsList = [
    { id: 0, tab: "PROFILE INFO" },
    { id: 1, tab: "BUDGET INFO" },
    { id: 2, tab: "SAVED LOCATIONS" },
    { id: 3, tab: "DIGITAL SOUVENIR" },
]

class UserTravelInfo extends Component<Props, UserInformation> {
    constructor(props: Props) {
        super(props)
        this.state = {
            selectedTabId: this.props.tabId == undefined ? 0 : this.props.tabId,
            profilePic: profilePic,
            fullName: "",
            firstName: "",
            lastName: "",
            email: "",
            city: "",
            state: "",
            zip: "",
            userId: "",
            userToken: "",
            travelPreferenceId: null,
        }
    }

    async componentDidMount() {
        try {
            let getUserInfo
            console.log("this.props.user.userProfileInfo", this.props.user.userProfileInfo)
            if (this.props.user.userProfileInfo === undefined || this.props.user.userProfileInfo === "undefined") {
                getUserInfo = this.props.user.login
                await this.setState({
                    userId: this.props.user.login.id,
                    userToken: this.props.user.login.token
                })
            } else {
                getUserInfo = this.props.user.userProfileInfo.data
                if (this.props.user.userProfileInfo !== undefined) {
                    await this.setState({
                        userId: this.props.user.userProfileInfo.data.id,
                        userToken: this.props.user.userProfileInfo.data.token
                    })
                }
            }
            console.log("UserId:", this.state.userId + "," + "UserToken:", this.state.userToken)

            await this.setState({
                profilePic: getUserInfo.profilePic,
                fullName: getUserInfo.firstname + " " + getUserInfo.lastname,
                firstName: getUserInfo.firstname,
                lastName: getUserInfo.lastname,
                email: getUserInfo.email,
                city: getUserInfo.city,
                state: getUserInfo.state,
                zip: getUserInfo.zip,
            })

            let userId = this.state.userId
            console.log("userId", userId)
            let getUserSavedLocations = await this.props.userSavedLocations(userId)

            await this.props.getBudgetByTravelId(getUserSavedLocations.payload[0].id)
            this.setState({ travelPreferenceId: getUserSavedLocations.payload[0].id })

            if (this.props.travel.loader == false && getUserSavedLocations.payload.length === 0) {
                if (this.state.selectedTabId != 0 && this.state.selectedTabId != 1) {
                    setTimeout(() => {
                        this.props.handleSelectedValue()
                    }, 100)
                }
            }
        } catch (error) {

        }
    }

    componentWillUnmount() {
        // this.props.onRef(undefined)
    }

    componentWillReceiveProps(nextProps) {
        // alert("will")
        this.setState({
            selectedTabId: nextProps.tabId,
        })
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate_123", nextProps)
    }

    selectedTab(value) {
        // this.setState({
        //     selectedTabId: this.props.tabId,
        // })
        this.setState({
            selectedTabId: value.id,
        }, () => {
            this.props.selectedTab(value.id)
        })
        console.log('onTab_123:', value)
    }

    onClickRow(item) {
        console.log("Item_budget", JSON.stringify(item))
        this.props.navigation.push("EditBudget", {
            "budgetInfo": item,
            "travelPreferenceId": this.state.travelPreferenceId,
            "userId": this.state.userId,
            onSelect: this.onSelect.bind(this)
        })
    }

    async onSelect(value) {
        // alert(value.editBudget)
        await this.props.getBudgetByTravelId(this.state.travelPreferenceId)
        await this.setState({ selectedTabId: 1 })
    }

    locationInfo(item) {
        this.props.navigation.push("MainScreen", { navigateTo: "TravelPreferenceScreen", preferenceId: item.id })
    }

    async onLocationBudget(item) {
        if (item.totalBudget == null) {
            Alert.alert(
                "Stay Tune",
                "please edit your budget",
                [{ text: "OK", onPress: () => console.log("OK Pressed") }],
                { cancelable: false },
            )
        } else {
            this.setState({ travelPreferenceId: item.id })
            await this.props.getBudgetByTravelId(item.id)
            await this.setState({ selectedTabId: 1 })

        }
    }

    renderProfileInfo() {
        let userInfoList = []
        let userDetails = [
            { key: "Email", value: this.state.email },
            // { key: "City", value: this.state.city },
            { key: "State", value: this.state.state },
            { key: "Zip", value: this.state.zip },
        ]

        userDetails.map((res, i) => {
            userInfoList.push(
                <View style={{ marginHorizontal: dimensions.width * 0.03 }}>
                    <View>
                        <Text style={styles.userInfoUpperText}>{res.value}</Text>
                        <Text style={styles.userInfoBottomText}>{res.key}</Text>
                    </View>
                    {i == userDetails.length - 1 ? null : <View style={styles.line}></View>}
                </View>,
            )
        })
        return <View style={{ marginTop: dimensions.height / 7.6 }}>{userInfoList}</View>
    }

    render() {
        console.log("User_Travel_Info_123:", this.props.tabId)
        return (
            <View style={styles.container}>
                <LinearGradient
                    start={{ x: 0.0, y: 0.0 }}
                    end={{ x: 0.0, y: 1.0 }}
                    locations={[0, 0.1, 1]}
                    colors={[color.primaryColor, color.primaryColor, "#00000010"]}
                    style={{ width: dimensions.width, height: dimensions.width / 3.91 }}
                >
                    <View style={styles.userContainer}>
                        <View style={styles.leftContainer}>
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
                        <View style={styles.rightContainer}>
                            <Text style={styles.nameText}>{this.state.fullName}</Text>
                            {/* <Text style={styles.editText}>EDIT PROFILE</Text>  */}
                        </View>
                    </View>
                </LinearGradient>
                <Tabs
                    TabsList={TabsList}
                    //separatorStyle={{ height: 100, backgroundColor: 'white' }}
                    onPress={value => this.selectedTab(value)}
                    selectedTabId={this.state.selectedTabId}
                />
                {this.state.selectedTabId == 0 ? (
                    <ScrollView contentContainerStyle={{}}>{this.renderProfileInfo()}</ScrollView>
                ) : this.state.selectedTabId == 1 ? (
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <BudgetInfo navigation={this.props.navigation}
                            getBudgetInfo={this.onClickRow.bind(this)} />
                    </ScrollView>
                ) : this.state.selectedTabId == 2 ? (
                    <SavedLocations navigation={this.props.navigation}
                        getLocationInfo={this.locationInfo.bind(this)}
                        locationBudgetInfo={this.onLocationBudget.bind(this)} />
                )
                            : (
                                <View style={styles.container}>
                                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                                        <Text style={styles.initialText}>COMING SOON....</Text>
                                    </ScrollView>
                                </View>
                            )}
            </View>
        )
    }
}

export default connect(
    state => ({
        user: state.user,
        userInfo: state.user.login,
        travel: state.travel,
        budget: state.budget
    }),
    {
        getUserDetails,
        userSavedLocations,
        getBudgetByTravelId
    },
)(UserTravelInfo)
