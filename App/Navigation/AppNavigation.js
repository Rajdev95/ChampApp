import { createStackNavigator, createAppContainer ,createDrawerNavigator } from 'react-navigation'
//import LaunchScreen from '../Containers/LaunchScreen'
import HomeScreen from '../Containers/HomeScreen'
// import ContactUSScreen from '../Containers/ContactUSScreen'
// import ImageScreen from '../Containers/ImageScreen'
// import VideoScreen from '../Containers/VideoScreen'
// import GifScreen from '../Containers/GifScreen'
// import WorkoutScreen from '../Containers/WorkoutScreen'
// import WorkoutTimerScreen from '../Containers/WorkoutTimerScreen'
// import WorkoutSettingsScreen from '../Containers/WorkoutSettingsScreen'

import styles from './Styles/NavigationStyles'




// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
