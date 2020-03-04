import React, { Component } from "react"
import { View } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Drawer } from "native-base"
import SideBar from "../side-bar/index"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"
import { BottomTab } from "../../components/bottom-tab"

import EditProfile from "../edit-profile"
import MapScreen from "../map"
import ItinerarySuggestions from "../itinerary-suggestions"
import TravelPreference from "../travel-preference"
import DigitalSouvenir from "../digital-souvenir"
import SelectTourGuide from "../select-tour-guide"
import UserTravelInfo from "../user-travel-info"

import Chat from "../chat"
import Notifications from "../notifications"

import { connect } from "react-redux"
import { Signout } from "../../redux/actions/user"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  userProfileInfo: any
  Signout: any
  tabId: any
  selectedValue: any
  user: any
}
interface UserInformation {
  isOpen: boolean
  selectedValue: any
  headerTitle: any
  userObj: any
  avatarSource: string
  firstName: string
  lastName: string
  city: string
  state: any
  zip: string
  profilePic: string
  tabId: any
  modalVisible: any
  travelPreferenceId: string
  startPlan: any
}

interface extraInfo {
  drawer: any
}

let bottomTabs = [{ id: 0, tab: "CHAT" }, { id: 1, tab: "NOTIFICATIONS" }]

class MainScreen extends Component<Props, UserInformation, extraInfo> {
  state: UserInformation
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedValue: this.props.navigation.state.params.selectedValue,
      headerTitle: this.props.navigation.state.params.headerTitle,
      isOpen: false,
      userObj: null,
      avatarSource: "",
      firstName: "",
      lastName: "",
      city: "",
      state: "",
      zip: "",
      profilePic: "",
      tabId: 2,
      modalVisible: false,
      travelPreferenceId: "",
      startPlan: false
    }
  }

  async componentDidMount() {
    try {
      let getUserInfo
      if (this.props.navigation.state.params.selectedValue !== undefined) {
        this.setState({
          selectedValue: this.props.navigation.state.params.selectedValue,
        })
      }
      if (this.props.user.userProfileInfo === undefined || this.props.user.userProfileInfo === "undefined") {
        getUserInfo = this.props.user.login
        await this.setState({
          userObj: getUserInfo
        })
      } else {
        getUserInfo = this.props.user.userProfileInfo.data
        await this.setState({
          userObj: getUserInfo
        })
      }

      if (this.props.navigation.state.params.navigateTo == "TravelPreferenceScreen") {
        this.setState({
          selectedValue: "Travel preference",
          travelPreferenceId: this.props.navigation.state.params.preferenceId,
          headerTitle: "TRAVEL PREFERENCE",
        })
      }

    } catch (error) {

    }

  }

  onLeft() {
    if (this.state.isOpen) {
      this.drawer._root.close()
      this.setState({
        isOpen: false,
        modalVisible: false,
      })
    } else {
      this.drawer._root.open()
      this.setState({
        isOpen: true,
        modalVisible: false
      })
    }
  }

  async closeDrawer(params) {
    if (params == "Edit Profile") {
      this.setState({
        selectedValue: "Edit Profile",
        headerTitle: "EDIT PROFILE",
        isOpen: false,
      })
    } else if (params == "Start a plan") {
      this.setState({
        selectedValue: "Start a plan",
        headerTitle: "STAY TUNE",
        isOpen: false,
        modalVisible: false,
        startPlan: true

      })
    } else if (params == "Itinerary suggestions") {
      this.setState({
        selectedValue: "Itinerary suggestions",
        headerTitle: "ITINERARY SUGGESTIONS",
        isOpen: false,
      })
    } else if (params == "Travel preference") {
      this.setState({
        selectedValue: "Travel preference",
        headerTitle: "TRAVEL PREFERENCE",
        isOpen: false,
        startPlan: false
      })
    } else if (params == "Digital souvenir") {
      this.setState({
        selectedValue: "Digital souvenir",
        headerTitle: "DIGITAL SOUVENIR",
        isOpen: false,
      })
    } else if (params == "Select tour guide") {
      this.setState({
        selectedValue: "Select tour guide",
        headerTitle: "SELECT TOUR GUIDE",
        isOpen: false,
      })
    } else if (params == "Saved locations") {
      this.setState({
        selectedValue: "Saved locations",
        headerTitle: "",
        isOpen: false,
        tabId: 2,
      })
    } else if (params == "Budget") {
      this.setState({
        selectedValue: "Budget",
        headerTitle: "",
        isOpen: false,
        tabId: 1,
      })
    } else if (params == "Signout") {
      await this.props.Signout()
      this.props.navigation.push("Login")
    }
    this.drawer._root.close()

    console.log("sidemenu_123:", this.state.selectedValue + '' + this.state.tabId)
  }
  handleSelectedValue(value) {
    if (value === "Travel preference") {
      this.setState({
        selectedValue: "Travel preference",
        headerTitle: "TRAVEL PREFERENCE",
      })
    } else {
      this.setState({
        selectedValue: "Start a plan",
        headerTitle: "STAY TUNE",
      })
    }
  }

  updatedUserInfo(user) {
    try {
      this.setState({ userObj: user })
    } catch (error) {

    }
  }

  selectedTab(value) {
    this.setState({
      selectedValue: value.tab
    }, () => {
      if (this.state.selectedValue == 'CHAT') {
        this.setState({ headerTitle: "CHAT" })
      } else if (this.state.selectedValue == 'NOTIFICATIONS') {
        this.setState({ headerTitle: "NOTIFICATIONS" })
      }
    })
  }

  onRight() {
    if (this.state.modalVisible == false) {
      this.setState({ modalVisible: true })
    } else {
      this.setState({ modalVisible: false })
    }
  }

  renderBottomTabBar() {
    if (this.state.selectedValue == "Edit Profile") {
    } else {
      return (
        <BottomTab tabs={bottomTabs} onPress={value => this.selectedTab(value)} />
      )
    }
  }

  selectedTabButton(value) {
    //alert("value_123" + value)
    this.setState({
      tabId: value
    })
  }
  renderContanier() {
    if (this.state.selectedValue == "Edit Profile") {
      return <EditProfile navigation={this.props.navigation} getUpdateUserInfo={this.updatedUserInfo.bind(this)} />
    } else if (this.state.selectedValue == "Start a plan") {
      return (
        <MapScreen
          navigation={this.props.navigation}
          handleSelectedValue={this.handleSelectedValue.bind(this)}
          modalVisible={this.state.modalVisible}
          onRight={this.onRight.bind(this)}
          startPlan={this.state.startPlan}
        />
      )
    } else if (this.state.selectedValue == "Itinerary suggestions") {
      return <ItinerarySuggestions navigation={this.props.navigation} />
    } else if (this.state.selectedValue == "Travel preference") {
      return <TravelPreference navigation={this.props.navigation} travelPreferenceId={this.state.travelPreferenceId} />
    } else if (this.state.selectedValue == "Digital souvenir") {
      return <DigitalSouvenir navigation={this.props.navigation} />
    } else if (this.state.selectedValue == "Select tour guide") {
      return <SelectTourGuide navigation={this.props.navigation} />
    } else if (this.state.selectedValue == "Saved locations") {
      return (
        <UserTravelInfo
          navigation={this.props.navigation}
          tabId={this.state.tabId}
          selectedTab={this.selectedTabButton.bind(this)}
          tabValue={"SAVED LOCATIONS"}
          handleSelectedValue={this.handleSelectedValue.bind(this)}
        />
      )
    } else if (this.state.selectedValue == "Budget") {
      return (
        <UserTravelInfo
          navigation={this.props.navigation}
          tabId={this.state.tabId}
          selectedTab={this.selectedTabButton.bind(this)}
          tabValue={"BUDGET INFO"}
        />
      )
    } else if (this.state.selectedValue == 'CHAT') {
      return <Chat navigation={this.props.navigation} />
    } else if (this.state.selectedValue == 'NOTIFICATIONS') {
      return <Notifications navigation={this.props.navigation} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        {this.state.selectedValue == "Saved locations" || this.state.selectedValue == "Budget" ? (
          <Header
            style={styles.headerView}
            headerText={this.state.headerTitle}
            titleStyle={styles.headerTitle}
            leftIcon={"menu"}
            onLeftPress={this.onLeft.bind(this)}
          />
        ) : (
            <View>
              <Header
                style={styles.header}
                headerText={this.state.headerTitle}
                titleStyle={styles.headerTitle}
                leftIcon={"menu"}
                onLeftPress={this.onLeft.bind(this)}
                rightIcon={this.state.selectedValue == "Start a plan" ? "filter" : null}
                onRightPress={this.onRight.bind(this)}
              />
              <GoldBarView />
            </View>
          )}
        <View style={{ flex: 1, overflow: "hidden" }}>
          <Drawer
            openDrawerOffset={0.36}
            panCloseMask={0.36}
            ref={ref => {
              this.drawer = ref
            }}
            content={
              <SideBar
                navigation={this.props.navigation}
                onCloseMenu={params => this.closeDrawer(params)}
                userProfileInfo={this.state.userObj}
              />
            }
            onClose={() => this.closeDrawer()}
          >
            {this.renderContanier()}
            {this.renderBottomTabBar()}
          </Drawer>
        </View>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {
    Signout,
  },
)(MainScreen)
