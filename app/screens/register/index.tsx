import React, { Component } from "react"
import { Image, Keyboard, Alert, View } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import styles from "./styles"

import { Wallpaper } from "../../components/wallpaper"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { color } from "../../theme"

import { connect } from "react-redux"
import { signUp } from "../../redux/actions/user"
import PropTypes from "prop-types"
import AnimatedLoader from "react-native-animated-loader"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  user: any
  signUp: any
  loader: any
}
interface userDetails {
  firstName: string
  lastName: string
  email: string
  password: string
  zip: string
}

class Register extends Component<Props, userDetails> {
  static propTypes = {
    user: PropTypes.object.isRequired,
  }
  constructor(props: Props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      zip: "",
      email: "",
      password: "",
    }
    this.lastNameInput = React.createRef()
    this.zip = React.createRef()
    this.emailInput = React.createRef()
    this.passwordInput = React.createRef()
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  async onSubmit() {
    Keyboard.dismiss()
    console.log("SIGNUP" + JSON.stringify(this.state))

    if (this.state.firstName == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter first name",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.lastName == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter last name",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.zip == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter Zip code",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else if (this.state.email == "") {
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
    } else if (this.state.password == "") {
      Alert.alert(
        "Stay Tune",
        "Please enter password",
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
      const { firstName, lastName, email, password, zip } = this.state
      await this.props.signUp(firstName, lastName, email, password, zip)
      if (this.props.user.status == "failed") {
        {
          /* Note: this is Temporary solution alert is not diplaying after animation making for that 
         i used this functionality need to change when we find better solutions for it */
        }
        setTimeout(() => {
          Alert.alert(
            "Stay Tune",
            this.props.user.message,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false },
          )
        }, 100)
      } else if (this.props.user.status == "success") {
        let self = this
        setTimeout(() => {
          Alert.alert(
            "Stay Tune",
            "OTP will be sent to your registered email",
            [
              {
                text: "OK",
                onPress: () => {
                  self.props.navigation.push("OTPScreen", {
                    intialUser: true,
                    previousScreen: "register",
                    id: this.props.user.id,
                  })
                  self.setState({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                  })
                },
              },
            ],
            { cancelable: false },
          )
        }, 200)
      }
      console.log("state_user_123:", this.props.user)
      // this.props.navigation.push('Login')
    }
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <Image style={styles.logo} source={require("../splash/logo.png")} />
          <Text style={styles.welcomeText}>
            Welcome! Create an account for personalized recommendations
          </Text>
          <TextField
            placeholder="Enter your first name"
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ firstName: value })}
            value={this.state.firstName}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => this.lastNameInput.current.focus()}
          />
          <TextField
            placeholder="Enter your last name"
            forwardedRef={this.lastNameInput}
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ lastName: value })}
            value={this.state.lastName}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => this.zip.current.focus()}
          />
          <TextField
            placeholder="Enter your zip code"
            forwardedRef={this.zip}
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ zip: value })}
            value={this.state.zip}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => this.emailInput.current.focus()}
          />
          <TextField
            placeholder="Enter your email"
            forwardedRef={this.emailInput}
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ email: value })}
            value={this.state.email}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.current.focus()}
          />
          <TextField
            placeholder="Enter your password"
            inputStyle={styles.textField}
            forwardedRef={this.passwordInput}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ password: value })}
            value={this.state.password}
            secureTextEntry={true}
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={this.onSubmit.bind(this)}
          />
          <Button style={styles.button} onPress={this.onSubmit.bind(this)}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </Button>
          <AnimatedLoader
            visible={this.props.loader}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("./../loader.json")}
            animationStyle={styles.lottie}
            speed={1}
          />
          <Text style={styles.bottomText}>
            Already have an account ?{" "}
            <Text
              onPress={() => {
                navigation.push("Login")
                this.setState({
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                })
              }}
              style={[styles.bottomText, { color: "#61cbff" }]}
            >
              Login now
            </Text>
          </Text>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user.register,
    loader: state.user.loader,
  }),
  {
    signUp,
  },
)(Register)
