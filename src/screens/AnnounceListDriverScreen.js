import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import HeaderComponent from '../components/HeaderComponent';
import { colors } from '../constants/color';
import { Context as ProcessContext } from '../context/ProcessContext';
const AnnounceListDriverScreen = ({ navigation }) => {
    const { state, loadAnnounceDriver } = useContext(ProcessContext);
    return (
        <>
            <NavigationEvents onDidFocus={loadAnnounceDriver} />
            <HeaderComponent
                headerTitle='Annunci'
            />
            {
                state.announce.length == 0 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                        <Text>Non sono stati inseriti annunci...</Text>
                        <Text>Hai qualcosa da comunicare ? Creane subito uno !</Text>
                    </View>

                    :
                    <FlatList
                        data={state.announce}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.containerAnnounce}>
                                    <View>
                                        {item.priority == 'DANGER' || item.priority == 'danger' ? <Text style={{ color: 'red', fontWeight: "bold" , fontSize: 16 }}>ANNUNCIO AD ALTA PRIORITA'</Text> : (item.priority == 'WARNING' || item.priority == 'warning' ? <Text style={{ color: colors.primary, fontWeight: "bold" , fontSize: 16 }}>ANNUNCIO CON PRIORITA' CONTENUTA</Text> : <Text style={{ color: 'limegreen', fontWeight: "bold" , fontSize: 16 }}>ANNUNCIO A BASSA PRIORITA'</Text>)}
                                    </View>
                                    <Text style={styles.announceCreator}>Inserito da {item.User.firstName} {item.User.lastName}</Text>
                                    <Text style={styles.message}>{item.message}</Text>
                                </View>
                            )
                        }}
                    />
            }
        </>
    );
};

AnnounceListDriverScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    containerAnnounce: {
        margin: 5,
        padding: 8,
        borderWidth: 1.5,
        borderColor: 'lightgrey',
        borderRadius: 6
    },
    announceCreator:{
        fontSize: 14,
        color: 'darkgrey',
        fontWeight: "bold",
        marginVertical: 3
    },
    message:{
    }
});

export default AnnounceListDriverScreen;