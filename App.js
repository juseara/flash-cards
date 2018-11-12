import React from 'react';
import { Constants, Permissions } from 'expo'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, StatusBar, View, Platform } from 'react-native';
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'

import reducer from './reducers'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import Deck from './components/Deck'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import { askPermissionNotification, setLocalNotifiation } from './utils/helper'
import * as colors from './utils/colors'

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createMaterialTopTabNavigator({
  Decks:{
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
    },
  },
  NewDeck:{
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
    },
  }
},{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? colors.green : 'white',
    inactiveTintColor:Platform.OS === 'ios' ? 'black':'white',
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? 'white' : colors.green,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigation = createStackNavigator({
  home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  Deck: {
    screen: Deck,
    navigationOptions: ({ navigation }) => ({
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.green,
      },
    }),
  },
  NewCard:{
    screen:NewCard,
    navigationOptions:({navigation})=>({
      headerTintColor:colors.white,
      headerStyle:{
        backgroundColor:colors.green
      }
    })
  },
  Quiz:{
    screen:Quiz,
    navigationOptions:({navigation})=>({
      headerTintColor:colors.white,
      headerStyle:{
        backgroundColor:colors.green,
      },
    })
  }
});

export default class App extends React.Component {

 async componentDidMount(){
    
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    
    if(status === 'undetermined')
    {
      status = await askPermissionNotification()
      if( status === 'denied')
      {
        alert('You denied receiving notifications for this app.')
      }
      else if(status === 'granted'){
        await setLocalNotifiation()
      }
    }
  }


  render() {
    return (
        <Provider store={createStore(reducer)}>
          <View style={{ flex: 1 }}>
            <UdaciStatusBar backgroundColor="green" barStyle="light-content" />
            <MainNavigation />
          </View>
        </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
