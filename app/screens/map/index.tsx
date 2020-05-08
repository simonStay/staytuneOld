import React, { Component } from "react"
import { View, TouchableOpacity, FlatList, Modal, Image, ScrollView, Platform, Alert, TextInput, AsyncStorage, Keyboard } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import { Text } from '../../components/text'
import MapView, { Marker } from "react-native-maps"
import { connect } from "react-redux"
import Geolocation from "@react-native-community/geolocation"
import { touristLocations, getFilterByType } from "../../redux/actions/places"
import { Button } from "../../components/button"
import SearchBar from "../../components/search-bar"
import { GoldBarView } from "../../components/goldBar"
import { Icon } from "../../components/icon"
import styles from "./styles"
import { filters } from "../filters/filters"
import { dimensions, color } from "../../theme"
import { CardView } from "../../components/card-view"
import RNGooglePlaces from 'react-native-google-places';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { sendUserLocation, saveLocationLogs, saveUserLocation, updateUserLocation } from "../../redux/actions/user"
import { notificationList } from "../../redux/actions/notifications"
import moment from "moment"

import firebase from 'react-native-firebase';
let Analytics = firebase.analytics();

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  handleSelectedValue: any
  travel: any
  touristLocations: any
  getFilterByType: any
  Marker: any
  onRight: any
  modalVisible: any
  startPlan: any
  places: any
  user: any
  userLat: any
  userLong: any
  sendUserLocation: any
  saveLocationLogs: any
  saveUserLocation: any
  updateUserLocation: any
  from: any
}
interface MapScreen {
  state: any
  region: any
  modalVisible: any
  touristLocations: any
  selectedFilter: any
  filteredResponse: any
  selectedType: any
  searchValue: any
  places: any
  deviceId: any
  userLocations: any
  initialUserModal: any
  showInitialModal: any
  showModal: any
}



class MapScreen extends Component<Props, MapScreen, {}> {
  constructor(props: Props) {
    super(props)
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null,
        modalVisible: false,
      },
      touristLocations: [],
      selectedFilter: false,
      filteredResponse: [],
      places: [],
      selectedType: '',
      searchValue: '',
      deviceId: '',
      userLocations: [],
      userLat: '',
      userLong: '',
      initialUserModal: false,
      showInitialModal: false,
      showModal: true
    }
    Analytics.setAnalyticsCollectionEnabled(true);
    Analytics.logEvent('Home_screen', {
      group_id: '12345',
      score: 1
    })
    // Analytics.setUserProperty("Home_scree", 'Map_Screen')
  }

  async UNSAFE_componentWillMount() {
    //alert(moment().format("DD-MM-YYYYThh:mm:ss"))

    Geolocation.getCurrentPosition(async (position) => {
      let location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
      // await this.locationTracking(location)
      //console.log("position", JSON.stringify(position))
      this.setState(
        {
          region: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }
        },
        async () => {
          console.log("From_123", this.props.from)
          let touristLocations = this.props.from === undefined ? await this.props.touristLocations(this.state.region) : await this.props.notificationList(this.props.userId)
          console.log("touristLocations_123", JSON.stringify(touristLocations))
          this.setState({
            touristLocations: touristLocations.payload,
          })
        },
      )
    })

    Geolocation.watchPosition(position => {
      console.log("position_123", JSON.stringify(position))
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
      })
    })

  }

  async componentWillUnmount() {
    try {
      this.props.onRef(undefined)
    } catch (err) {
      console.log("map_onRef:", err)
    }

    console.log("componentWillUnmount_123_mapscreen")
    this.setState({
      showInitialModal: false,
      showModal: false
    })
  }

  closeModal() {
    this.setState({
      showInitialModal: false,
      showModal: false
    })
    console.log('componentWillUnmount_123_mapscreen')
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({ showInitialModal: nextProps.showInitialModal })
  //   console.log("componentWillReceiveProps_OS_123", nextProps.showInitialModal)
  // }

  componentDidMount() {
    console.log("OS_123", Platform.OS + ',,,,,' + this.props.showInitialModal)
    try {
      this.props.onRef(this)
      // BackgroundGeolocation.configure({
      //   desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      //   stationaryRadius: 500,
      //   distanceFilter: 500,
      //   // notificationTitle: 'Background tracking',
      //   // notificationText: 'enabled',
      //   debug: false,
      //   startOnBoot: true,
      //   stopOnTerminate: false,
      //   locationProvider: Platform.OS === "ios"
      //     ? BackgroundGeolocation.DISTANCE_FILTER_PROVIDER
      //     : BackgroundGeolocation.ACTIVITY_PROVIDER,
      //   interval: 1000,
      //   // fastestInterval: 5000,
      //   // activitiesInterval: 10000,
      //   stopOnStillActivity: false,
      //   activityType: 'Fitness',
      //   saveBatteryOnBackground: false,
      //   startForeground: false,
      //   //syncUrl: 'https://staytune.austinconversionoptimization.com',
      //   //url: 'https://staytune.austinconversionoptimization.com',
      //   //httpHeaders: {
      //   //  'Content-Type': 'application/json'
      //   //},
      //   // customize post properties
      //   // postTemplate: {
      //   //     lat: this.state.userLat,
      //   //     lon: this.state.userLong,
      //   //     userId: this.state.userId,
      //   //     id: this.state.pid
      //   // }
      //   //postTemplate: ['@time', '@latitude', '@longitude', '@accuracy', '@bearing', '@speed']
      // });

    } catch (error) {
      console.log(" BackgroundGeolocation.configure:", error)
    }

    // BackgroundGeolocation.on('location', async (location) => {
    //   console.log("location_123:", location)
    //   // handle your locations here
    //   // to perform long running operation on iOS
    //   // you need to create background task


    //   BackgroundGeolocation.startTask(async (taskKey) => {
    //     console.log('startTask_123:', taskKey);

    //     // <------------ Enable comment to get notifications based on location ----------------->
    //     await this.locationTracking(location)
    //     // <------------ Enable comment to get notifications based on location ----------------->

    //     // execute long running task
    //     // eg. ajax post location
    //     // IMPORTANT: task has to be ended by endTask
    //     BackgroundGeolocation.endTask(taskKey);
    //   });
    // });

    // BackgroundGeolocation.on('stationary', (stationaryLocation) => {
    //   console.log("stationaryLocation_123:", stationaryLocation)
    //   // handle stationary locations here
    //   // Actions.sendLocation(stationaryLocation);
    // });

    // BackgroundGeolocation.on('error', (error) => {
    //   console.log('[ERROR] BackgroundGeolocation error:', error);
    // });

    // BackgroundGeolocation.on('start', () => {
    //   console.log('[INFO] BackgroundGeolocation service has been started');
    // });

    // BackgroundGeolocation.on('stop', () => {
    //   console.log('[INFO] BackgroundGeolocation service has been stopped');
    // });

    // BackgroundGeolocation.on('authorization', (status) => {
    //   console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
    //   if (status !== BackgroundGeolocation.AUTHORIZED) {
    //     // we need to set delay or otherwise alert may not be shown
    //     setTimeout(() =>
    //       Alert.alert('App requires location tracking permission', 'Would you like to open app settings?', [
    //         { text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings() },
    //         { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' }
    //       ]), 1000);
    //   }
    // });

    // BackgroundGeolocation.on('background', () => {
    //   console.log('[INFO] App is in background:');
    // });

    // BackgroundGeolocation.on('foreground', () => {
    //   console.log('[INFO] App is in foreground');
    // });

    // BackgroundGeolocation.on('abort_requested', () => {
    //   console.log('[INFO] Server responded with 285 Updates Not Required');

    //   // Here we can decide whether we want stop the updates or not.
    //   // If you've configured the server to return 285, then it means the server does not require further update.
    //   // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
    //   // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    // });

    // BackgroundGeolocation.on('http_authorization', () => {
    //   console.log('[INFO] App needs to authorize the http requests');
    // });

    // BackgroundGeolocation.checkStatus(status => {
    //   console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
    //   console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
    //   console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);
    //   console.log('checkStatus_123:', status);
    //   // you don't need to check status before start (this is just the example)
    //   if (!status.isRunning) {
    //     BackgroundGeolocation.start(); //triggers start on start event
    //   } else {
    //     BackgroundGeolocation.on('stationary', (stationaryLocation) => {
    //       // handle stationary locations here
    //       console.log('[INFO] BackgroundGeolocation service is running', stationaryLocation);
    //     });
    //   }
    // });

    // BackgroundGeolocation.getCurrentLocation(async (position) => {
    //   console.log("getCurrentLocation_position:", position)
    // },
    //   err => {
    //     console.log("getCurrentLocation_position_err:", err)
    //   },
    //   {
    //     maximumAge: 100,
    //     enableHighAccuracy: true
    //   }
    // );

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
  }

  onRegionChange(region) {
    this.setState({ region: region })
  }

  async onFilter(type, name) {
    // alert("type")
    this.setState({ filteredResponse: [] })
    let region = this.state.region
    let FilteredData = await this.props.getFilterByType(type, region)
    // console.log("FilteredData_123", JSON.stringify(FilteredData))
    //alert("type_123:" + type)
    this.setState({
      selectedFilter: true,
      selectedType: name,
      filteredResponse: FilteredData.payload
    })
  }

  renderFilters() {
    let filterList = []
    filters.map((res, i) => {
      filterList.push(
        <TouchableOpacity onPress={this.onFilter.bind(this, res.type, res.name)} style={{ justifyContent: 'space-between', margin: 10, backgroundColor: this.state.selectedType === res.name ? color.buttonColor : "#fff", borderRadius: 6 }}>
          <Text style={{ color: 'black', fontSize: 16, paddingVertical: 10, paddingHorizontal: 20 }}>{res.name}</Text>
        </TouchableOpacity>)
    })
    return (filterList)
  }

  filteredType(item) {
    console.log("item", JSON.stringify(item))
    return (
      <CardView style={{ height: 150 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.4 }} >
            {item.item.photos !== undefined ? (
              <Image source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${item.item.photos[0].photo_reference}&key=AIzaSyBI_ae3Hvrib8Bao3_WrhXLEHKuGj1J8pQ` }} style={{ height: '100%', width: '100%' }} />
            ) : (
                <Image source={require("./../../assests/placeholder-image.png")} style={{ height: '100%', width: '100%' }} />
              )}
          </View>
          <View style={{ flex: 0.6 }} >
            <View style={{ flex: 1 }}>

              <Text style={{
                color: '#000',
                fontSize: 24,
                textAlign: "justify",
                marginHorizontal: 10,
                fontFamily: "OpenSans-Semibold"
              }} numberOfLines={2}>{item.item.name}</Text>
              <Text style={{
                color: '#000',
                fontSize: 15,
                textAlign: "justify",
                marginVertical: 20,
                marginHorizontal: 10,
                fontFamily: "OpenSans"
              }} numberOfLines={3}>{item.item.vicinity}</Text>
            </View>
          </View>
        </View>
      </CardView>
    )
  }

  getUserRange(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c * 1000; // Distance in meters
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  async locationTracking(location) {
    console.log("locationTracking_123:", location)
    try {
      let currentLocation = {
        latitude: location.latitude,
        longitude: location.longitude,
      }
      await this.props.saveUserLocation(currentLocation)
      await this.state.userLocations.push({
        longitude: location.longitude,
        time: location.time,
        latitude: location.latitude,
        accuracy: location.accuracy
      })
      await this.setState({
        userLocations: this.state.userLocations,
        userLat: location.latitude,
        userLong: location.longitude
      }, async () => {
        await console.log("saveLocationLogs_123:", JSON.stringify(this.state.userLocations))
        await this.props.saveLocationLogs(this.state.userLocations)
      })
      let playerId = await AsyncStorage.getItem('@deviceId')

      let locationInfo = {
        userId: await this.props.user.login !== undefined ? this.props.user.login.id : this.props.user.userProfileInfo.data.id,
        lat: await location.latitude,
        long: await location.longitude,
        date: moment().format("DD-MM-YYYYThh:mm:ss")
      }

      console.log("locationInfo_appcontainer_123", JSON.stringify(locationInfo))
      if (this.props.user.userLocationLogs.length != 0) {
        let userInitialLocation = this.props.user.userLocationLogs[0];
        let userFinalLocation = this.props.user.userLocationLogs[this.props.user.userLocationLogs.length - 1];

        let Lat1 = userInitialLocation.latitude
        let Long1 = userInitialLocation.longitude

        let Lat2 = userFinalLocation.latitude
        let Long2 = userFinalLocation.longitude

        let calculateRange = this.getUserRange(Lat1, Long1, Lat2, Long2)
        console.log("calculateRange_123:", calculateRange)
        if (this.props.user.userLocationLogs.length == 1) {
          await this.props.updateUserLocation(locationInfo)
          console.log("if_locationTracking")
        } else {
          if (calculateRange >= 100) {
            let emptyLocation = []
            await this.props.updateUserLocation(locationInfo)
            await this.props.saveLocationLogs(emptyLocation)
            console.log("else_locationTracking:", calculateRange)
          }
        }
      }


    } catch (error) {
      console.log("sendUserLocation_API_123:", error)
    }
  }

  onSearchValueChange(event) {
    // var searchValue = event.nativeEvent.text.toLowerCase();
    // console.log("searchValue:" + searchValue)
    // this.setState({
    //   searchValue: searchValue
    // })
    // if (searchValue !== '') {
    //   RNGooglePlaces.getAutocompletePredictions(searchValue)
    //     .then((place) => {
    //       this.setState({
    //         places: place
    //       })
    //       console.log("place_123", JSON.stringify(place));
    //     })
    //     .catch(error => console.log(error.message));
    // } else {
    //   this.setState({
    //     places: []
    //   })
    // }
  }

  onTouchStart() {
    Keyboard.dismiss()
    this.props.navigation.push("MainScreen", {
      navigateTo: "CHAT"
    })
  }

  placesListView(item) {
    return (
      <View style={{ paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: '#d3d3d3' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ marginLeft: 20 }}>{item.item.primaryText}</Text>
        </View>
      </View>
    )
  }

  handlefilter() {
    this.onFilter(filters[0].type, filters[0].name)
    this.props.onRight()
  }
  initialUser() {
    if (this.state.showModal === true) {
      this.setState({
        showInitialModal: true
      })
    }
  }

  skipModal() {
    this.setState({
      showInitialModal: false,
      showModal: false
    })
  }

  render() {
    console.log("start_plan", this.props.startPlan)
    if (this.props.travel.savedLocations !== undefined) {
      if (this.props.travel.savedLocations.length === 0 && this.props.travel.updatetravelPreferenceInfo === undefined && this.state.showModal === true) {
        let self = this
        setTimeout(function () { self.initialUser() }, 500);
      }
    } else if (this.props.user.register !== undefined) {
      if (this.props.user.register.message === "User has been registered successfully " && this.props.travel.updatetravelPreferenceInfo === undefined) {
        let self = this
        setTimeout(function () { self.initialUser() }, 700);
      }
    }
    return (
      <View style={{ flex: 1 }}>
        {this.state.region.latitude !== null ? (
          <MapView
            ref="map"
            style={styles.map}
            region={this.state.region}
            zoomEnabled={true}
            onRegionChangeComplete={this.onRegionChange.bind(this)}
            showsUserLocation={true}
            initialRegion={this.state.region}
          >
            {this.state.touristLocations != undefined ? this.state.touristLocations.length > 0
              ? this.state.touristLocations.map(location => {
                // console.log("Location_123", JSON.stringify(location))
                return (
                  <MapView.Marker
                    coordinate={{
                      latitude: location.geometry != undefined ? parseFloat(location.geometry.location.lat) : location.lat,
                      longitude: location.geometry != undefined ? parseFloat(location.geometry.location.lng) : location.long,
                    }}
                    image={location.icon}
                    title={location.name}
                  />
                )
              })
              : null : null}
          </MapView>
        ) : null}
        <SearchBar SearchValue={this.state.searchValue} onSearchValueChange={this.onSearchValueChange.bind(this)} places={this.state.places} onTouchStart={this.onTouchStart.bind(this)} />
        <TouchableOpacity
          style={styles.filter}
          onPress={this.handlefilter.bind(this)}
        >
          <GoldBarView style={styles.goldBar}>
            <Icon icon={"filter"} style={styles.filterIcon} />
          </GoldBarView>
        </TouchableOpacity>
        {(this.props.travel.savedLocations === undefined ||
          this.props.travel.savedLocations.length === 0) || this.props.startPlan ? (
            <TouchableOpacity
              style={this.state.showInitialModal ? styles.disableStartPlan : styles.startPlan}
              disabled={this.state.showInitialModal}
              onPress={this.props.handleSelectedValue.bind(this, "Travel preference")}
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={styles.left}>
                  <Text style={styles.buttonText}>Start your plan</Text>
                </View>
                <View style={styles.right}>
                  <Icon icon={"back"} style={styles.icon} />
                </View>
              </View>
            </TouchableOpacity>
          ) : null}
        {/* {this.props.travel.savedLocations !== undefined ?
          this.props.travel.savedLocations.length === 0 ? this.initialUser() : null : null} */}
        {this.state.showInitialModal ? (<Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showInitialModal}
          onRequestClose={() => {
            // alert('Modal has been closed.');
          }}>
          {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}> */}
          <View style={styles.initialUserModal}>
            <View style={styles.modalHeader}>
              <View style={styles.headerAlign}>
                <Text style={styles.headerText}>Welcome {this.props.user.login != undefined ? this.props.user.login.firstname.charAt(0).toUpperCase() + this.props.user.login.firstname.slice(1) : this.props.user.userProfileInfo != undefined ? this.props.user.userProfileInfo.data.firstname.charAt(0).toUpperCase() + this.props.user.userProfileInfo.data.firstname.slice(1) : null}! For your personalized recommendations, please click on "start your plan" to set travel preferences</Text>
              </View>
            </View>
            <View style={styles.modalFooter}>
              <TouchableOpacity onPress={this.skipModal.bind(this)} style={styles.skipButton}>
                <View style={styles.headerAlign}>
                  <Text style={styles.headerText}>SKIP</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.triangle, styles.triangleDown]} />
          {/* </View> */}
        </Modal>) : null}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            // alert('Modal has been closed.');
          }}>
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', opacity: 0.9, justifyContent: 'center', aligItems: 'center' }}>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => {
                this.setState({ selectedFilter: false, selectedType: '', touristLocations: this.props.places.touristLocations })
                this.props.onRight()
                this.handlefilter.bind(this)
              }} style={styles.topIcon}>
                <Icon icon={"cross"} style={{ marginLeft: 30 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.9, flexDirection: 'row', flexWrap: "wrap" }}>
              <View style={{ flex: 1 }}>
                <View style={{ height: 80, backgroundColor: '#d3d3d3' }} >
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <ScrollView style={{ flex: 1, marginTop: 10 }} horizontal={true} contentContainerStyle={{ flexDirection: 'row', flexWrap: "wrap" }}>
                      {this.renderFilters()}
                    </ScrollView>
                  </View>
                </View>
                <View style={styles.list} >
                  <View style={{ flex: 1 }}>
                    {this.state.filteredResponse.length !== 0 ? (
                      <FlatList
                        data={this.state.filteredResponse}
                        renderItem={(item) => this.filteredType(item)}
                      />
                    ) : (
                        <Text style={{
                          color: '#fff',
                          fontSize: 20,
                          textAlign: "center",
                          justifyContent: 'center',
                          fontFamily: "OpenSans"
                        }}>No {this.state.selectedType.toUpperCase()} found near to your location</Text>
                      )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    travel: state.travel,
    places: state.places,
  }),
  { touristLocations, getFilterByType, sendUserLocation, saveUserLocation, saveLocationLogs, updateUserLocation, notificationList },
)(MapScreen)
