import React, { Component } from "react"
import { View, Image, Alert, TouchableOpacity, ActivityIndicator } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { color, dimensions } from "../../theme"
import { TextField } from "../../components/text-field"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { RadioButtonView } from "../../components/radio-button"
import ImagePicker from "react-native-image-picker"
import ImageResizer from "react-native-image-resizer"

import { connect } from "react-redux"
import { getUserDetails, createUserProfile } from "../../redux/actions/user"
import AnimatedLoader from "react-native-animated-loader"
import moment from "moment"
var RNS3 = require("react-native-aws3").RNS3

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  getUserDetails: any
  user: any
  userInfo: any
  createUserProfile: any
  userDetails: any
  getUpdateUserInfo: any
}
interface UserInformation {
  avatarSource: any
  firstName: string
  lastName: string
  age: string
  state: string
  zip: string
  ImageSpinner: any
  resizeImage: any
  marialStatus: any
  martialValue: any
  martialIndex: number
  marialStatusSelected: string
}
let marialStatus = [{ label: "Single", value: 0 }, { label: "Married", value: 1 }]
const profilePic = "https://pipdigz.co.uk/p3/img/placeholder-square.png"
class EditProfile extends Component<Props, UserInformation> {
  constructor(props: Props) {
    super(props)
    this.state = {
      avatarSource: profilePic,
      firstName: "",
      lastName: "",
      age: "",
      state: "",
      zip: "",
      ImageSpinner: false,
      resizeImage: "",
      marialStatus: marialStatus,
      martialValue: -1,
      martialIndex: -1,
      marialStatusSelected: "",
    }
  }
  validateZip = zip => {
    return /^\d{5}(-\d{4})?$/.test(zip)
  }

  async componentDidMount() {
    console.log("user_info__info_123:", this.props.user)
    let id =
      this.props.user.login !== undefined
        ? this.props.user.login.id
        : this.props.user.userProfileInfo.data.id

    try {
      let userDetails = await this.props.getUserDetails(id, "token")

      console.log("getUserDetails______123", JSON.stringify(userDetails))
      let userInformation = userDetails.payload

      if (userInformation.maritalStatus == "Single") {
        await this.setState({
          martialValue: userInformation.maritalStatus,
          martialIndex: 0,
          marialStatusSelected: this.state.marialStatus[0].label,
        })
      } else {
        await this.setState({
          martialValue: userInformation.maritalStatus,
          martialIndex: 1,
          marialStatusSelected: this.state.marialStatus[1].label,
        })
      }
      console.log("marialStatusSelected:", this.state.marialStatusSelected)
      await this.setState({
        avatarSource: userInformation.profilePic,
        firstName: userInformation.firstname,
        lastName: userInformation.lastname,
        age: userInformation.age === 0 ? "" : userInformation.age,
        state: userInformation.state,
        zip: userInformation.zip,
      })
    } catch (error) {
      console.log("userinfo_123_error:", error)
    }
  }

  async onSave() {
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
    } else if (this.state.age == "" || this.state.age == null) {
      Alert.alert(
        "Stay Tune",
        "Please enter age",
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
      try {
        console.log("userId_editProfile:", this.props.user.userProfileInfo)

        let id =
          this.props.user.login !== undefined
            ? this.props.user.login.id
            : this.props.user.userProfileInfo.data.id

        let userInfoObj = {
          firstname: this.state.firstName,
          lastname: this.state.lastName,
          age: parseInt(this.state.age),
          state: this.state.state,
          zip: this.state.zip,
          userId: id,
          token: "",
          profilePic: this.state.avatarSource,
          maritalStatus: this.state.marialStatusSelected,
        }

        let editProfile = await this.props.createUserProfile(userInfoObj)
        console.log("createUserProfile_editprofile:", editProfile)

        this.props.getUpdateUserInfo(editProfile.payload.data)
        if (editProfile.payload.status == "success") {
          setTimeout(() => {
            Alert.alert(
              "Stay Tune",
              editProfile.payload.message,
              [{ text: "OK", onPress: () => console.log("OK Pressed") }],
              { cancelable: false },
            )
          }, 100)
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
        console.log("error_error:", error)
      }
    }
  }

  async onSelectImage() {
    const options = {
      title: "Select Profile Pic",
      takePhotoButtonTitle: "Take Photo",
      chooseFromLibraryButtonTitle: "Choose from Library",
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
      },
      allowsEditing: false,
    }

    ImagePicker.showImagePicker(options, async response => {
      try {
        console.log("Response = ", response)

        if (response.didCancel) {
          console.log("User cancelled image picker")
        } else if (response.error) {
          console.log("ImagePicker Error: ", response.error)
        } else if (response.customButton) {
          console.log("User tapped custom button: ", response.customButton)
        } else {
          const source = { uri: response.uri }
          // console.log("sources_123:", source.uri)

          if (response.width > 1000) {
            await ImageResizer.createResizedImage(source.uri, 360, 360, "PNG", 100)
              .then(async imgResponse => {
                await this.setState({ resizeImage: imgResponse.uri })
              })
              .catch(err => {
                console.log("ImageResizer_error:", err)
              })
          } else {
            await this.setState({ resizeImage: source.uri })
          }

          //aws3 starts
          this.setState({ ImageSpinner: true })
          console.log("this.state.resizeImage_123:", this.state.resizeImage)

          var image = this.state.resizeImage
          var key = moment().format("DDMMYYYYhhmmss")
          var file = {
            uri: image,
            name: key + ".png",
            type: "image/png",
          }
          var obj = {
            keyPrefix: "profile-pictures/",
            bucket: "staytune-terraform",
            region: "us-west-2",
            accessKey: "AKIATDR4HVPPCOUMLSY6",
            secretKey: "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",
            successActionStatus: 201,
          }
          RNS3.put(file, obj).then(response => {
            try {
              console.log("RNS3_RESPONSE:", response)
              if (response.status !== 201) throw new Error("Failed to upload image to S3")

              //alert("profile:"+JSON.stringify(response))
              var profileSource =
                "https://staytune-terraform.s3-us-west-2.amazonaws.com/profile-pictures/" +
                key +
                ".png"

              this.setState(
                {
                  avatarSource: profileSource,
                },
                () => {
                  this.setState({ ImageSpinner: false })
                },
              )
              console.log("AWS_PROFILE_PIC:", profileSource)
            } catch (error) {
              console.log("catch_images3:", error)
            }
          })

          //aws3 ends
        }
      } catch (error) {
        console.log("error_123:", error)
      }
    })
  }

  onPress(value, index) {
    this.setState({
      martialValue: value,
      martialIndex: index,
      marialStatusSelected: this.state.marialStatus[value].label,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <View style={styles.profilePicView}>
            {this.state.ImageSpinner ? (
              <ActivityIndicator style={{ alignSelf: "center" }} size={"large"} color="blue" />
            ) : this.state.avatarSource === null ? (
              <View style={[styles.profilePicView, { borderWidth: 0 }]} />
            ) : (
              <Image style={styles.profilePic} source={{ uri: this.state.avatarSource }} />
            )}
          </View>
          <TouchableOpacity onPress={this.onSelectImage.bind(this)}>
            <Text style={styles.changeProfileText}>Change Profile</Text>
          </TouchableOpacity>
          <TextField
            placeholder="First Name"
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ firstName: value })}
            value={this.state.firstName}
          />
          <TextField
            placeholder="Last Name"
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ lastName: value })}
            value={this.state.lastName}
          />
          <RadioButtonView
            marialStatus={this.state.marialStatus}
            selectedValue={this.state.martialValue}
            selectedIndex={this.state.martialIndex}
            onPress={this.onPress.bind(this)}
          />
          <TextField
            placeholder="Age"
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ age: value })}
            value={this.state.age != null ? this.state.age.toString() : ""}
          />
          <TextField
            placeholder="State"
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ state: value })}
            value={this.state.state}
          />
          <TextField
            placeholder="Zip"
            inputStyle={styles.textField}
            placeholderTextColor={color.placeholderText}
            onChangeText={value => this.setState({ zip: value })}
            value={this.state.zip}
          />
          <Button style={styles.button} onPress={this.onSave.bind(this)}>
            <Text style={styles.buttonText}>SAVE</Text>
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
    userProfileInfo: state.user.userProfileInfo,
    userInfo: state.user.login,
    userDetails: state.user.userDetails,
  }),
  {
    getUserDetails,
    createUserProfile,
  },
)(EditProfile)
