import React, { Component } from "react"
import { View, FlatList } from "react-native"
import { NavigationScreenProp, NavigationState, ScrollView } from "react-navigation"
import styles from "./styles"
import { Text } from "../../components/text"
import { connect } from 'react-redux';
import { dimensions } from "../../theme"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  budget: any
}

interface userBudgetInfo {
  setBudgetLogsInfo: any
};

class DigitalSouvenir extends Component<Props, userBudgetInfo> {
  constructor(props: Props) {
    super(props);
    this.state = {
      setBudgetLogsInfo: []
    }
  }

  componentDidMount() {
    this.setState({ setBudgetLogsInfo: this.props.budget.setBudgetLogs })
    console.log('this.props.budget.setBudgetLogs:', JSON.stringify(this.props.budget.setBudgetLogs))
  }

  renderItem = ({ item, index }) => {
    console.log('renderItem_123:', item)
    return (
      <View style={{ width: dimensions.width, backgroundColor: '#61cbff', marginBottom: 16 }}>
        <Text style={{ color: 'black', fontSize: 16, padding: 6 }}>{item.actionType}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.initialText}>COMING SOON....</Text>
        </ScrollView>
        {/* <FlatList
          style={{ margin: 6, backgroundColor: 'white' }}
          data={this.state.setBudgetLogsInfo}
          renderItem={this.renderItem.bind(this)}
        /> */}
      </View>
    )
  }
}


export default connect(
  state => ({
    budget: state.budget
  }), {})(DigitalSouvenir)
