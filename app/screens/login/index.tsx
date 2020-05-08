import React, { Component } from "react"
import { Image, Keyboard, Alert, View, AsyncStorage } from "react-native"
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
import { updateUserLocation } from "../../redux/actions/user"
import { connect } from "react-redux"
import AnimatedLoader from "react-native-animated-loader"
import DeviceInfo from 'react-native-device-info'
import OneSignal from 'react-native-onesignal';
import Geolocation from "@react-native-community/geolocation"
import moment from "moment"
import firebase from 'react-native-firebase';
let Analytics = firebase.analytics();

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  user: any
  Login: any
  userSavedLocations: any
  updateUserLocation: any
}
interface userDetails {
  email: string
  password: string
  token: any
  userId: any
  visible: boolean
  deviceId: any
  latitude: any
  longitude: any
  latitudeDelta: any
  longitudeDelta: any
}

class LoginScreen extends Component<Props, userDetails> {
  constructor(props: Props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      token: "",
      userId: "",
      deviceId: "",
      visible: this.props.user.loader,
      latitude: null,
      longitude: null,
      latitudeDelta: null,
      longitudeDelta: null,
    }
    this.passwordInput = React.createRef()
  }

  async componentWillMount() {
    await OneSignal.addEventListener('ids', this.onIds.bind(this));
  }

  async onIds(device) {
    console.log('deviceId id: ', device.userId);
    this.setState({
      deviceId: device.userId
    });
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
      const { email, password, deviceId } = this.state
      await this.props.Login(email, password, deviceId)
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
                onPress: () => { },
              },
            ],
            { cancelable: false },
          )
        }, 100)
      } else if (this.props.user.login == "error") {
        setTimeout(() => {
          Alert.alert(
            "Stay Tune",
            "Server not responding, please try after sometime.",
            [
              {
                text: "OK",
                onPress: () => { },
              },
            ],
            { cancelable: false },
          )
        }, 100)
      }
      else {
        Geolocation.getCurrentPosition(async (position) => {
          console.log("position_123", JSON.stringify(position))
          this.setState({
            latitude: await position.coords.latitude,
            longitude: await position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          })
          let locationInfo = {
            userId: await this.props.user.login.id,
            lat: await parseFloat(this.state.latitude),
            long: await parseFloat(this.state.longitude),
            date: moment().format("DD-MM-YYYYThh:mm:ss")
          }
          await console.log("position_locationInfo_123", JSON.stringify(locationInfo))
          await this.props.updateUserLocation(locationInfo)
        })

        this.setState({
          userId: this.props.user.login.id,
          token: this.props.user.login.token,
        })
        this.props.userSavedLocations(this.state.userId)
        Analytics.setAnalyticsCollectionEnabled(true);
        Analytics.logEvent('Login', {
          group_id: 'Login_screen',
          score: 1
        })
        if (this.props.user.loader === false) {
          this.props.navigation.push("MainScreen", {
            userId: this.state.userId,
            selectedValue: "Start a plan",
            headerTitle: "STAYTUNE",
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
            Hi! Welcome to your Smart Travel Companion. Discover new experiences with personalized recommendations.
          </Text>
          <TextField
            inputStyle={styles.inputStyle}
            placeholder="Enter your email"
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ email: value })}
            value={this.state.email}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.current.focus()}

          />
          <TextField
            inputStyle={styles.inputStyle}
            forwardedRef={this.passwordInput}
            placeholder="Enter your password"
            placeholderTextColor={color.placeholderText}
            secureTextEntry={true}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={this.onLogin.bind(this)}
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
    updateUserLocation
  },
)(LoginScreen)
