import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, Alert } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { GoldBarView } from "../../components/goldBar"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Switch } from "../../components/switch"
import { Toggle } from "react-powerplug"
import { Icon } from "../../components/icon"

import _ from "lodash"
import { connect } from "react-redux"
import AnimatedLoader from "react-native-animated-loader"
import { updateTravelPreferences, userSavedLocations } from "../../redux/actions/travel"
import firebase from 'react-native-firebase';
let Analytics = firebase.analytics();

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  updateTravelPreferences: any
  user: any
  getValue: any
  travel: any
  userSavedLocations: any
}
interface UserInformation {
  selectedId: any
  selectedPreference: any
  visible: boolean
  userInitialInterests: any
  listOpen: any
  categories: any
  update: any
}

class SetInitialInterest extends Component<Props, UserInformation> {
  state: UserInformation
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedId: "",
      selectedPreference: [],
      categories: [],
      visible: this.props.travel.loader,
      userInitialInterests: [],
      listOpen: false,
      update: false
    }
  }

  async componentDidMount() {
    // alert(dimensions.width)
    try {
      if (this.props.travel.travelPreferenceInfo == undefined ||
        this.props.travel.travelPreferenceInfo == "undefined") {
        console.log("categories_123_if:", this.props.travel.editTravelPreferences.categoriesList)
        await this.setState({ categories: this.props.travel.editTravelPreferences.categoriesList, update: true })

      } else {
        //console.log("categories_123_else")
        await this.setState({ categories: this.props.travel.travelPreferenceInfo.categoriesList, update: true })
      }
    } catch (error) {
      console.log("categories_catch_error", error)
    }
  }

  onLeft() {
    this.props.navigation.goBack()
  }

  async onNext() {

    // console.log("userInitialInterests_123" + JSON.stringify(this.state.categories))
    var selectedSubCategorires = []
    this.state.categories.map((res, i) => {
      res.subCategories.map((value, j) => {
        if (value.selected == true) {
          selectedSubCategorires.push({ name: value.categoryname, selected: value.selected })
        }
        console.log("selected_switches:", value.selected)
      })
    })

    console.log("selectedSubCategorires_123:", selectedSubCategorires)
    console.log("selectedSubCategorires_123.length:", selectedSubCategorires.length)

    if (selectedSubCategorires.length == 0) {
      Alert.alert(
        "Stay Tune",
        "Please choose some subcategories",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
    } else {
      let userId
      if (this.props.user.userProfileInfo == undefined) {
        userId = this.props.user.login.id
      } else {
        userId = this.props.user.userProfileInfo.data.id
      }
      try {
        let setTravelBudget = {
          preferenceId: this.props.travel.travelPreferenceInfo != undefined ? this.props.travel.travelPreferenceInfo.id : this.props.travel.travelInfo.preferenceId,
          userId: userId,
          selectedCategories: this.state.categories,
        }

        await this.props.updateTravelPreferences(setTravelBudget)
        if (this.props.travel.updatetravelPreferenceInfo.status == "success") {
          let self = this
          // alert("success")
          // setTimeout(() => {
          //     self.props.navigation.push('MainSCreen')
          // }, 100)
          if (this.state.update === true) {
            setTimeout(() => {
              Alert.alert(
                "Stay Tune",
                "Travel preference is successfully created",
                [
                  {
                    text: "OK",
                    onPress: async () => {
                      console.log("userProfileInfo", this.props.user.userProfileInfo)
                      let userId =
                        this.props.user.userProfileInfo === undefined
                          ? this.props.user.login.id
                          : this.props.user.userProfileInfo.id
                      this.props.userSavedLocations(userId)
                      Analytics.setAnalyticsCollectionEnabled(true);
                      Analytics.logEvent('Travel_preference', {
                        group_id: 'Travel_preference',
                        score: 1
                      })
                      this.props.navigation.push("MainScreen", {
                        userId: userId,
                        from: 'interest',
                        preferenceId: this.props.travel.travelPreferenceInfo != undefined ? this.props.travel.travelPreferenceInfo.id : this.props.travel.travelInfo.preferenceId,
                        selectedValue: "Select tour guide",
                        headerTitle: "TOUR GUIDE",
                      })
                    },
                  },
                ],
                { cancelable: false },
              )
            }, 100)
          } else {
            setTimeout(() => {
              Alert.alert(
                "Stay Tune",
                "Created your Travel preference successfully",
                [
                  {
                    text: "OK",
                    onPress: () => {
                      console.log("userProfileInfo", this.props.user.userProfileInfo)
                      let userId =
                        this.props.user.userProfileInfo === undefined
                          ? this.props.user.login.id
                          : this.props.user.userProfileInfo.id

                      this.props.userSavedLocations(userId)
                      this.props.navigation.push("MainScreen", {
                        userId: userId,
                        selectedValue: "Select tour guide",
                        headerTitle: "TOUR GUIDE",
                      })
                    },
                  },
                ],
                { cancelable: false },
              )
            }, 100)
          }

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
        console.log("travel_preference_error_on_next:", error)
      }
    }
  }

  async onToggleList(item) {
    let count = 0
    if (this.state.selectedPreference.length == 0) {
      this.state.selectedPreference.push({ id: item.id })
    } else {
      this.state.selectedPreference.map((res, i) => {
        if (res.id === item.id) {
          this.state.selectedPreference.splice(i, 1)
          count++
        }
      })
      if (count === 0) {
        this.state.selectedPreference.push({ id: item.id })
      }
    }
    await this.setState({ selectedPreference: this.state.selectedPreference })
  }

  toggleSwitch(item, res, toggle, on, showSublist) {
    if (on === true) {
      let categories = this.state.categories
      let selected = false
      categories.map(category => {
        if (item.id === category.id) {
          category.subCategories.map(preferenceCategory => {
            if (res.id === preferenceCategory.id) {
              preferenceCategory.selected = true
              selected = !selected
            }
          })
        }
      })
    } else {
      let categories = this.state.categories
      categories.map(category => {
        if (item.id === category.id) {
          category.subCategories.map(preferenceCategory => {
            if (res.id === preferenceCategory.id) {
              preferenceCategory.selected = false
            }
          })
        }
      })
    }
  }

  onToggleChange(res) {
    let categories = this.state.categories
    if (res) {
      this.setState(
        {
          categories: categories,
        },
        () => {
          console.log("categories_State", JSON.stringify(this.state.categories))
        },
      )
    }
  }
  renderItem({ item }) {
    var count = 0
    var showSublist
    var ImageView
    this.state.selectedPreference.map((res, i) => {
      if (res.id == item.id) {
        showSublist = true
        count = count + 1
      }
      if (count === 0) {
        showSublist = false
      }
    })

    if (showSublist == true) {
      ImageView = <Icon icon={"verticaldownarrow"} style={styles.toggleBackIcon} />
    } else {
      ImageView = <Icon icon={"back"} style={styles.toggleBackIcon} />
    }

    return (
      <View>
        <View style={styles.mainListView}>
          <TouchableOpacity
            style={styles.preferenceRow}
            onPress={this.onToggleList.bind(this, item)}
          >
            <View style={styles.preferenceLeftRow}>
              <Text style={styles.preferenceText}>{item.categoryname}</Text>
            </View>
            <View style={styles.preferenceRightRow}>{ImageView}</View>
          </TouchableOpacity>
        </View>
        <View style={styles.subListView}>
          {showSublist == true
            ? item.subCategories.map((res, i) => {
              return (
                <View
                  style={[
                    styles.subListRow,
                    { borderBottomWidth: i === item.subCategories.length - 1 ? 0 : 1 },
                  ]}
                >
                  <View style={styles.subListLeftRow}>
                    <Text style={styles.subcategoryText}>{res.categoryname}</Text>
                  </View>
                  <View style={styles.subListRightRow}>
                    <Toggle
                      initial={res.selected === true ? true : false}
                      onChange={this.onToggleChange.bind(this)}
                    >
                      {({ on, toggle }) => (
                        <Switch
                          trackOnStyle={styles.trackOn}
                          trackOffStyle={styles.trackOff}
                          thumbOnStyle={styles.thumbOn}
                          thumbOffStyle={styles.thumbOff}
                          value={on}
                          onToggle={toggle}
                          getValue={this.toggleSwitch(item, res, toggle, on, showSublist)}
                        />
                      )}
                    </Toggle>
                  </View>
                </View>
              )
            })
            : null}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />

        <Header
          style={styles.header}
          headerText={"SET INITIAL INTEREST"}
          titleStyle={styles.headerTitle}
          leftIcon={"back"}
          onLeftPress={this.onLeft.bind(this)}
        />
        <GoldBarView />

        <FlatList
          style={{ flex: 1, marginTop: 10 }}
          data={this.state.categories}
          extraData={this.state}
          renderItem={this.renderItem.bind(this)}
        />

        <View style={{ marginTop: 15 }}>
          <Button style={styles.button} onPress={this.onNext.bind(this)}>
            <Text style={styles.buttonText}>Submit</Text>
          </Button>
        </View>

        <AnimatedLoader
          visible={this.props.travel.loader}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("./../loader.json")}
          animationStyle={styles.lottie}
          speed={1}
        />
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    travel: state.travel,
  }),
  { updateTravelPreferences, userSavedLocations },
)(SetInitialInterest)
