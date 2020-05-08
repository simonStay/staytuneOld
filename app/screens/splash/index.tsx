import React, { Component } from "react"
import { View, Image } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { connect } from "react-redux"

import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  user: any
}

class Splash extends Component<Props, {}> {

  async componentDidMount() {
    let self = this
    setTimeout(function () {
      if ((self.props.user.login !== undefined && self.props.user.login.verified !== undefined) || (self.props.user.register !== undefined && self.props.user.userProfileInfo.data != undefined && self.props.user.userProfileInfo.data.verified !== undefined)) {
        if ((self.props.user.login !== undefined && self.props.user.login.verified && self.props.user.login.id != undefined) || (self.props.user.userProfileInfo.data.verified && self.props.user.register.id != undefined)) {
          self.props.navigation.push("MainScreen", {
            userId: self.props.user.login != undefined ? self.props.user.login.id : self.props.user.userProfileInfo.data.id,
            selectedValue: "Start a plan",
            headerTitle: "STAYTUNE",
            tabId: 2,
          })
        } else {
          self.props.navigation.push("Login")
        }
      } else {
        // alert("else")
        self.props.navigation.push("Login")
      }
    }, 5000)
  }
  render() {
    return (
      <View style={styles.container}>
        <Wallpaper style={{ flex: 1 }} />
        <Image style={{ height: 300, width: 300 }} source={require("./logo.png")} />
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {},
)(Splash)
