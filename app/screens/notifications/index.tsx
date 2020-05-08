import React, { Component } from "react"
import { View, FlatList, Image, ScrollView, TouchableOpacity } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { CardView } from "../../components/card-view";
import moment from "moment"
import { connect } from "react-redux"
import { notificationList, getNotificationsByTravelId } from "../../redux/actions/notifications"
import AnimatedLoader from "react-native-animated-loader"
import firebase from 'react-native-firebase';
let Analytics = firebase.analytics();

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  notificationList: any
  user: any
  notifications: any
  preferenceId: any
  getNotificationsByTravelId: any
}
interface UserInformation { notificationsList: any }

class Notifications extends Component<Props, UserInformation> {
  constructor(props: Props) {
    super(props)
    this.state = { notificationsList: [] }
  }

  componentDidMount() {
    console.log("preferenceId_123:", this.props.preferenceId)
  }

  async componentWillMount() {
    Analytics.setAnalyticsCollectionEnabled(true);
    Analytics.logEvent('Notifications', {
      group_id: 'Notifications',
      score: 1
    })
    let userId = this.props.user.login !== undefined
      ? this.props.user.login.id
      : this.props.user.userProfileInfo.data.id

    console.log("this.props.preferenceId:", typeof (this.props.preferenceId))

    if (this.props.preferenceId == null || this.props.preferenceId == "") {
      console.log("userId_123", userId)
      await this.props.notificationList(userId)
      // console.log("notifications_screen_123_if:", this.props.notifications.userNotificationList)
      await this.setState({ notificationsList: this.props.notifications.userNotificationList })
    } else {
      await this.props.getNotificationsByTravelId(this.props.preferenceId)
      // console.log("notifications_screen_123_else:", this.props.notifications.notificationsByPreferenceId.data)
      await this.setState({ notificationsList: this.props.notifications.notificationsByPreferenceId.data })
    }

    //console.log("notifications_screen_123_elseeeee:", this.state.notificationsList + '' + this.props.preferenceId)
  }

  onNotification(item) {
    this.props.navigation.push("NotificationDetailScreen", { placeId: item.placeId })
  }

  getDate(date) {
    let convertDate = new Date(date);
    let getDate = moment(convertDate).fromNow()
    return getDate
  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={this.onNotification.bind(this, item)}>
        <CardView>
          <View style={styles.innerCardView}>
            <View style={styles.notificationView}>
              <View style={styles.iconView}>
                <Image
                  source={require("../splash/logo.png")}
                  style={styles.appIcon}
                />
              </View>
              <View style={styles.titleView}>
                <Text style={styles.appName}>
                  Staytune
              </Text>
                <Text style={styles.appName}>
                  {this.getDate(item.date)}
                </Text>
              </View>
            </View>
            <Text style={styles.notificationText}>{item.notification}</Text>
          </View>
        </CardView>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {
            this.state.notificationsList.length == 0 ?
              (<ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.initialText}>NO NOTIFICATIONS !!!!</Text>
              </ScrollView>)
              : this.state.notificationsList === 'error' ? (<ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.initialText}>Server not responding, please try after sometime.</Text>
              </ScrollView>) : (<FlatList
                style={{ flex: 1 }}
                data={this.state.notificationsList}
                extraData={this.state}
                renderItem={this.renderItem.bind(this)}
                showsVerticalScrollIndicator={false}
              />)
          }
        </View>
        <AnimatedLoader
          visible={this.props.notifications.loader}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("./../loader.json")}
          animationStyle={styles.lottie}
          speed={1}
        />
      </View>
    )
  }
}

export default connect(
  state =>
    ({
      user: state.user,
      notifications: state.notifications
    }),
  { notificationList, getNotificationsByTravelId })
  (Notifications)
