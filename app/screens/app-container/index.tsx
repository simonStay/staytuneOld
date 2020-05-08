import 'react-native-gesture-handler';
import React, { Component } from "react"
import { View, Platform, Alert, AppRegistry, AsyncStorage } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import RouteScreen from "../../navigation/AppNavigation"
import OneSignal from 'react-native-onesignal';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { connect } from "react-redux"
import { sendUserLocation, saveLocationLogs, saveUserLocation } from "../../redux/actions/user"
import { openNotification } from "../../redux/actions/notifications"

interface Props {
    navigation: NavigationScreenProp<NavigationState>
    saveUserLocation: any
    sendUserLocation: any
    saveLocationLogs: any
    openNotification: any
    user: any
}

interface AppInfo {
    pid: any
    userId: any
    userName: any
    userLocations: any
    userLat: any
    userLong: any
}

class AppContainer extends Component<Props, AppInfo> {
    constructor(props: Props) {
        super(props)
        this.state = {
            userId: '',
            userName: '',
            pid: '',
            userLocations: [],
            userLat: '',
            userLong: ''
        }
    }

    render() {
        return <RouteScreen />;
    }
}

export default connect(
    state => ({
        // user: state.user
    }), {
        sendUserLocation,
        saveLocationLogs,
        saveUserLocation,
        openNotification
    }
)(AppContainer)

