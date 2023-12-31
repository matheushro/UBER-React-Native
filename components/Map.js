import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import MapView, {Marker}  from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_KEY } from "@env";


const Map = () => {
    const dispatch = useDispatch()
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)

    useEffect(() => {
      
        if(!origin || !destination) return

        mapRef.current.fitToSuppliedMarkers(['origem', 'destino'], {
            edgePadding: {top: 50, bottom: 50, left:50, right: 50}
        })
    }, [origin, destination])
    

    useEffect(() => {

        if(!origin || !destination) return

        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?
            units=imperial&origins=${origin.description}&destinations=
            ${destination.description}&key=${GOOGLE_MAPS_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]))
            })

        }

        getTravelTime()
    }, [origin, destination, GOOGLE_MAPS_KEY])

    return (
        <MapView
            ref={mapRef}
            style={tw`flex-1`}
            mapType='mutedStandard'
            initialRegion={{
                latitude: origin?.location?.lat || 37.78825,
                longitude: origin?.location?.lng || -122.4324,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
        >
            {origin && destination && (
                <MapViewDirections 
                    origin={origin.description}
                    destination={destination.description}
                    apikey={GOOGLE_MAPS_KEY}
                    strokeWidth={3}
                    strokeColor='black'
                />
            )}
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

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destino"
                    description={destination.description}
                    identifier="destino"
                />
            )}

        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({})