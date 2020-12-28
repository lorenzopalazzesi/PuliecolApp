import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';


import DropDownPicker from 'react-native-dropdown-picker';
import { Context as ProcessContext } from '../context/ProcessContext';
import { colors } from '../constants/color';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CreateAnnounceScreen = ({ navigation }) => {
    const { addAnnounce } = useContext(ProcessContext);
    const [priority, setPriority] = useState('');
    const [message, setMessage] = useState('');

    return (
        <>

            <HeaderComponent
                headerTitle='Inserisci Annuncio'
                iconName='close'
                onPress={() => navigation.goBack()}
            />

            <Text style={styles.headerText}>Compila il form sottostante per creare un nuovo annuncio...</Text>
            <View style={{
                marginHorizontal: 10 , marginVertical: 5,
                ...(Platform.OS !== 'android' && {
                    zIndex: 5
                })
            }}>
                <DropDownPicker
                    items={[
                        { label: "PRIORITA' BASSA", value: 'success' },
                        { label: "PRIORITA' MEDIA", value: 'warning' },
                        { label: "PRIORITA' ALTA", value: 'danger' },
                    ]}
                    placeholder="SELEZIONA PRIORITA' ANNUNCIO"
                    placeholderStyle={{color: 'black'}}
                    defaultValue={null}
                    containerStyle={{ height: 40, }}
                    dropDownStyle={{ flex: 1, }}
                    activeLabelStyle={{ color: colors.primary }}
                    style={{ backgroundColor: '#fafafa' }}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{ backgroundColor: '#fafafa' }}
                    onChangeItem={item => setPriority(item.value)}
                />
            </View>
            <View style={styles.messageContainer}>
                <TextInput
                    multiline
                    blurOnSubmit={true}
                    value={message}
                    onChangeText={setMessage}
                    style={{ flex: 1 , textAlignVertical: 'top'}}

                />
            </View>
            <TouchableOpacity onPress={() => addAnnounce({ message, priority })} style={styles.buttonInserisci}>
                <Text style={{ textAlign: "center", color: 'white', fontWeight: "bold", fontSize: 18 }}> Inserisci</Text>

            </TouchableOpacity>
        </>
    );
};

CreateAnnounceScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({
    headerText: {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "center"
    },
    messageContainer: {
        flex: 1,
        padding: 10,
        margin: 10,
        borderRadius: 6,
        borderWidth: 1.5,
        borderColor: colors.primary,
        zIndex: 0,
    },
    buttonInserisci: {
        justifyContent: "center",
        backgroundColor: colors.primary,
        padding: 10,
        marginHorizontal: 15,
        marginBottom: 10,
        borderRadius: 6
    }
});

export default CreateAnnounceScreen;