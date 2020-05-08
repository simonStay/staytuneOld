import React, { Component } from "react"
import { View, FlatList, Image, ScrollView, TouchableOpacity, ImageBackground } from "react-native"
import { Icon } from "native-base"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { CardView } from "../../components/card-view";
import moment from "moment"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { Button } from "../../components/button";
import { GoldBarView } from "../../components/goldBar"
import ImageLoad from 'react-native-image-placeholder';
import { dimensions, color } from "../../theme"
import { connect } from "react-redux"
import { getPlaceInfo } from "../../redux/actions/notifications"
import getDirections from 'react-native-google-maps-directions';
import AnimatedLoader from "react-native-animated-loader"
import Geolocation from "@react-native-community/geolocation"


interface Props {
    navigation: NavigationScreenProp<NavigationState>
    user: any
    notifications: any
    getPlaceInfo: any
    placeDetails: any
}
interface NotificationInformation {
    placeImage: any
    placeId: any
    photoRef: any
    placeName: any
    address: any
    phoneNo: any
    openNow: any
    rating: any
    destinationLatitude: any
    destinationLongitude: any
    sourceLatitude: any
    sourceLongitude: any
    latitudeDelta: any
    longitudeDelta: any
}

class NotificationDetailScreen extends Component<Props, NotificationInformation> {
    constructor(props: Props) {
        super(props)
        this.state = {
            placeImage: '',
            placeId: '',
            photoRef: '',
            placeName: '',
            address: '',
            phoneNo: '',
            openNow: '',
            rating: '',
            destinationLatitude: '',
            destinationLongitude: '',
            sourceLatitude: '',
            sourceLongitude: '',
            latitudeDelta: null,
            longitudeDelta: null,
        }
    }

    UNSAFE_componentWillMount() {
        Geolocation.watchPosition(position => {
            console.log("position_123", JSON.stringify(position))
            this.setState({
                sourceLatitude: position.coords.latitude,
                sourceLongitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        })
    }

    async componentDidMount() {
        try {

            await this.setState({ placeId: this.props.navigation.state.params.placeId })
            await this.props.getPlaceInfo(this.state.placeId)
            let placeInfo = await this.props.notifications.getPlaceInfo.result

            this.setState({
                photoRef: placeInfo.photos === undefined ? '' : placeInfo.photos[0].photo_reference,
                placeName: placeInfo.name,
                address: placeInfo.formatted_address,
                phoneNo: placeInfo.formatted_phone_number == undefined ? '' : 'Phone No: ' + placeInfo.formatted_phone_number,
                openNow: placeInfo.opening_hours === undefined ? '' : placeInfo.opening_hours.open_now === true ? 'Open Now: Yes' : 'Open Now: No',
                rating: placeInfo.rating == undefined ? '' : 'Rating: ' + placeInfo.rating,
                destinationLatitude: placeInfo.geometry.location.lat,
                destinationLongitude: placeInfo.geometry.location.lng,
                sourceLatitude: this.state.sourceLatitude,
                sourceLongitude: this.state.sourceLongitude,
            })

            fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=' + dimensions.width + '&photoreference=' + this.state.photoRef + '&key=AIzaSyBI_ae3Hvrib8Bao3_WrhXLEHKuGj1J8pQ')
                .then((res) => {
                    console.log("placeImage_123:" + JSON.stringify(res.url))
                    this.setState({ placeImage: res.url })
                })
                .catch((err) => {

                })

        } catch (error) {
            console.log("notificationScreen_123:", error)
        }
    }

    onLeft() {
        this.props.navigation.pop()
    }

    onDiections() {

        // alert("data:"+JSON.stringify(this.props.data))
        // alert("initialRegion:"+JSON.stringify(this.props.initialRegion))
        const data = {
            source: {
                latitude: this.state.sourceLatitude,
                longitude: this.state.sourceLongitude
            },
            destination: {
                latitude: this.state.destinationLatitude,
                longitude: this.state.destinationLongitude
            },
            params: [
                {
                    key: "dirflg",
                    value: "d"
                }
            ]
        }

        getDirections(data)

    }

    render() {
        // const { placeResult } = this.props.notifications.getPlaceInfo.result
        return (
            <View style={styles.container}>
                {/* <Wallpaper style={styles.wallpaper} /> */}
                <Header
                    style={styles.header}
                    headerText={"DETAIL SCREEN"}
                    titleStyle={styles.headerTitle}
                    leftIcon={"back"}
                    onLeftPress={this.onLeft.bind(this)}
                />
                <GoldBarView />
                <View>
                    <ImageBackground source={require("./../../assests/placeholder-image.png")} style={{ borderBottomWidth: 1.64, borderBottomColor: color.line }}>
                        <Image source={{ uri: this.state.placeImage }} style={{ width: '100%', height: dimensions.height / 2.46 }} />
                    </ImageBackground>
                    <ScrollView>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', minHeight: dimensions.width / 6, backgroundColor: 'transparent', padding: dimensions.width * 0.016 }}>
                            <View style={{ flex: 0.824, flexDirection: 'column' }}>
                                <Text style={styles.placeText}>{this.state.placeName}</Text>
                                {/* <Text style={styles.placeText}>Rating: {this.state.rating}</Text> */}
                                {/* <View style={{ flexDirection: 'row', marginTop: 6 }} >
                                    <Icon type="Entypo" name="location-pin" style={styles.leftIcon} /> */}
                                <Text style={styles.rightText}>{this.state.address}</Text>
                                <Text style={styles.rightText}>{this.state.rating}</Text>
                                <Text style={styles.rightText}>{this.state.phoneNo}</Text>
                                <Text style={styles.rightText}>{this.state.openNow}</Text>
                                {/* </View> */}
                            </View>

                            <View style={{ flex: 0.176 }}>
                                <Button style={styles.button} onPress={this.onDiections.bind(this)}>
                                    <Icon type="FontAwesome5" name="directions" />
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <AnimatedLoader
                    visible={this.props.notifications.loader}
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
        notifications: state.notifications
    }),
    {
        getPlaceInfo
    }
)(NotificationDetailScreen)
