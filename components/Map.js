import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, {Marker}  from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'



const Map = () => {
    const origin = useSelector(selectOrigin);
    return (
        <MapView
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin?.location?.lat || 37.78825,
                longitude: origin?.location?.lng || -122.4324,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origem"
                    description={origin.description}
                    identifier="origem"
                />
            )}

        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})