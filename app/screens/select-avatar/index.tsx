import React, { Component } from "react"
import { View, FlatList, Image, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { Button } from "../../components/button"
import { Avatar } from "../../components/avatar"
import { Text } from "../../components/text"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"

import { connect } from "react-redux"
import { getAvatarImages, createUserProfile } from "../../redux/actions/user"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  getAvatarImages: any
  avatarList: any
  createUserProfile: any
  user: any
}

interface listOfAvatars {
  avatarImagesList: any
  selectedAvatarId: string
  selectedAvatarUrl: string
}

class SelectAvatar extends Component<Props, listOfAvatars, {}> {
  constructor(props: Props) {
    super(props)
    this.state = {
      avatarImagesList: [],
      selectedAvatarId: "",
      selectedAvatarUrl: "",
    }
  }
  async componentDidMount() {
    await this.props.getAvatarImages()
    console.log("getAvatarImages_get:", this.props.avatarList)
    this.setState({ avatarImagesList: this.props.avatarList })
  }

  async onSelect(item) {
    await this.setState({ selectedAvatarId: item.id, selectedAvatarUrl: item.url })
    console.log("selectedAvatarUrl:", this.state.selectedAvatarUrl)
  }

  async onSubmit() {
    if (this.state.selectedAvatarId == "") {
      Alert.alert(
        "Stay Tune",
        "Please Select Avatar",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      let userInfoObj = {
        profilePic: this.state.selectedAvatarUrl,
        userId: this.props.user.userProfileInfo.data.id,
      }
      console.log("userINfoObj_123", JSON.stringify(userInfoObj))
      await this.props.createUserProfile(userInfoObj)
      try {
        if (this.props.user.userProfileInfo.status == "success") {
          this.props.navigation.push("MainScreen", {
            userId: this.props.user.userProfileInfo.data.id,
            selectedValue: "Saved locations",
            headerTitle: "",
          })
        } else {
          setTimeout(() => {
            Alert.alert(
              "Stay Tune",
              "Server not responding, please try after sometime.",
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false },
            )
          }, 100)
        }
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
      <View style={styles.avatarView}>
        {ViewType}
        <Avatar style={styles.avatarImage} onPress={this.onSelect.bind(this, item)}>
          <Image
            source={{
              uri: item.url,
            }}
            style={styles.avatarImage}
          />
        </Avatar>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <Header
          style={styles.header}
          headerText={"SELECT AVATAR"}
          titleStyle={styles.headerTitle}
        />
        <GoldBarView />
        <FlatList
          data={this.state.avatarImagesList}
          extraData={this.state}
          numColumns={3}
          renderItem={this.renderItem.bind(this)}
        />
        <Button style={styles.button} onPress={this.onSubmit.bind(this)}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </Button>
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
    createUserProfile,
  },
)(SelectAvatar)
