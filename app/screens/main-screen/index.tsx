import React, { Component } from "react"
import { View, AsyncStorage, Keyboard } from "react-native"
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
import { openNotification } from "../../redux/actions/notifications"

import OneSignal from 'react-native-onesignal';
import { dimensions } from '../../theme';



interface Props {
  navigation: NavigationScreenProp<NavigationState>
  userProfileInfo: any
  Signout: any
  tabId: any
  selectedValue: any
  user: any
  notifications: any
  openNotification: any
  travel: any
  preferenceId: any
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
  notificationPreferenceId: any
  startPlan: any
  pid: any
  from: any
  preferenceId: any
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
      from: this.props.navigation.state.params.from,
      preferenceId: this.props.navigation.state.params.preferenceId,
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
      startPlan: false,
      pid: '',
      notificationPreferenceId: "",
    }
  }


  async componentWillMount() {
    // alert(dimensions.height)
    console.log('in app.js:');
    setTimeout(async () => {
      await OneSignal.init('8d39b7db-d029-4bbd-af58-20e3f53cc4a9', {
        kOSSettingsKeyAutoPrompt: true,
        kOSSettingsKeyInFocusDisplayOption: 1
      });
    }, 5000);
    await OneSignal.addEventListener('received', this.onReceived.bind(this));
    await OneSignal.addEventListener('opened', this.onOpened.bind(this));
    await OneSignal.addEventListener('ids', this.onIds.bind(this));
    await OneSignal.addEventListener('inAppMessageClicked', this.onInAppMessageClicked.bind(this));
    await OneSignal.configure();
    // OneSignal.idsAvailable(idsAvailable => {
    //   console.log(idsAvailable.playerId);
    //   console.log(idsAvailable.pushToken);
    // });
    await OneSignal.getPermissionSubscriptionState(async status => {
      const deviceId = status.deviceId;
      console.log('getPermissionSubscriptionState', deviceId);
    });

    // OneSignal.getUserId(id => {
    //   console.log('getUserId', id);
    // });
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived.bind(this));
    OneSignal.removeEventListener('opened', this.onOpened.bind(this));
    OneSignal.removeEventListener('ids', this.onIds.bind(this));
    OneSignal.removeEventListener('InAppMessageClicked', this.onInAppMessageClicked.bind(this));
    //BackgroundGeolocation.removeAllListeners();
  }
  onInAppMessageClicked(notification) {
    console.log("notification_clicked", notification)
  }

  async onIds(device) {

    console.log('Device info: ', device);
    console.log('player id: ', device.userId);
    this.setState({
      pid: device.userId
    });
    console.log(this.state.pid);
    AsyncStorage.setItem('@deviceId', this.state.pid);
  }

  // eslint-disable-next-line class-methods-use-this
  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  // eslint-disable-next-line class-methods-use-this
  async onOpened(openResult) {
    console.log('whole', openResult.notification);
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
    if (openResult.notification.isAppInFocus === false) {
      // TODO: Toast Notification
      // await this.props.openNotification(true)
      this.setState({
        selectedValue: "NOTIFICATIONS",
        headerTitle: "NOTIFICATIONS",
        isOpen: false,
      })
    } else {
      // alert("else")
      // TODO: Go to the room

    }
  }

  async componentDidMount() {
    console.log("navigation_123:", this.props.navigation.state.params.navigateTo)
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
        if (this.props.user.userProfileInfo !== undefined) {
          getUserInfo = this.props.user.userProfileInfo.data
          await this.setState({
            userObj: getUserInfo
          })
        }
      }
      console.log("selectedValue_123_navigateTo:", this.props.navigation.state.params.preferenceId)
      if (this.props.navigation.state.params.navigateTo == "TravelPreferenceScreen") {
        this.setState({
          selectedValue: "Travel preference",
          travelPreferenceId: this.props.navigation.state.params.preferenceId,
          headerTitle: "TRAVEL PREFERENCE",
        })
      } else if (this.props.navigation.state.params.navigateTo == "Select tour guide") {
        this.setState({
          selectedValue: "Select tour guide",
          headerTitle: "TOUR GUIDE",
          isOpen: false,
        })
      } else if (this.props.navigation.state.params.navigateTo == "CHAT") {
        this.setState({
          selectedValue: "CHAT",
          headerTitle: "CHAT",
          isOpen: false,
        })
      }
      else if (this.props.navigation.state.params.navigateTo == "NOTIFICATIONS") {
        this.setState({
          selectedValue: "NOTIFICATIONS",
          headerTitle: "NOTIFICATIONS",
          notificationPreferenceId: this.props.navigation.state.params.preferenceId,
          isOpen: false,
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
    Keyboard.dismiss();
  }

  async closeDrawer(params) {
    // alert("called")
    if (params == "Edit Profile") {
      this.setState({
        selectedValue: "Edit Profile",
        headerTitle: "EDIT PROFILE",
        isOpen: false,
      })
    } else if (params == "Start a plan") {
      this.setState({
        selectedValue: "Start a plan",
        headerTitle: "STAYTUNE",
        isOpen: false,
        modalVisible: false,
        travelPreferenceId: '',
        startPlan: true

      })
    } else if (params == "Itinerary suggestions") {
      this.setState({
        selectedValue: "Itinerary suggestions",
        headerTitle: "ITINERARY SUGGESTIONS",
        isOpen: false,
      })
    } else if (params == "Travel preference") {
      if (this.props.travel.savedLocations !== undefined) {
        if (this.props.travel.savedLocations.length != 0) {
          this.setState({
            selectedValue: "Travel preference",
            headerTitle: "TRAVEL PREFERENCE",
            travelPreferenceId: this.props.travel.savedLocations[0].id,
            isOpen: false,
            startPlan: false
          })
        }
      } else {
        this.setState({
          selectedValue: "Start a plan",
          headerTitle: "STAYTUNE",
          isOpen: false,
          modalVisible: false,
          travelPreferenceId: '',
          startPlan: true
        })
      }
    } else if (params == "Digital souvenir") {
      this.setState({
        selectedValue: "Digital souvenir",
        headerTitle: "DIGITAL SOUVENIR",
        isOpen: false,
      })
    } else if (params == "Select tour guide") {
      this.setState({
        selectedValue: "Select tour guide",
        headerTitle: "TOUR GUIDE",
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
      await AsyncStorage.removeItem('@userAsyncValues');
      await this.props.Signout()
      try {
        await this.child.closeModal()
      } catch (err) {
        console.log("closeModal_123:", err)
      }

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
        headerTitle: "STAYTUNE",
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
      selectedValue: value.tab,
      notificationPreferenceId: null
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
    // alert("travelPreferenceId:" + this.state.travelPreferenceId)
    if (this.state.selectedValue == "Edit Profile") {
      return <EditProfile navigation={this.props.navigation} getUpdateUserInfo={this.updatedUserInfo.bind(this)} />
    } else if (this.state.selectedValue == "Start a plan") {
      return (
        <MapScreen
          onRef={ref => (this.child = ref)}
          navigation={this.props.navigation}
          handleSelectedValue={this.handleSelectedValue.bind(this)}
          modalVisible={this.state.modalVisible}
          onRight={this.onRight.bind(this)}
          startPlan={this.state.startPlan}
          from={this.state.from}
          userId={this.props.navigation.state.params.userId}

        />
      )
    } else if (this.state.selectedValue == "Itinerary suggestions") {
      return <ItinerarySuggestions navigation={this.props.navigation} />
    } else if (this.state.selectedValue == "Travel preference") {
      return <TravelPreference navigation={this.props.navigation} travelPreferenceId={this.state.travelPreferenceId} />
    } else if (this.state.selectedValue == "Digital souvenir") {
      return <DigitalSouvenir navigation={this.props.navigation} />
    } else if (this.state.selectedValue == "Select tour guide") {
      return <SelectTourGuide navigation={this.props.navigation} from={this.state.from} preferenceId={this.state.preferenceId} />
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
      return <Notifications
        navigation={this.props.navigation}
        preferenceId={this.state.notificationPreferenceId} />
    }
  }

  onRightIconPressed() {
    this.setState({
      selectedValue: "Start a plan",
      headerTitle: "STAYTUNE",
      isOpen: false,
      modalVisible: false,
      travelPreferenceId: '',
      startPlan: true,
      from: ''
    })
  }
  backClose() {
    this.setState({
      isOpen: false,
    })
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
            onRightPress={this.onRightIconPressed.bind(this)}
            rightIcon={"map"}
          />
        ) : (
            <View>
              <Header
                style={styles.header}
                headerText={this.state.headerTitle}
                titleStyle={styles.headerTitle}
                leftIcon={"menu"}
                onLeftPress={this.onLeft.bind(this)}
                from={this.state.from}
                onRightPress={this.onRightIconPressed.bind(this)}
                rightIcon={"map"}
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
            onClose={() => this.backClose()}
            content={
              <SideBar
                navigation={this.props.navigation}
                onCloseMenu={params => this.closeDrawer(params)}
                userProfileInfo={this.state.userObj}
              />
            }

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
    notifications: state.notifications,
    travel: state.travel
  }),
  {
    openNotification,
    Signout,
  },
)(MainScreen)
