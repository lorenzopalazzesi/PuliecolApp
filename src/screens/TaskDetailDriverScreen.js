import React, { useContext, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Al, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import HeaderComponent from '../components/HeaderComponent';
import TaskDetailStatus from '../components/TaskDetailStatus';
import { colors } from '../constants/color';
import { Context as ProcessContext } from '../context/ProcessContext';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';


const TaskDetailDriverScreen = ({ navigation }) => {
    const { state } = useContext(ProcessContext);
    const id = navigation.getParam('id');
    const specificTask = state.task.find((t) => t.id == id);
    const [myPosition, setMyPosition] = useState({
        latitude: null,
        longitude: null,
    });

    // const getMyPosition = () => {
    //     window.navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             setMyPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    //         },
    //         (err) => {
    //             console.log(err);
    //         },
    //     )
    // }

    return (
        <>
            {/* <NavigationEvents onDidFocus={getMyPosition} /> */}
            <HeaderComponent
                headerTitle='Dettagli Recupero'
                iconName='close'
                onPress={() => navigation.goBack()}
            />
            {/**Da rimuovere questo controllo , serviva solamente per prendere la posizione attuale del driver */}
            {myPosition.longitude || myPosition.latitude == null ?
                <ScrollView>
                    <TaskDetailStatus status={specificTask.completed} />
                    <Text>Città Del Recupero : </Text>
                    <View style={styles.containerMaps}>
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={{
                                latitude: 43.311570,
                                longitude: 13.312520,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            onPress={() => Alert.alert(
                                'Avvio calcolo Itinerario',
                                'Sei sicuro di voler avviare la navigazione?',
                                [
                                    { text: 'Annulla' },
                                    {
                                        text: 'Avvia',
                                        onPress: () => { openMap({ start: '', end: `${specificTask.Isle.city.toLowerCase()}` }) }
                                    }
                                ]
                            )}
                        >
                            <Marker
                                coordinate={{
                                    latitude: 43.311570,
                                    longitude: 13.312520,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421
                                }}
                                title={'Isola di ' + specificTask.Isle.city} />
                        </MapView>
                    </View>
                    <Text style={{marginHorizontal: 20 , textAlign: "center"}}>Clicca sulla mappa per avviare il calcolo dell'Itinerario...</Text>
                </ScrollView>

                :

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size='large' color={colors.primary} />
                </View>

            }
        </>
    );
};

TaskDetailDriverScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    containerMaps: {
        margin: 10,
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 6
    },
    mapStyle: {
        height: 250,
        borderRadius: 6,
        overflow: "hidden"
    }
});

export default TaskDetailDriverScreen;