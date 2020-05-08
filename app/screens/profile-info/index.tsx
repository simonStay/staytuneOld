import React, { Component } from "react"
import { View, Alert } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { color } from "../../theme"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"
import { RadioButtonView } from "../../components/radio-button"
import { createUserProfile } from "../../redux/actions/user"

import { connect } from "react-redux"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  createUserProfile: any
}
interface UserInformation {
  firstName: string
  lastName: string
  age: string
  state: string
  zip: string
  userId: any
  token: any
  marialStatus: any
  value1_1: any
  value1_1Index: number
  marialStatusSelected: string
  getUserDetails?: () => void
}
let marialStatus = [{ label: "Single", value: 0 }, { label: "Married", value: 1 }]

class ProfileInfo extends Component<Props, UserInformation> {
  constructor(props: Props) {
    super(props)
    this.state = {
      firstName:
        this.props.navigation.state.params === undefined
          ? ""
          : this.props.navigation.state.params.userInfo.firstname,
      lastName:
        this.props.navigation.state.params === undefined
          ? ""
          : this.props.navigation.state.params.userInfo.lastname,
      age: "",
      state: "",
      zip: "",
      marialStatus: marialStatus,
      value1_1: -1,
      value1_1Index: -1,
      userId:
        this.props.navigation.state.params === undefined
          ? ""
          : this.props.navigation.state.params.userId,
      token:
        this.props.navigation.state.params === undefined
          ? ""
          : this.props.navigation.state.params.token,
      marialStatusSelected: "",
    }
    this.lastNameInput = React.createRef()
    this.age = React.createRef()
    this.State = React.createRef()
    this.zip = React.createRef()
  }

  validateZip = zip => {
    return /^\d{5}(-\d{4})?$/.test(zip)
  }

  async onSelectAvatar() {
    console.log("profileInfo" + JSON.stringify(this.state))
    if (this.state.firstName == "" || this.state.firstName == null) {
      Alert.alert(
        "Stay Tune",
        "Please enter firstName",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.lastName == "" || this.state.lastName == null) {
      Alert.alert(
        "Stay Tune",
        "Please enter lastName",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.marialStatusSelected == "" || this.state.marialStatusSelected == null) {
      Alert.alert(
        "Stay Tune",
        "Please select your Marial status",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.age == "" || this.state.age == null) {
      Alert.alert(
        "Stay Tune",
        "Please enter your Age",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.state == "" || this.state.state == null) {
      Alert.alert(
        "Stay Tune",
        "Please enter state",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.zip == "" || this.state.zip == null) {
      Alert.alert(
        "Stay Tune",
        "Please enter zip",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (!this.validateZip(this.state.zip)) {
      Alert.alert(
        "Stay Tune",
        "Please enter a valid zip code",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      const { navigation } = this.props
      let userObj = {
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        age: parseInt(this.state.age),
        state: this.state.state,
        zip: this.state.zip,
        userId: this.state.userId,
        maritalStatus: this.state.marialStatusSelected,
      }
      await this.props.createUserProfile(userObj)
      try {
        if (
          this.props.user.userProfileInfo.status == "success" &&
          this.props.user.loader == false
        ) {
          this.props.navigation.push("MainScreen", {
            userId: this.state.userId,
            selectedValue: "Travel preference",
            headerTitle: "TRAVEL PREFERENCE",
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
  onPress(value, index) {
    this.setState({
      value1_1: value,
      value1_1Index: index,
      marialStatusSelected: this.state.marialStatus[value].label,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <Header
          style={styles.header}
          headerText={"PROFILE INFORMATION"}
          titleStyle={styles.headerTitle}
        />
        <GoldBarView />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <TextField
            placeholder="First Name"
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ firstName: value })}
            value={this.state.firstName}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => this.lastNameInput.current.focus()}
          />
          <TextField
            placeholder="Last Name"
            forwardedRef={this.lastNameInput}
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ lastName: value })}
            value={this.state.lastName}
            returnKeyType="next"
            autoCapitalize="none"
          />
          <RadioButtonView
            marialStatus={this.state.marialStatus}
            selectedValue={this.state.value1_1}
            selectedIndex={this.state.value1_1Index}
            onPress={this.onPress.bind(this)}
          />
          <TextField
            placeholder="Age"
            forwardedRef={this.age}
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ age: value })}
            value={this.state.age}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => this.State.current.focus()}
          />
          <TextField
            placeholder="State"
            forwardedRef={this.State}
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ state: value })}
            value={this.state.state}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => this.zip.current.focus()}
          />
          <TextField
            placeholder="Zip"
            forwardedRef={this.zip}
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ zip: value })}
            value={this.state.zip}
            autoCapitalize="none"
          />
          <Button style={styles.button} onPress={this.onSelectAvatar.bind(this)}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </Button>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
  }),
  {
    createUserProfile,
  },
)(ProfileInfo)
