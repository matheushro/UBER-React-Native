import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'

const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
        <View style={tw`p-5`}>
            <Image
                style={{
                    width: 100, 
                    resizeMode: 'contain',
                    height: 100
                }}
                source={{
                    uri: "https://links.papareact.com/gzs",
                }}
            />
            <NavOptions />
        </View>
        
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})