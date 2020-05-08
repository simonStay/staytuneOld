import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, ImageBackground, Image } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { Button } from "../../components/button"
import { Icon } from "../../components/icon"
import { travelPreferenceTypes, selectedTravelPreferences, getPreferencesById } from "../../redux/actions/travel"
import { connect } from "react-redux"
import ImageLoad from "react-native-image-placeholder"
import AnimatedLoader from "react-native-animated-loader"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  selectedTravelPreferences: any
  travel: any
  travelPreferenceTypes: any
  travelCategoriesList: any
  travelPreferenceId: any
  getPreferencesById: any
  preferenceId: any
}
interface categoriesInfo {
  selectedPrefenceList: any
  categoryId: any
  categoriesList: any
  visible: boolean
  travelPreferenceId: any
  showButton: any
}

class TravelPreference extends Component<Props, categoriesInfo> {
  constructor(props: Props) {
    super(props)
    this.state = {
      categoryId: "",
      categoriesList: [],
      selectedPrefenceList: [],
      visible: this.props.travel.loader,
      travelPreferenceId: "",
      showButton: false
    }
  }

  async componentDidMount() {
    console.log("preferenceID", this.props.travelPreferenceId)
    try {
      let listPreferenceTypes = []
      if (this.props.travelPreferenceId == null || this.props.travelPreferenceId == "" || this.props.travelPreferenceId == "undefined") {
        await this.props.travelPreferenceTypes()
        listPreferenceTypes = this.props.travel.travelPreferenceTypes
      } else {
        await this.props.getPreferencesById(this.props.travelPreferenceId)
        listPreferenceTypes = this.props.travel.getPreferencesById.selectedTravelPreferences
        listPreferenceTypes.map((res, i) => {
          if (res.selected == true) {
            this.setState({ showButton: true })
          }
        })
      }

      await this.setState(
        {
          categoriesList: listPreferenceTypes,
        },
        async () => {
          this.setState({
            visible: this.props.travel.loader,
          })
        },
      )
      await this.props.selectedTravelPreferences(this.state.categoriesList)
    } catch (error) {
      console.log("error_TravelPreference:")
    }
  }

  async onSelectedPreference(preference) {
    console.log("preference", JSON.stringify(preference))
    let travelPreference = this.state.categoriesList
    let loopCount = 0
    travelPreference.map((res, i) => {
      loopCount = loopCount + 1
      if (res.name === preference.name) {
        if (res.selected) {
          this.state.selectedPrefenceList.map((res, i) => {
            if (res == preference.name) {
              this.state.selectedPrefenceList.splice(i, 1)
            }
          })
        } else {
          this.state.selectedPrefenceList.push(preference.name)
        }
        res.selected = !res.selected
      }
    })
    if (travelPreference.length === loopCount) {
      console.log("selected_123", JSON.stringify(travelPreference))
      this.setState({
        categoriesList: travelPreference,
      })
    }

    this.setState({ selectedPrefenceList: this.state.selectedPrefenceList })


    var selectedPrefencesTypes = []
    this.state.categoriesList.map((value, i) => {

      if (value.selected == true) {
        selectedPrefencesTypes.push({ name: value.categoryname, selected: value.selected })
      }
      console.log("selected_switches:", value.selected)

    })

    //alert(selectedPrefencesTypes.length)

    if (selectedPrefencesTypes.length == 0) {
      this.setState({ showButton: false })
    } else {
      this.setState({ showButton: true })
    }

    await this.props.selectedTravelPreferences(this.state.categoriesList)
  }

  async onNext() {
    this.props.navigation.push('SetBudget', { travelPreferenceId: this.props.travelPreferenceId })
  }

  renderItem = ({ item }) => {
    var ImageView

    if (item.selected) {
      ImageView = (
        <Image source={require("./../../assests/check-circle.png")} style={styles.checkImage} />
      )
    } else {
      ImageView = <View />
    }
    return (
      <TouchableOpacity
        onPress={this.state.visible == false ? this.onSelectedPreference.bind(this, item) : null}
        activeOpacity={1}
      >
        <ImageLoad
          style={styles.listImage}
          loadingStyle={{ size: "large", color: "blue" }}
          source={item.name == 'Business' ? require("./../../assests/business.jpg") : item.name == 'Local Experience' ? require("./../../assests/local-exp.png") :
            item.name == 'Travel On a Budget' ? require("./../../assests/travel-Bud.jpg") : item.name == 'Foodie' ? require("./../../assests/vegan.jpg") :
              item.name == 'Solo Traveler' ? require("./../../assests/solo-traveller.jpg") : item.name == 'Family Oriented' ? require("./../../assests/family.jpg") : require("./../../assests/shopping.jpg")}
          placeholderSource={require("./../../assests/placeholder-image.png")}
          placeholderStyle={styles.listImage}
        >
          <View style={[styles.transparentView, { opacity: item.selected ? 0.15 : 0.50 }]} />
        </ImageLoad>
        <View style={styles.elevateView}>
          {ImageView}
          <Text style={styles.categoryText}>{item.name}</Text>
        </View>
      </TouchableOpacity >
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.visible == false ? (
          <Text style={styles.textStyle}>
            Set Travel Theme
          </Text>
        ) : null}
        <FlatList
          data={this.state.categoriesList}
          //data={TravelCategories}
          extraData={this.state}
          renderItem={this.renderItem.bind(this)}
          numColumns={2}
        />
        {this.state.showButton == true ? (
          <Button style={styles.button} onPress={this.onNext.bind(this)}>
            <View style={styles.buttonLeft}>
              <Text style={styles.buttonText}>Next</Text>
            </View>
            <View style={styles.buttonRight}>
              <Icon icon={"back"} style={styles.icon} />
            </View>
          </Button>
        ) : null}
        <AnimatedLoader
          visible={this.state.visible}
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
  {
    travelPreferenceTypes,
    selectedTravelPreferences,
    getPreferencesById,
  },
)(TravelPreference)
