import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import RoundedButton from '../../App/Components/RoundedButton'

import { createStackNavigator, createAppContainer , createDrawerNavigator } from 'react-navigation'

// For API
import API from '../Services/Api'
import FJSON from 'format-json'

import CategoryScreen from '../Containers/CategoryScreen'


import { Images } from '../Themes'

// Styles
import styles from './Styles/HomeScreenStyles'

// API buttons here:
const endpoints = [
  { label: 'category', endpoint: 'getCategory' },
  { label: 'Github Rate Limit', endpoint: 'getRate' },
  { label: 'Search User (gantman)', endpoint: 'getUser', args: ['gantman'] },
  { label: 'Search User (skellock)', endpoint: 'getUser', args: ['skellock'] }
]

 class HomeScreen extends Component {
    
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      categoryData: []
    }

    this.api = API.create()
    this.getCategory()
  }

  getCategory () {
    this.api["getCategory"].apply(this, ['']).then((result) => {
      var jsonString = JSON.stringify(result.data.data); //convert to string to remove the sequelize specific meta data

    var obj = JSON.parse(jsonString);
    this.setState({categoryData: obj})
    window.alert('pop-'+ this.state.categoryData.length + " , data = " + JSON.stringify(this.state.categoryData[1].name))
    })
  }

  getCategory (id) {
    this.api["getCategory"].apply(this, [id]).then((result) => {
      var jsonString = JSON.stringify(result.data.data); //convert to string to remove the sequelize specific meta data

    var obj = JSON.parse(jsonString);
    this.setState({categoryData: obj})
    window.alert('pop-'+ this.state.categoryData.length + " , data = " + JSON.stringify(this.state.categoryData[0].name))
    })
  }

  showResult (response, title = 'Response') {

    //var data1 = JSON.parse(response)
    var jsonString = JSON.stringify(response.data.data); //convert to string to remove the sequelize specific meta data

    var obj = JSON.parse(jsonString);
    window.alert('pop-'+ JSON.stringify(obj[0].name))

    this.refs.container.scrollTo({x: 0, y: 0, animated: true})
    if (response.ok) {
      this.refs.result.setState({message: FJSON.plain(response.data), title: title})
    } else {
      this.refs.result.setState({message: `${response.problem} - ${response.status}`, title: title})
    }
  }

  tryEndpoint (apiEndpoint) {
    const { label, endpoint, args = [''] } = apiEndpoint
    this.api[endpoint].apply(this, args).then((result) => {
      this.showResult(result, label || `${endpoint}(${args.join(', ')})`)
    })
  }

    toggleModal = () => {
      this.tryEndpoint(endpoints[0])
        //this.props.navigation.navigate('drawerStack')
        
      }

      renderButton (category) {
        const { name, id } = category
        return (
          <RoundedButton text={name} onPress={this.getCategory.bind(this, id)} styles={{marginTop: 10}} key={id} />
        )
      }
    
      renderButtons () {
        return this.state.categoryData.map((category) => this.renderButton(category))
      }

    render () {
      return (
        <View style={styles.mainContainer}>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
          <ScrollView style={styles.container}> 
            {this.renderButtons()}
            <RoundedButton onPress={this.toggleModal}>
                Open Menu
            </RoundedButton>
          </ScrollView>
        </View>
      )
    }
  }



const stackNavigator = createStackNavigator({
  HomeScreen: {screen: HomeScreen},  
  
}, {
  cardStyle: {
    opacity: 1,
    backgroundColor: '#3e243f'
  },
  initialRouteName: 'HomeScreen',
  headerMode: 'none',
  // Keeping this here for future when we can make
  navigationOptions: {
    header: {
      left: (
        <TouchableOpacity onPress={() => window.alert('pop')} ><Image source={Images.closeButton} style={{marginHorizontal: 10}} /></TouchableOpacity>
      ),
      style: {
        backgroundColor: '#3e243f'
      }
    }
  }
})

export default createAppContainer(stackNavigator);
