import React, { Component } from "react"
import { View, FlatList, Image, ScrollView } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { CardView } from "../../components/card-view";
import moment from "moment"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}
interface UserInformation { }

let notifications = [{
  id: 1,
  date: "06-11-2019",
  notification: "Hi Ravi, Hotels are filling up fast, Don't forget to book a reservation or upcoming trip  to Austrialia."
},
{
  id: 2,
  date: "06-11-2019",
  notification: "Hi Ravi, Hotels are filling up fast, Don't forget to book a reservation or upcoming trip  to Austrialia."
},
{
  id: 3,
  date: "06-11-2019",
  notification: "Hi Ravi, Hotels are filling up fast, Don't forget to book a reservation or upcoming trip  to Austrialia."
},
{
  id: 4,
  date: "06-11-2019",
  notification: "Hi Ravi, Hotels are filling up fast, Don't forget to book a reservation or upcoming trip  to Austrialia."
},
{
  id: 5,
  date: "06-11-2019",
  notification: "Hi Ravi, Hotels are filling up fast, Don't forget to book a reservation or upcoming trip  to Austrialia."
},
{
  id: 6,
  date: "06-11-2019",
  notification: "Hi Ravi, Hotels are filling up fast, Don't forget to book a reservation or upcoming trip  to Austrialia."
},
{
  id: 7,
  date: "06-11-2019",
  notification: "Hi Ravi, Hotels are filling up fast, Don't forget to book a reservation or upcoming trip  to Austrialia."
},
{
  id: 8,
  date: "06-11-2019",
  notification: "Hi Ravi, Hotels are filling up fast, Don't forget to book a reservation or upcoming trip  to Austrialia."
},
{
  id: 9,
  date: "06-11-2019",
  notification: "Hi Ravi, Hotels are filling up fast, Don't forget to book a reservation or upcoming trip  to Austrialia."
},
{
  id: 10,
  date: "06-11-2019",
  notification: "Hi Ravi, Hotels are filling up fast, Don't forget to book a reservation or upcoming trip  to Austrialia."
}]

class Notifications extends Component<Props, UserInformation> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }

  renderItem = ({ item }) => {
    return (
      <CardView>
        <View style={styles.innerCardView}>
          <View style={styles.notificationView}>
            <View style={styles.iconView}>
              <Image
                source={require("../splash/logo.png")}
                style={styles.appIcon}
              />
            </View>
            <View style={styles.titleView}>
              <Text style={styles.appName}>
                STAY TUNE
              </Text>
              <Text style={styles.appName}>
                {moment(item.date, "DDMMYYYY").startOf('day').fromNow()}
              </Text>
            </View>
          </View>
          <Text style={styles.notificationText}>{item.notification}</Text>
        </View>
      </CardView>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.initialText}>NOTIFICATIONS COMING SOON....</Text>
        </ScrollView>
        {/* <View style={styles.innerContainer}>
          <FlatList
            data={notifications}
            extraData={this.state}
            renderItem={this.renderItem.bind(this)}
            showsVerticalScrollIndicator={false}
          />
        </View> */}
      </View>
    )
  }
}

export default Notifications
