import React, { Component } from "react"
import { View, Image, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import { Header } from "../../components/header"
import { verifyUser } from "../../redux/actions/user"
import { connect } from "react-redux"
import styles from "./styles"
import { color } from "../../theme"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  user: any
  verifyUser: any
}

interface userDetails {
  OTP: string
}

class OTPScreen extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = { OTP: "" }
  }

  async handleSubmit() {
    console.log("previousScreen", this.props.navigation.state.params.previousScreen)
    let OTPValue =
      this.props.navigation.state.params.previousScreen === "register"
        ? await this.props.user.user.register.otp
        : this.props.navigation.state.params.previousScreen === "Login"
          ? await this.props.user.user.login.otp
          : await this.props.user.user.passwordCode.otp
    console.log("user_otp", JSON.stringify(OTPValue))
    if (OTPValue == this.state.OTP) {
      if (
        this.props.navigation.state.params.previousScreen === "register" ||
        this.props.navigation.state.params.previousScreen === "Login"
      ) {
        let body = { id: this.props.navigation.state.params.id, verified: true }
        let verifyUserResponse = await this.props.verifyUser(body)
        console.log("verifyUserResponse", JSON.stringify(verifyUserResponse))
        if (verifyUserResponse.payload.status == "success") {
          let self = this
          setTimeout(() => {
            Alert.alert(
              "Stay Tune",
              "Your Email is verified successfully",
              [
                {
                  text: "OK",
                  onPress: async () => {
                    //self.props.navigation.push("Login")
                    if (self.props.navigation.state.params.previousScreen === "Login") {
                      self.props.navigation.push("MainScreen", {
                        userId: verifyUserResponse.payload.data.id,
                        selectedValue: "Start a plan",
                        headerTitle: "STAYTUNE",
                      })
                    } else {
                      this.props.navigation.push("MainScreen", {
                        userId: verifyUserResponse.payload.data.id,
                        selectedValue: "Start a plan",
                        headerTitle: "STAYTUNE",
                      })
                    }
                  },
                },
              ],
              { cancelable: false },
            )
          }, 100)
        }
      } else {
        this.props.navigation.push("ChangePassword")
      }
    } else {
      console.log("OTPValue", OTPValue, "_OTP", this.state.OTP)
      Alert.alert(
        "Stay Tune",
        "OTP is incorrect, please enter the correct OTP",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    }
  }
  render() {
    console.log("navigation_123", this.props.navigation.state.params.previousScreen)
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <Header style={styles.header} />
          <Image style={styles.logo} source={require("../splash/logo.png")} />
          <Text style={styles.textStyle}>
            Hello! I'm StayTune, your personal travel assistant, may i have your OTP which was sent
            to your email.
          </Text>
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your OTP"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ OTP: value })}
            value={this.state.OTP}
          />
          <Button style={styles.button} onPress={this.handleSubmit.bind(this)}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </Button>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state,
  }),
  {
    verifyUser,
  },
)(OTPScreen)
