import React, { Component } from "react"
import { View, FlatList, TouchableOpacity, Image, ScrollView } from "react-native"
import { NavigationScreenProp, NavigationState } from "react-navigation"
import styles from "./styles"
import { Wallpaper } from "../../components/wallpaper"
import { Header } from "../../components/header"
import { Text } from "../../components/text"
import { TextField } from "../../components/text-field"
import { connect } from "react-redux"
import AnimatedLoader from "react-native-animated-loader"
import { color, dimensions } from "../../theme";
import { CardView } from "../../components/card-view";
import { Button } from "../../components/button";
import { GoldBarView } from "../../components/goldBar"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { EditBudgetInfo } from "../../redux/actions/budget"

interface Props {
  navigation: NavigationScreenProp<NavigationState>
  budgetInfo: any
  EditBudgetInfo: any
}
interface userBudgetInfo {
  day: any
  meals: any
  entertainment: any
  dayBudget: any
}

class EditBudget extends Component<Props, userBudgetInfo> {
  constructor(props: Props) {
    super(props)
    this.state = {
      day: '',
      meals: '',
      entertainment: '',
      dayBudget: ''
    }
  }

  async componentDidMount() {
    this.setState({
      day: this.props.navigation.state.params.budgetInfo.day,
      meals: Math.round(this.props.navigation.state.params.budgetInfo.meals),
      entertainment: Math.round(this.props.navigation.state.params.budgetInfo.entertainment),
      dayBudget: this.props.navigation.state.params.budgetInfo.dayBudget
    })
    // alert(this.state.meals)
  }

  onLeft() {
    this.props.navigation.goBack()
  }

  async handleSubmit() {
    let DetailedBudget = {
      "day": this.state.day,
      "mealsExpenditure": parseFloat(this.state.meals),
      "entExpenditure": parseFloat(this.state.entertainment),
      "userId": this.props.navigation.state.params.userId,
      "travelId": this.props.navigation.state.params.travelPreferenceId
    }
    console.log("DetailedBudget_123_JSON.stringify", JSON.stringify(DetailedBudget))
    console.log("DetailedBudget_123", DetailedBudget)
    await this.props.EditBudgetInfo(DetailedBudget)
    this.props.navigation.pop()
    this.props.navigation.state.params.onSelect({ editBudget: true });
    //alert(this.state.day + ',' + this.state.dayBudget + ',' + this.state.meals + ',' + this.state.entertainment)
  }

  render() {
    console.log(this.state.meals + ',,,,,,,,,' + this.state.entertainment)
    return (
      <View style={styles.container}>
        <Wallpaper style={styles.wallpaper} />
        <Header
          style={styles.header}
          headerText={'DAY ' + this.state.day}
          titleStyle={styles.headerTitle}
          leftIcon={"back"}
          onLeftPress={this.onLeft.bind(this)}
        />
        <GoldBarView />
        <KeyboardAwareScrollView ref="scrollView" resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true}>
          <View style={{ marginTop: dimensions.width * 0.06 }}>
            <Text style={styles.textStyle}>
              How much you spent today for meals and entertainment ?
          </Text>
            <View style={{ marginHorizontal: 26, marginTop: dimensions.width * 0.06 }}>
              <CardView style={{ marginBottom: dimensions.width * 0.06 }}>
                {/* <GoldBarView style={styles.cardHeader}> */}
                <View style={styles.cardHeader}>
                  <Text style={styles.headerText}>Meals</Text>
                </View>
                {/* </GoldBarView> */}

                <View style={styles.cardBody}>
                  <Text style={styles.signText}>$  </Text>
                  <TextField
                    inputStyle={styles.inputStyle}
                    placeholder="Meals"
                    placeholderTextColor={color.placeholderText}
                    onChangeText={value => this.setState({ meals: value })}
                    value={this.state.meals.toString()}
                  />
                </View>
              </CardView>
              <CardView>
                {/* <GoldBarView style={styles.cardHeader}> */}
                <View style={styles.cardHeader}>
                  <Text style={styles.headerText}>Entertainment</Text>
                </View>
                {/* </GoldBarView> */}

                <View style={styles.cardBody}>
                  <Text style={styles.signText}>$  </Text>
                  <TextField
                    inputStyle={styles.inputStyle}
                    placeholder="Entertainment"
                    placeholderTextColor={color.placeholderText}
                    onChangeText={value => this.setState({ entertainment: value })}
                    value={this.state.entertainment.toString()}
                  />

                </View>
              </CardView>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Button style={styles.button} onPress={this.handleSubmit.bind(this)}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </Button>
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
    EditBudgetInfo
  },
)(EditBudget)
