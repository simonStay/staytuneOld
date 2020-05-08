import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, Image, ImageBackground } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { CardView } from "../../components/card-view"
import { travelPreferenceTypes, selectedTravelPreferences } from "../../redux/actions/travel"
import { connect } from "react-redux"
import AnimatedLoader from "react-native-animated-loader"
import _ from 'lodash';
import { Icon } from "../../components/icon"
import { color, dimensions } from "../../theme"
import firebase from 'react-native-firebase';
let Analytics = firebase.analytics();

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  selectedTravelPreferences: any
  travel: any
  travelPreferenceTypes: any
  travelCategoriesList: any
  savedLocations: any
  getLocationInfo: any
  getBudgetInfo: any
  locationBudgetInfo: any
}
interface savedLocationsInfo {
  visible: boolean
  savedLocations: any
}

class SavedLocations extends Component<Props, savedLocationsInfo> {
  constructor(props: Props) {
    super(props)
    this.state = {
      savedLocations: [],
      visible: this.props.travel.loader,
    }
    Analytics.setAnalyticsCollectionEnabled(true);
    Analytics.logEvent('Saved_locations', {
      group_id: 'Saved_locations',
      score: 1
    })
  }

  async componentDidMount() {
    this.setState({
      savedLocations: await this.props.travel.savedLocations,
    })
  }

  onLocation(item) {
    this.props.getLocationInfo(item)
  }

  onBudget(item) {
    this.props.locationBudgetInfo(item)
  }
  onNotification(item) {
    console.log("item_123", item)
    this.props.navigation.push("MainScreen", {
      navigateTo: "NOTIFICATIONS",
      preferenceId: item.id
    })
  }

  renderItem = ({ item }) => {
    let total
    if (item.totalBudget == '' || item.totalBudget == null) {
      total = ''
    } else {
      total = `$` + item.totalBudget
    }
    return (
      <CardView>
        <ImageBackground source={require("./../../assests/austin.jpg")} style={styles.imageView} >
          <View style={styles.transparentView} />
        </ImageBackground>
        <View style={styles.elevateView}>
          <Text style={styles.cityText}>{item.city}</Text>
          <Text style={styles.budgetText}>{total}</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.onBudget.bind(this, item)} style={{ height: dimensions.width / 7, width: dimensions.width / 3, alignItems: 'center', justifyContent: 'center' }}>
            <Icon icon={"budgetBlack"} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onLocation.bind(this, item)} style={{ height: dimensions.width / 7, width: dimensions.width / 3, alignItems: 'center', justifyContent: 'center' }}>
            <Icon icon={"edit"} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.onNotification.bind(this, item)} style={{ height: dimensions.width / 7, width: dimensions.width / 3, alignItems: 'center', justifyContent: 'center' }}>
            <Icon icon={"notification"} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </CardView>
    )
  }

  render() {
    // console.log("savedLocations:" + JSON.stringify(this.state.savedLocations))
    return (
      <View style={styles.container}>
        {this.props.travel.savedLocations != undefined ? (
          <View style={{ marginHorizontal: 6 }}>
            <FlatList
              data={this.props.travel.savedLocations}
              extraData={this.state}
              renderItem={this.renderItem.bind(this)}
            />
          </View>
        ) : null}
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
  {
    travelPreferenceTypes,
    selectedTravelPreferences,
  },
)(SavedLocations)
