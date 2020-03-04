import React, { Component } from "react"
import { AppRegistry } from "react-native"

import { StorybookUIRoot } from "../storybook"
//import { SafeAreaView } from "react-navigation"
import { Provider } from "react-redux"
import AppContainer from "./navigation/AppNavigation"
//import configureStore from "./redux/store"
//const store = configureStore()
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store';

export default class App extends Component {
  render() {
    return (
      // <SafeAreaView style={{ flex: 1, backgroundColor: "green" }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
      // </SafeAreaView>
    )
  }
}

/**
 * This needs to match what's found in your app_delegate.m and MainActivity.java.
 */
const APP_NAME = "StayTune"

// Should we show storybook instead of our app?
//
// ⚠️ Leave this as `false` when checking into git.
const SHOW_STORYBOOK = false

const RootComponent = SHOW_STORYBOOK && __DEV__ ? StorybookUIRoot : App
AppRegistry.registerComponent(APP_NAME, () => RootComponent)
