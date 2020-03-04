import React, { Component } from "react"
import { Image, Keyboard, Alert, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Button } from "../../components/button"
import { Text } from "../../components/text"
import styles from "./styles"
import { color } from "../../theme"
import { Login } from "../../redux/actions/user"
import { userSavedLocations } from "../../redux/actions/travel"
import { connect } from "react-redux"
import AnimatedLoader from "react-native-animated-loader"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  user: any
  Login: any
}
interface userDetails {
  email: string
  password: string
  token: any
  userId: any
  visible: boolean
}

class LoginScreen extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      token: "",
      userId: "",
      visible: this.props.user.loader,
    }
  }

  onSignUp() {
    this.setState({
      email: "",
      password: "",
    })
    this.props.navigation.push("Register")
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  async onLogin() {
    Keyboard.dismiss()
    if (this.state.email == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter email",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.password == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter password",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.password.length < 7) {
      Alert.alert(
        "Stay Tune",
        "password is invalid",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      const { email, password } = this.state
      await this.props.Login(email, password)
      // if (this.props.user.login == undefined || this.props.user.login == "undefined") {
      //   {
      //     /* Note: this is Temporary solution alert is not diplaying after animation making for that
      //    i used this functionality need to change when we find better solutions for it */
      //   }
      //   setTimeout(() => {
      //     Alert.alert(
      //       "Stay Tune",
      //       "Invalid email or password.",
      //       [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      //       { cancelable: false },
      //     )
      //   }, 100)
      // }
      if (this.props.user.login.error) {
        setTimeout(() => {
          Alert.alert(
            "Stay Tune",
            "Invalid email or password.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false },
          )
        }, 100)
      } else if (this.props.user.login.message === "User not verified") {
        let self = this
        setTimeout(() => {
          Alert.alert(
            "Stay Tune",
            "email is not verfied please verify your email, OTP will be sent to your registered email",
            [
              {
                text: "OK",
                onPress: () => {
                  self.props.navigation.push("OTPScreen", {
                    intialUser: true,
                    previousScreen: "Login",
                    id: this.props.user.login.id,
                  })
                },
              },
            ],
            { cancelable: false },
          )
          self.setState({
            email: "",
            password: "",
          })
        }, 100)
      } else if (this.props.user.login.status === "failed") {
        let self = this
        setTimeout(() => {
          Alert.alert(
            "Stay Tune",
            this.props.user.login.message,
            [
              {
                text: "OK",
                onPress: () => {},
              },
            ],
            { cancelable: false },
          )
        }, 100)
      } else {
        this.setState({
          userId: this.props.user.login.id,
          token: this.props.user.login.token,
        })
        this.props.userSavedLocations(this.state.userId)
        if (this.props.user.loader === false) {
          this.props.navigation.push("MainScreen", {
            userId: this.state.userId,
            selectedValue: "Start a plan",
            headerTitle: "STAY TUNE",
          })
          this.setState({
            email: "",
            password: "",
          })
        }
      }
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <Image style={styles.logo} source={require("../splash/logo.png")} />
          <Text style={styles.textStyle}>
            Hello! I'm StayTune, your personal travel assistant, may i have your email & password
          </Text>
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your email"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ email: value })}
            value={this.state.email}
            autoCapitalize="none"
          />
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your password"
            placeholderTextColor={color.placeholderText}
            secureTextEntry={true}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
            autoCapitalize="none"
          />
          <Text
            style={styles.forgotPasswordText}
            onPress={() => {
              this.setState({
                email: "",
                password: "",
              })
              navigation.push("ForgotPassword")
            }}
          >
            Forgot Password ?
          </Text>
          <Button style={styles.button} onPress={this.onLogin.bind(this)}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </Button>
          <Button style={styles.button} onPress={this.onSignUp.bind(this)}>
            <Text style={styles.buttonText}>SIGN UP</Text>
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
    user: state.user,
  }),
  {
    Login,
    userSavedLocations,
  },
)(LoginScreen)
