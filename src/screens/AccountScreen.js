import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../constants/color';
//Component
import HeaderComponent from '../components/HeaderComponent';
import Divider from '../components/Divider';
import AccountData from '../components/AccountData';
import AccountButton from '../components/AccountButton';
import { FontAwesome5 } from '@expo/vector-icons';
//Context
import { Context as AuthContext } from '../context/AuthContext';

const AccountScreen = ({ navigation }) => {
    const { state, signout } = useContext(AuthContext);
    const [help, setHelp] = useState(true);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderComponent
                headerTitle='Il mio Profilo'
                iconName='sign-out'
                onPress={signout}
            />
            <ScrollView>
                <AccountData
                    firstName={state.user.firstName}
                    lastName={state.user.lastName}
                    role={state.user.role}
                />
                <Divider />
                <View style={styles.actionContainerTitle}>
                    <Text style={styles.actionTitle}>Azioni Rapide</Text>
                    <FontAwesome5 name="grip-lines" size={24} color={colors.primary} />
                </View>

                {state.user.role == 'ADMIN' ?
                    <View >
                        <AccountButton
                            title='Info Dipendenti'
                            routeName='DriverList' />
                        <AccountButton
                            title='Info Mezzi'
                            routeName='TruckList'
                        />
                        <AccountButton title='Inserisci Mezzo' />
                        <AccountButton title='Inserisci Dipendente' />
                        <AccountButton title='Aggiorna Profilo' />
                    </View>

                    :
                    <Text style={{ textAlign: "center" }}>Non sei un amministratore , azioni rapide ancora non disponibili</Text>
                }
            </ScrollView>
        </View>
    );
};

AccountScreen.navigationOptions = () => {
    return {
        headerShown: false,
    };
};

const styles = StyleSheet.create({

    //Azioni Rapide
    actionContainer: {
        height: 60,
        backgroundColor: 'lightgrey',
        margin: 5,
        borderRadius: 8
    },
    actionContainerTitle: {
        flexDirection: "row",
        marginHorizontal: 15,
        marginVertical: 15,
        justifyContent: "space-between",
    },
    actionTitle: {

        fontSize: 20,
        fontWeight: "bold",
        color: colors.primary
    }
});


export default AccountScreen;