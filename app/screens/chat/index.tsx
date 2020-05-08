import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert, Keyboard, Dimensions } from 'react-native';
import ChatBotSample from 'react-native-chatbot';
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { connect } from "react-redux"
import { getUserDetails } from "../../redux/actions/user"
import { getTourGuideById } from "../../redux/actions/travel"
import customSteps from "./steps.js"
let selectedType = ''
let selectedValue = ''
import { color, dimensions, spacing, fontsize } from "../../theme"

console.disableYellowBox = true;
class CustomComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      stepsType: [],
      userProfilePic: ''
    };

  }





  UNSAFE_componentWillMount() {

    console.log("componentWillMount_chat", this.props.type)
    let userName = this.props.user.login !== undefined ? this.props.user.login.firstname !== undefined
      ? this.props.user.login.firstname
      : this.props.user.userProfileInfo.data.firstname : this.props.user.userProfileInfo.data.firstname
    // alert("previousStep:" + JSON.stringify(this.props.previousStep))
    this.setState({ userProfilePic: this.props.user.userDetails.profilePic === "" ? 'https://image.flaticon.com/icons/png/512/149/149071.png' : this.props.user.userDetails.profilePic })

    if (this.props.type === "categories") {
      this.setState({
        title: customSteps.filterType.title,
        stepsType: customSteps.filterType.filter
      })
    } else if (this.props.type === "Hotels") {
      this.setState({
        title: customSteps.HotelsType.title,
        stepsType: customSteps.HotelsType.Hotels
      })
      let data = { value: this.props.previousStep.value, trigger: 'Question' }
      this.props.triggerNextStep(data);
    } else if (this.props.type === "Restaurants") {
      this.setState({
        title: customSteps.RestaurantsType.title,
        stepsType: customSteps.RestaurantsType.Restaurants
      })
      let data = { value: this.props.previousStep.value, trigger: 'Question' }
      this.props.triggerNextStep(data);
    } else if (this.props.type === "Activities") {
      this.setState({
        title: customSteps.ActivitiesType.title,
        stepsType: customSteps.ActivitiesType.Activities
      })
      let data = { value: this.props.previousStep.value, trigger: 'Question' }
      this.props.triggerNextStep(data);
    } else if (this.props.type === "Bar_Livemusic") {
      this.setState({
        title: customSteps.Bar_LivemusicType.title,
        stepsType: customSteps.Bar_LivemusicType.Bar_Livemusic
      })
      let data = { value: this.props.previousStep.value, trigger: 'Question' }
      this.props.triggerNextStep(data);
    } else if (this.props.type === "Beauty_Health") {
      this.setState({
        title: customSteps.Beauty_HealthType.title,
        stepsType: customSteps.Beauty_HealthType.Beauty_Health
      })
      let data = { value: this.props.previousStep.value, trigger: 'Question' }
      this.props.triggerNextStep(data);
    } else if (this.props.type === "Shops") {
      this.setState({
        title: customSteps.ShopsType.title,
        stepsType: customSteps.ShopsType.Shops
      })
      let data = { value: this.props.previousStep.value, trigger: 'Question' }
      this.props.triggerNextStep(data);
    } else if (this.props.type === "Specialty") {
      this.setState({
        title: customSteps.SpecialtyType.title,
        stepsType: customSteps.SpecialtyType.Specialty
      })
      let data = { value: this.props.previousStep.value, trigger: 'Question' }
      this.props.triggerNextStep(data);
    } else if (this.props.type === "Question") {
      this.setState({
        title: customSteps.QuestionType.title + ' ' + userName.charAt(0).toUpperCase() + userName.slice(1) + '?',
        stepsType: customSteps.QuestionType.Question
      })
    } else {
      let data = { value: this.props.previousStep.value, trigger: this.props.previousStep.value }
      this.props.triggerNextStep(data);
    }
  }

  onClick(value) {

    selectedValue = this.props.type == "categories" ? value : selectedValue
    selectedType = this.props.type == "Hotels" ? value : selectedType
    selectedType = this.props.type == "Restaurants" ? value : selectedType
    selectedType = this.props.type == "Activities" ? value : selectedType
    selectedType = this.props.type == "Bar_Livemusic" ? value : selectedType
    selectedType = this.props.type == "Beauty_Health" ? value : selectedType
    selectedType = this.props.type == "Shops" ? value : selectedType
    selectedType = this.props.type == "Specialty" ? value : selectedType
    selectedType = this.props.type == "Question" ? value : selectedType
    let data = { value: value, trigger: 'Selected', selected: this.props.type == "categories" ? selectedValue : selectedType }
    //console.log("data_123", JSON.stringify(data))
    this.props.triggerNextStep(data);
  }

  renderHeader() {
    return (
      <View style={{ borderBottomWidth: 1, borderBottomColor: 'grey', backgroundColor: 'white', borderTopLeftRadius: 10 }}>
        <Text style={{
          fontSize: fontsize.notificationText, fontWeight: '400', marginHorizontal: dimensions.width * 0.0266, marginVertical: dimensions.width * 0.0264,
          color: 'black', fontFamily: "OpenSans-Semibold"
        }}>{this.state.title}</Text>
      </View>
    )
  }

  renderItem({ item, index }) {
    return (
      <View style={{ backgroundColor: 'white', borderBottomLeftRadius: index == this.state.stepsType.length - 1 ? 10 : 0 }}>
        <TouchableOpacity onPress={this.props.touchAction === false ? null : this.onClick.bind(this, item.label)} style={{ borderBottomWidth: 1, borderBottomColor: 'grey' }}>
          <Text style={{ fontSize: fontsize.smallText, fontFamily: "OpenSans", fontWeight: '400', alignSelf: 'center', marginVertical: dimensions.width * 0.0136 }}>{item.label}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {

    if (this.props.value !== undefined) {
      return (
        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', marginRight: -dimensions.width * 0.0431, marginTop: this.props.type === 'Question' ? - 100 : 0 }}>
          <View style={{ backgroundColor: '#61cbff', borderRadius: 10, borderBottomRightRadius: 0, justifyContent: 'center', marginRight: dimensions.width * 0.0116 }}>
            <Text style={{ fontSize: 14, fontWeight: '400', alignSelf: 'center', color: 'black', marginHorizontal: dimensions.width * 0.06 }}>{this.props.previousStep.value}</Text>
          </View>
          <View style={{ justifyContent: 'center', width: dimensions.width * 0.124, height: dimensions.width * 0.124, backgroundColor: 'white', marginLeft: 3, borderRadius: dimensions.width * 0.124 / 2, borderBottomLeftRadius: 0 }}>
            <Image style={{ width: dimensions.width * 0.1094, height: dimensions.width * 0.1094, borderRadius: dimensions.width * 0.1094 / 2, alignSelf: 'center' }}
              source={{ uri: this.state.userProfilePic }} />
          </View>
        </View>
      )
    } else {
      return (
        <View style={{ flexDirection: 'row', backgroundColor: 'transparent' }}>
          {this.props.showUserAvatar == false ?
            (<View style={{ marginLeft: dimensions.width * 0.106 }} />)
            : this.props.type === 'Question' ?
              (<View style={{ width: dimensions.width * 0.106 }} />)
              : (< View style={{
                justifyContent: 'center', width: dimensions.width * 0.124, height: dimensions.width * 0.124, backgroundColor: 'white', borderRadius: dimensions.width * 0.124 / 2,
                marginLeft: -dimensions.width * 0.0416, marginRight: dimensions.width * 0.019946, borderBottomRightRadius: 0, marginTop: - dimensions.width * 0.02946
              }}>
                <Image style={{ width: dimensions.width * 0.1094, height: dimensions.width * 0.1094, borderRadius: dimensions.width * 0.1094 / 2, alignSelf: 'center' }}
                  source={{ uri: this.props.tourGuidePic == undefined ? 'https://image.flaticon.com/icons/png/512/149/149071.png' : this.props.tourGuidePic }} />
              </View>)
          }
          <FlatList
            style={{ width: dimensions.width / 2.14, marginTop: this.props.type === 'Question' ? -dimensions.width * 0.076 : -dimensions.width * 0.0364, borderRadius: 10 }}
            data={this.state.stepsType}
            ListHeaderComponent={this.renderHeader.bind(this)}
            renderItem={this.renderItem.bind(this)} />
        </View >
      );
    }
  }
}

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  user: any
  travel: any
  getUserDetails: any
  getTourGuideById: any
}
interface chatState {
  steps: any
  travelGuideId: any
  showChatBot: any
  tourGuidePic: any
  keyboardHeight: any
  keyboardShown: any
}

import firebase from 'react-native-firebase';
let Analytics = firebase.analytics();
let value = 0

class Chat extends Component<Props, chatState> {
  constructor(props) {
    super(props);
    this.state = {
      steps: [],
      travelGuideId: "",
      showChatBot: false,
      tourGuidePic: "",
      keyboardHeight: 0,
      keyboardShown: false
    }
    Analytics.setAnalyticsCollectionEnabled(true);
    Analytics.logEvent('Chat', {
      group_id: 'Chat',
      score: 1
    })

    //this._keyboardDidShow = this._keyboardDidShow.bind(this)
    //this._keyboardDidHide = this._keyboardDidHide.bind(this)
  }
  componentDidMount() {
    // alert("height_123" + dimensions.height)
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
  }
  _keyboardDidShow(event) {
    // alert("shown" + this.state.keyboardShown)
    //alert('Keyboard Shown' + event.endCoordinates.height);
    value = event.endCoordinates.height;
    let self = this
    this.setState({
      keyboardHeight: event.endCoordinates.height,
      keyboardShown: true
    }, () => {
      self.keyboardDidShowListener.remove();
    })

  }
  async UNSAFE_componentWillMount() {

    let id =
      this.props.user.login !== undefined
        ? this.props.user.login.id !== undefined ? this.props.user.login.id
          : this.props.user.userProfileInfo.data.id : this.props.user.userProfileInfo.data.id
    let userDetails = await this.props.getUserDetails(id, "token")
    //console.log("data_userDetails______123:", this.props.user.userDetails.travelGuideId)
    this.setState({
      travelGuideId: await userDetails.payload.travelGuideId
    })

    if (this.props.user.userDetails.travelGuideId == "" || this.props.user.userDetails.travelGuideId == null) {
      console.log("data_123_if")
      this.setState({ showChatBot: false })
      Alert.alert(
        "Stay Tune",
        "Please Select your tour guide to get travel suggestions",
        [
          {
            text: "OK",
            onPress: () => {
              this.props.navigation.push("MainScreen", {
                navigateTo: "Select tour guide"
              })
            },
          },
        ],
        { cancelable: false },
      )
    }
    else {
      console.log("data_123_else")
      let userName = this.props.user.login !== undefined
        ? this.props.user.login.firstname !== undefined ? this.props.user.login.firstname
          : this.props.user.userProfileInfo.data.firstname : this.props.user.userProfileInfo.data.firstname

      let guideInfo = await this.props.getTourGuideById(this.state.travelGuideId)
      //console.log("getGuideById__123:", guideInfo.payload.url)
      await this.setState({ tourGuidePic: guideInfo.payload.url === undefined ? 'https://image.flaticon.com/icons/png/512/149/149071.png' : guideInfo.payload.url })
      // console.log("user_123", JSON.stringify(this.props.user))
      await this.setState({
        steps: [
          {
            id: 'Greet',
            message: "Hi" + ' ' + userName.charAt(0).toUpperCase() + userName.slice(1) + ", It’s Gwenyth.  Thanks for choosing me as your virtual tour guide. I’ll make sure you get to experience this town in the most unique way.",
            //Thanks for choosing me as your virtual tour guide. I’ll make sure you get to experience this town in the most unique way.
            trigger: 'Help',
          },
          {
            id: 'Help',
            message: `Let’s get started, ${userName.charAt(0).toUpperCase() + userName.slice(1)}?`,
            trigger: 'filter types',
          },
          {
            id: 'filter types',
            //component: <CustomComponent triggerNextStep={this.triggerNextStep} type="categories" user={this.props.user} showUserAvatar={false} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            user: true,
            userAvatar: 'https://image.flaticon.com/icons/png/512/149/149071.png',
            // validator: this.onValidator.bind(this),
            trigger: 'triggerUser',

          },
          {
            id: 'Hotels',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type="Hotels" user={this.props.user} touchAction={false} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'Selected',
          },
          {
            id: 'Restaurants',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type="Restaurants" user={this.props.user} touchAction={false} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'Selected',
          },
          {
            id: 'Activities',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type="Activities" user={this.props.user} touchAction={false} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'Selected',
          },
          {
            id: 'Bar & Live music',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type="Bar_Livemusic" user={this.props.user} touchAction={false} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'Selected',
          },
          {
            id: 'Beauty & Health',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type="Beauty_Health" user={this.props.user} touchAction={false} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'Selected',
          },
          {
            id: 'Shops',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type="Shops" user={this.props.user} touchAction={false} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'Selected',
          },
          {
            id: 'Specialty',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type="Specialty" user={this.props.user} touchAction={false} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'Selected',
          },
          {
            id: 'Selected',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} value='value' user={this.props.user} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'Question'
          },
          {
            id: 'Question',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type='Question' user={this.props.user} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'triggerUser'
          },
          {
            id: 'No',
            message: "Thanks, " + userName.charAt(0).toUpperCase() + userName.slice(1) + "! We appreciate 👏👏👏 your request. Hope my recommendations will help. I think you’ll have a great time. Let me know if you need anything else.",
            // end: true,
            waitAction: true,
            trigger: 'triggerNoUser',
          },
          {
            id: 'Yes',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type="categories" user={this.props.user} showUserAvatar={true} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'Done',
          },
          {
            id: 'triggerUser',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type="categories" user={this.props.user} showUserAvatar={true} tourGuidePic={this.state.tourGuidePic} />,
            waitAction: true,
            trigger: 'Done',
          },
          {
            id: 'triggerNoUser',
            component: <CustomComponent triggerNextStep={this.triggerNextStep} type="categories" user={this.props.user} showUserAvatar={true} tourGuidePic={this.state.tourGuidePic} />,
            user: true,
            waitAction: true,
            trigger: 'triggerUser',
          },
          {
            id: 'Done',
            message: 'extra step!!',
            end: true,
          }
        ]
      }, () => {
        this.setState({ showChatBot: true })
      })
      // console.log("componentWillMount", this.props.user)
    }

  }

  onValidator() {
    // console.log("validator_123", inputValue)
  }

  // componentDidMount() {
  //   this.keyboardDidShowListener = Keyboard.addListener(
  //     'keyboardDidShow',
  //     this._keyboardDidShow,
  //   );
  //   this.keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     this._keyboardDidHide,
  //   );
  // }

  // componentWillUnmount() {
  //   this.keyboardDidShowListener.remove();
  //   this.keyboardDidHideListener.remove();
  // }

  // _keyboardDidShow(e) {
  //   console.log('Keyboard Shown', e);
  //   this.setState({ keyboardHeight: e.endCoordinates.height })
  // }

  // _keyboardDidHide() {
  //   console.log('Keyboard Hidden');
  //   this.setState({ keyboardHeight: null })
  // }


  render() {
    // alert("height" + dimensions.height)
    // console.log("tourGuidePic_124:" + this.state.tourGuidePic)
    let avtarPic
    try {
      avtarPic = this.props.user.userDetails.profilePic == undefined ? 'https://image.flaticon.com/icons/png/512/149/149071.png' : this.props.user.userDetails.profilePic == '' ? 'https://image.flaticon.com/icons/png/512/149/149071.png' : this.props.user.userDetails.profilePic
    } catch (err) {

    }
    return (
      <View style={styles.container}>
        {this.state.showChatBot == false ?
          (<View />)
          : (<ChatBotSample
            steps={this.state.steps}
            botAvatar={this.state.tourGuidePic}
            style={{ backgroundColor: color.transparent }}
            contentStyle={{ backgroundColor: color.transparent }}
            customStyle={{ backgroundColor: 'transparent', padding: 0, borderWidth: 0, marginTop: -10 }}
            bubbleStyle={{ backgroundColor: "white" }}
            botFontColor="black"
            userAvatar={avtarPic}
            footerStyle={{ backgroundColor: 'white' }}
            inputStyle={{ color: 'black' }}
            submitButtonStyle={{ color: 'white' }}
            keyboardVerticalOffset={dimensions.height > 800 ? ((this.state.keyboardHeight) - (this.state.keyboardHeight / 1.5)) : ((this.state.keyboardHeight) - (this.state.keyboardHeight / 1.5))}
          // validator={this.onValidator.bind(this)}
          />
          )}
      </View>
    )
  }
}
export default connect(
  state => ({
    user: state.user,
    travel: state.travel
  }), { getUserDetails, getTourGuideById }
)(Chat);

