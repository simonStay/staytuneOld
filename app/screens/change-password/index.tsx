import React, { Component } from "react"
import { View, Image, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import { Header } from "../../components/header"
import { ChangePassword } from "../../redux/actions/user"
import { connect } from "react-redux"
import styles from "./styles"
import { color } from "../../theme"
import AnimatedLoader from "react-native-animated-loader"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  user: any
  ChangePassword: any
}

interface userDetails {
  password: string
  confirmPassword: string
}

class ChangePasswordScreen extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = { password: "", confirmPassword: "" }
  }

  async handleSubmit() {
    let id = await this.props.user.user.passwordCode.id
    let body = { id: id, password: this.state.password }
    if (this.state.password !== this.state.confirmPassword) {
      Alert.alert(
        "Stay Tune",
        "Password and Confirm Password not matched",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.password.length < 8 || this.state.password.length > 10) {
      Alert.alert(
        "Stay Tune",
        "Password range should between 8 and 10",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      await this.props.ChangePassword(body)
      console.log("userInfo", JSON.stringify(this.props.user))
      try {
        if (this.props.user.user.userProfileInfo.status == "success") {
          this.props.navigation.push("Login")
        } else {
          {
            /*This is Temporary solution */
          }
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
  render() {
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <Header style={styles.header} />
          <Image style={styles.logo} source={require("../splash/logo.png")} />
          <Text style={styles.textStyle}>
            Hello! I'm StayTune, your personal travel assistant, may i have your Password and
            Confirm Password
          </Text>
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your password"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your confirm password"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ confirmPassword: value })}
            value={this.state.confirmPassword}
            autoCapitalize="none"
            secureTextEntry={true}
          />
          <Button style={styles.button} onPress={this.handleSubmit.bind(this)}>
            <Text style={styles.buttonText}>SUBMIT</Text>
          </Button>
          <AnimatedLoader
            visible={this.props.user.loader}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("./../loader.json")}
            animationStyle={styles.lottie}
            speed={1}
          />
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
    ChangePassword,
  },
)(ChangePasswordScreen)
