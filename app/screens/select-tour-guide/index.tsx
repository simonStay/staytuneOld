import React, { Component } from "react"
import { View, FlatList, Image, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { Button } from "../../components/button"
import { Avatar } from "../../components/avatar"
import { Text } from "../../components/text"

import { connect } from "react-redux"
import { getAvatarImages } from "../../redux/actions/user"
import { selectedTourGuide } from "../../redux/actions/travel"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  getAvatarImages: any
  avatarList: any
  selectedTourGuide: any
  user: any
}

interface listOfAvatars {
  avatarImagesList: any
  selectedAvatarId: string
  selectedAvatarUrl: string
  tourGuideInfo: any
  tourist: any
}

class SelectTourGuide extends Component<Props, listOfAvatars, {}> {
  constructor(props: Props) {
    super(props)
    this.state = {
      avatarImagesList: [],
      selectedAvatarId: "",
      selectedAvatarUrl: "",
      tourGuideInfo: null,
      tourist: ""

    }
  }

  async componentDidMount() {
    let getTourGuides = await this.props.getAvatarImages()
    await console.log("getAvatarImages_get:", getTourGuides.payload)
    await this.setState({ avatarImagesList: getTourGuides.payload })
  }

  async onSelect(item) {
    let click = 0
    if (this.state.selectedAvatarId == item.id) {
      click = click + 1
    }

    if (click == 0) {
      await this.setState({ selectedAvatarId: item.id, selectedAvatarUrl: item.url, tourGuideInfo: item, tourist: item.id })
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
        this.props.selectedTourGuide(this.state.tourGuideInfo)
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
        <FlatList
          data={this.state.avatarImagesList}
          extraData={this.state}
          numColumns={3}
          renderItem={this.renderItem.bind(this)}
        />
        {this.state.tourGuideInfo != null ? (
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
  },
)(SelectTourGuide)
