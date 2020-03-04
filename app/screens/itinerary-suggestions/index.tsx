import React, { Component } from "react"
import { View } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
}
interface UserInformation {}

class ItinerarySuggestions extends Component<Props, UserInformation> {
  constructor(props: Props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.initialText}>COMING SOON....</Text>
        </ScrollView>
      </View>
    )
  }
}

export default ItinerarySuggestions
