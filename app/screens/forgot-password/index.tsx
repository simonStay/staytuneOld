import React, { Component } from "react"
import { View, Image, Keyboard, Alert } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import { Header } from "../../components/header"
import { ForgotPassword } from "../../redux/actions/user"
import { connect } from "react-redux"
import styles from "./styles"
import { color } from "../../theme"
import AnimatedLoader from "react-native-animated-loader"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  ForgotPassword: any
  user: any
}

interface userDetails {
  email: string
}

class ForgotPasswordScreen extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = { email: "" }
  }
  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }
  async handleSubmit() {
    Keyboard.dismiss()
    if (this.state.email == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter email",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (!this.validateEmail(this.state.email)) {
      Alert.alert(
        "Stay Tune",
        "Please enter valid email",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      const { email } = this.state
      let value = await this.props.ForgotPassword(email)
      //console.log("value_123", JSON.stringify(value))
      if (value.payload.otp !== undefined) {
        this.props.navigation.push("OTPScreen", {
          previousScreen: "ForgotPassword",
        })
        //this.props.navigation.push("OTPScreen")
      } else {
        setTimeout(() => {
          Alert.alert(
            "Stay Tune",
            value.payload.status,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false },
          )
        }, 100)
      }
    }
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <Header style={styles.header} leftIcon={"back"} onLeftPress={() => navigation.goBack()} />
          <Image style={styles.logo} source={require("../splash/logo.png")} />
          <Text style={styles.textStyle}>
            Hello! I'm StayTune, your personal travel assistant, may i have your email.
          </Text>
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your email"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ email: value })}
            value={this.state.email}
            autoCapitalize="none"
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
    ForgotPassword,
  },
)(ForgotPasswordScreen)
