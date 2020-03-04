import React, { Component } from "react"
import { View, Text, TouchableOpacity, FlatList, Modal, Image, ScrollView } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"

import MapView, { Marker } from "react-native-maps"
import { connect } from "react-redux"
import Geolocation from "@react-native-community/geolocation"
import { touristLocations, getFilterByType } from "../../redux/actions/places"
import { Button } from "../../components/button"
import { Icon } from "../../components/icon"
import styles from "./styles"
import { filters } from "../filters/filters"
import { dimensions, color } from "../../theme"
import { CardView } from "../../components/card-view"

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
}
interface MapScreen {
  state: any
  region: any
  modalVisible: any
  touristLocations: any
  selectedFilter: any
  filteredResponse: any
  selectedType: any
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
      selectedType: ''
    }
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(position => {
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
          let touristLocations = await this.props.touristLocations(this.state.region)
          // console.log("touristLocations_mount", JSON.stringify(touristLocations))
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

  // componentWillReceiveProps(nextProps) {
  //   alert("Props" + nextProps.modalVisible)
  //   this.setState({ modalVisible: nextProps.modalVisible })
  // }

  onRegionChange(region) {
    this.setState({ region: region })
  }

  async onFilter(type) {
    let region = this.state.region
    let FilteredData = await this.props.getFilterByType(type, region)
    console.log("FilteredData_123", JSON.stringify(FilteredData))
    //alert("type_123:" + type)
    this.setState({
      selectedFilter: true,
      selectedType: type,
      filteredResponse: FilteredData.payload
    })
  }

  renderFilters() {
    let filterList = []
    filters.map((res, i) => {
      filterList.push(
        <TouchableOpacity onPress={this.onFilter.bind(this, res.type)} style={{ justifyContent: 'space-between', margin: 10, backgroundColor: color.lightLine, borderRadius: 6 }}>
          <Text style={{ color: 'black', fontSize: 16, paddingVertical: 10, paddingHorizontal: 16 }}>{res.type}</Text>
        </TouchableOpacity>)
    })
    return (filterList)
  }

  filteredType(item) {
    console.log("item", JSON.stringify(item))
    return (
      <CardView style={{ marginHorizontal: 20, height: 150 }}>
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
              }}>{item.item.vicinity}</Text>
            </View>
          </View>
        </View>
      </CardView>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.region.latitude !== null ? (
          <MapView
            ref="map"
            style={styles.map}
            region={this.state.region}
            zoomEnabled={true}
            onRegionChange={this.onRegionChange.bind(this)}
            showsUserLocation={true}
            initialRegion={this.state.region}
          >
            {this.state.touristLocations.length > 0
              ? this.state.touristLocations.map(location => {
                return (
                  <MapView.Marker
                    coordinate={{
                      latitude: parseFloat(location.geometry.location.lat),
                      longitude: parseFloat(location.geometry.location.lng),
                    }}
                    image={location.icon}
                    title={location.name}
                  />
                )
              })
              : null}
          </MapView>
        ) : null}
        {(this.props.travel.savedLocations === undefined ||
          this.props.travel.savedLocations.length === 0) || this.props.startPlan ? (
            <TouchableOpacity
              style={styles.startPlan}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'black', opacity: 0.9, justifyContent: 'center', aligItems: 'center' }}>
            <View style={{ flex: 0.1 }}>
              <TouchableOpacity onPress={() => {
                this.setState({ selectedFilter: false, selectedType: '' })
                this.props.onRight()
              }} style={{ width: 100, position: 'absolute', top: 0, right: 0, marginTop: 35 }}>
                <Icon icon={"cancel"} style={{ marginLeft: 30 }} />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 0.9, flexDirection: 'row', flexWrap: "wrap" }}>
              <View style={{ flex: 1 }}>
                {!this.state.selectedFilter ? (
                  <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexDirection: 'row', flexWrap: "wrap" }}>
                    {this.renderFilters()}
                  </ScrollView>
                ) : (
                    <View>
                      <Text style={{
                        color: '#fff',
                        fontSize: 20,
                        textAlign: "center",
                        marginVertical: 10,
                        fontFamily: "OpenSans-bold"
                      }}>{this.state.selectedType.toUpperCase()}</Text>
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
                  )}
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
    travel: state.travel,
  }),
  { touristLocations, getFilterByType },
)(MapScreen)
