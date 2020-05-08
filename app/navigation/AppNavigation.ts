/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import "react-native-gesture-handler"

import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import Splash from "../screens/splash"
import Register from "../screens/register"
import Login from "../screens/login"
import ProfileInfo from "../screens/profile-info"
import SelectAvatar from "../screens/select-avatar"
import ForgotPassword from "../screens/forgot-password"
import MapScreen from "../screens/map"
import MainScreen from "../screens/main-screen"
import TravelPreference from "../screens/travel-preference"
import SetBudget from "../screens/set-budget"
import SetInitialInterest from "../screens/set-initial-interest"
import OTPScreen from "../screens/otp-screen"
import ChangePassword from "../screens/change-password"

import EditProfile from "../screens/edit-profile"
import EditBudget from "../screens/edit-budget"
import NotificationDetailScreen from "../screens/notification-detail-screen"


const stackNav = createStackNavigator(
  {
    Splash: { screen: Splash },
    Register: { screen: Register },
    Login: { screen: Login },
    ProfileInfo: { screen: ProfileInfo },
    SelectAvatar: { screen: SelectAvatar },
    ForgotPassword: { screen: ForgotPassword },
    MapScreen: { screen: MapScreen },
    EditProfile: { screen: EditProfile },
    MainScreen: { screen: MainScreen },
    TravelPreference: { screen: TravelPreference },
    SetInitialInterest: { screen: SetInitialInterest },
    SetBudget: { screen: SetBudget },
    EditBudget: { screen: EditBudget },
    OTPScreen: { screen: OTPScreen },
    ChangePassword: { screen: ChangePassword },
    NotificationDetailScreen: { screen: NotificationDetailScreen }
  },
  {
    initialRouteName: "Splash",
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false,
    },
    navigationOptions: {
      gesturesEnabled: false,
      swipeEnabled: false,
    },
  },
)

export default createAppContainer(stackNav)
