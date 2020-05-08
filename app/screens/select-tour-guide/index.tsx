import React, { Component } from "react"
import { View, FlatList, Image, ImageBackground, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { Button } from "../../components/button"
import { Avatar } from "../../components/avatar"
import { Text } from "../../components/text"

import { connect } from "react-redux"
import { getAvatarImages, selectedTourGuide, getUserDetails, getNotification } from "../../redux/actions/user"
import { color, dimensions, fontsize } from "../../theme/"
import firebase from 'react-native-firebase';
let Analytics = firebase.analytics();

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  getAvatarImages: any
  avatarList: any
  selectedTourGuide: any
  user: any
  getUserDetails: any
  from: any
  preferenceId: any
  getNotification: any
}

interface listOfAvatars {
  avatarImagesList: any
  selectedAvatarId: string
  selectedAvatarUrl: string
  tourGuideInfo: any
  tourist: any
  travelGuideId: any
}

class SelectTourGuide extends Component<Props, listOfAvatars, {}> {
  constructor(props: Props) {
    super(props)
    this.state = {
      avatarImagesList: [],
      selectedAvatarId: "",
      selectedAvatarUrl: "",
      tourGuideInfo: null,
      travelGuideId: "",
      tourist: ""
    }
  }

  async componentWillMount() {
    Analytics.setAnalyticsCollectionEnabled(true);
    Analytics.logEvent('Tour_guide', {
      group_id: 'Tour_guide',
      score: 1
    })
    let getTourGuides = await this.props.getAvatarImages()
    await console.log("getAvatarImages_get:", getTourGuides.payload)
    await this.setState({ avatarImagesList: getTourGuides.payload })
    let id =
      this.props.user.login !== undefined
        ? this.props.user.login.id
        : this.props.user.userProfileInfo.data.id
    let userDetails = await this.props.getUserDetails(id, "token")
    await this.setState({
      selectedAvatarId: userDetails.payload.travelGuideId
    })
  }

  async onSelect(item) {
    let click = 0
    if (this.state.selectedAvatarId == item.id) {
      click = click + 1
    }

    if (click == 0) {
      await this.setState({ selectedAvatarId: item.id, selectedAvatarUrl: item.url, tourGuideInfo: item, tourist: item.id, travelGuideId: item.id })
    } else {
      await this.setState({ selectedAvatarId: "", selectedAvatarUrl: "", tourGuideInfo: null })
    }

    await console.log("selectedAvatarId:", this.state.tourist)
  }

  async onSubmit() {
    if (this.state.selectedAvatarId == "") {
      Alert.alert(
        "Stay Tune",
        "Please Select Tour Guide",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      try {
        let userInfo = {
          userId: this.props.user.login !== undefined
            ? this.props.user.login.id !== undefined ? this.props.user.login.id
              : this.props.user.userProfileInfo.data.id : this.props.user.userProfileInfo.data.id,
          travelGuideId: this.state.selectedAvatarId
        }
        console.log("userInfo_123", userInfo);
        await this.props.selectedTourGuide(userInfo)
        console.log("this.props.from:", this.props.from)
        if (this.props.from === 'interest') {
          await this.props.navigation.push("MainScreen", {
            navigateTo: "CHAT"
          })
          this.props.getNotification(this.props.preferenceId)

        } else {
          await this.props.navigation.push("MainScreen", {
            navigateTo: "CHAT"
          })
        }
        // if (this.props.from === 'interest') {
        //   this.props.navigation.push("MainScreen", {
        //     userId: userInfo.userId,
        //     selectedValue: "Start a plan",
        //     headerTitle: "STAYTUNE",
        //   })
        // } else {
        //   await this.props.navigation.push("MainScreen", {
        //     navigateTo: "CHAT"
        //   })
        // }

      } catch (error) {
        console.log("error:", error)
      }
    }
  }

  renderItem({ item }) {
    if (item.id == this.state.selectedAvatarId) {
      var ViewType = (
        <Image source={require("./../../assests/check-circle.png")} style={styles.checkImage} />
      )
    } else {
      var ViewType = <View />
    }
    return (
      <View style={{
        width: dimensions.width / 2,
        flexDirection: 'column', backgroundColor: 'transparent', padding: 10, borderColor: 'transparent', borderWidth: 1, alignItems: 'center', justifyContent: 'center'
      }}>
        <View style={styles.avatarView}>
          {ViewType}
          <Avatar style={styles.avatarImage} onPress={item.id == '5dfa071e020ff30032c023ae' ? this.onSelect.bind(this, item) : null}>
            <Image
              source={{
                uri: item.url,
              }}
              style={styles.avatarImage}
            />
          </Avatar>
        </View>
        <Text style={styles.tourGuideText}>{item.name}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <FlatList
          data={this.state.avatarImagesList}
          extraData={this.state}
          numColumns={2}
          renderItem={this.renderItem.bind(this)}
        />
        {this.state.selectedAvatarId != "" ? (
          <Button style={styles.button} onPress={this.onSubmit.bind(this)}>
            <Text style={styles.buttonText}>SELECT TOUR GUIDE</Text>
          </Button>
        ) : null}
      </View>
    )
  }
}

export default connect(
  state => ({
    avatarList: state.user.avatarImages,
    user: state.user,
  }),
  {
    getAvatarImages,
    selectedTourGuide,
    getUserDetails,
    getNotification
  },
)(SelectTourGuide)
