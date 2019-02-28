import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'

import { Images } from '../Themes'

// Styles
import styles from './Styles/CategoryScreenStyles'

export default class CategoryScreen extends Component {
    render () {
      return (
        <View style={styles.mainContainer}>
              <Text style={styles.sectionText}>
                Category screen
              </Text>
        </View>
      )
    }
  }