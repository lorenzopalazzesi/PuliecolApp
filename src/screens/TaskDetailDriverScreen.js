import React, { useContext, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, Al, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderComponent from '../components/HeaderComponent';
import TaskDetailStatus from '../components/TaskDetailStatus';
import TaskDetailData from '../components/TaskDetailData';
import { colors } from '../constants/color';
import { Context as ProcessContext } from '../context/ProcessContext';
import MapView, { Marker } from 'react-native-maps';
import openMap from 'react-native-open-maps';
import { NavigationEvents } from 'react-navigation';
import puliecolServer from "../api/puliecolServer";


const TaskDetailDriverScreen = ({ navigation }) => {
    const { state } = useContext(ProcessContext);
    const id = navigation.getParam('id');
    const specificTask = state.task.find((t) => t.id == id);
    const [myPosition, setMyPosition] = useState({
        latitude: null,
        longitude: null,
    });

    const getMyPosition = () => {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                setMyPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
            },
            (err) => {
                console.log(err);
            },
        )
    }

    const addPosition = async ({ id, latitude, longitude }) => {
        try {
            Alert.alert(
                'Inserimento Posizione',
                "Stai inserendo una nuova posizione per l'isola Ecologica , assicurati di trovarti nel posto giusto!",
                [
                    { text: "Annulla" },
                    {
                        text: 'Inserisci', onPress: async () => {
                            await puliecolServer.put(`/isles/${id}`, { latitude, longitude });
                            navigation.goBack();
                        }
                    }
                ]
            )

        } catch (err) {
            console.log(err);
        }
    }

    const setCompleted = async ({ id }) => {
        try {
            Alert.alert(
                'Conferma Completamento',
                "Stai contrassegnando il recupero come completato. Procedere?",
                [
                    { text: "Annulla" },
                    {
                        text: 'Procedi', onPress: async () => {
                            await puliecolServer.put(`/tasks/${id}`, { completed: true });
                            navigation.goBack();
                        }
                    }
                ]
            )
        } catch (err) {
            alert('Qualcosa è andato storto');
        }
    }

    return (
        <>
            <NavigationEvents onDidFocus={getMyPosition} />
            <HeaderComponent
                headerTitle='Dettagli Recupero'
                iconName='close'
                onPress={() => navigation.goBack()}
            />
            {/**Da rimuovere questo controllo , serviva solamente per prendere la posizione attuale del driver */}
            {myPosition.longitude || myPosition.latitude == null ?
                <ScrollView>
                    <TaskDetailStatus status={specificTask.completed} />
                    <View style={{ height: 5 }} />
                    <TaskDetailData title='Citta del recupero' text={specificTask.Isle.city} />
                    <TaskDetailData title='Cliente' text={specificTask.Isle.fir} />
                    <TaskDetailData title='Tipologia Rifiuto' text={specificTask.wasteType} />
                    <TaskDetailData title='Ora' text={specificTask.date} />
                    <TaskDetailData title='Giorno' text={'GIORNATA ODIERNA'} />

                    {specificTask.Isle.latitude === null || specificTask.Isle.longitude === null ?
                        <TouchableOpacity onPress={() => addPosition({ id: specificTask.Isle.id, latitude: myPosition.latitude, longitude: myPosition.longitude })} style={styles.buttonInserisci}>
                            <Text style={{ textAlign: "center", color: 'white', fontWeight: "bold", fontSize: 18 }}> Inserisci Posizione</Text>

                        </TouchableOpacity>

                        :
                        <>
                            <View style={styles.containerMaps}>
                                <MapView
                                    style={styles.mapStyle}
                                    initialRegion={{
                                        latitude: Number(specificTask.Isle.latitude),
                                        longitude: Number(specificTask.Isle.longitude),
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
                                            latitude: Number(specificTask.Isle.latitude),
                                            longitude: Number(specificTask.Isle.longitude),
                                            latitudeDelta: 0.0922,
                                            longitudeDelta: 0.0421,
                                        }}
                                        title={'Isola di ' + specificTask.Isle.city} />
                                </MapView>
                            </View>
                            <TouchableOpacity onPress={() => addPosition({ id: specificTask.Isle.id, latitude: myPosition.latitude, longitude: myPosition.longitude })} style={styles.buttonReinserisci}>
                                <Text style={{ textAlign: "center", color: 'white', fontWeight: "bold", fontSize: 18 }}> Riassegna Posizione</Text>

                            </TouchableOpacity>
                        </>
                    }
                    {
                        specificTask.completed === true
                            ? null
                            :
                            <TouchableOpacity onPress={() => setCompleted({ id: specificTask.id })} style={styles.buttonCompletato}>
                                <Text style={{ textAlign: "center", color: 'white', fontWeight: "bold", fontSize: 18 }}> Contrassegna Completato</Text>
                            </TouchableOpacity>
                    }

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
        height: 300,
        borderRadius: 6,
        overflow: "hidden"
    },
    buttonInserisci: {
        justifyContent: "center",
        backgroundColor: colors.primary,
        padding: 10,
        marginTop: 20,
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 6
    },
    buttonReinserisci: {
        justifyContent: "center",
        backgroundColor: colors.primary,
        padding: 10,
        marginTop: 10,
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 6
    },
    buttonCompletato: {
        justifyContent: "center",
        backgroundColor: 'green',
        padding: 10,
        marginTop: 5,
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 6
    }

});

export default TaskDetailDriverScreen;