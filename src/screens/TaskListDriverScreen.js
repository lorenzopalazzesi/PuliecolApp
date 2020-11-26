import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Badge } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import HeaderComponent from '../components/HeaderComponent';
import { Context as ProcessContext } from '../context/ProcessContext';
import { Context as AuthContext } from '../context/AuthContext';

const TaskListDriverScreen = () => {
    const { state: { user } } = useContext(AuthContext);
    const { state: { task }, loadTaskDriver } = useContext(ProcessContext);
    const id = user.id;
    return (
        <>
            <NavigationEvents onDidFocus={() => loadTaskDriver({id})} />
            <HeaderComponent
                headerTitle='I Miei Recuperi'
            />
            <FlatList
                data={task}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('TaskDetail', { id: item.id })}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={styles.city}>Luogo : {item.Isle.city}</Text>
                                {(item.completed === null || item.completed === false) ? <Badge value={<Text></Text>} status='error' /> : <Badge value={<Text></Text>} status='success' />}
                            </View>
                            <Text style={styles.city}>Data : {item.date}</Text>
                            <Text style={styles.city}>Ora : {item.hour}</Text>
                            <Text style={styles.city}>Cliente : {item.Isle.client}</Text>
                            <Text style={styles.city}>Tipologia Rifiuti : {item.wasteType}</Text>
                            {item.User == null ?
                                <Text style={styles.city}>Operatore non Assegnato</Text>
                                :
                                <Text style={styles.city}>Operatore : {item.User.firstName} {item.User.lastName}</Text>
                            }


                        </TouchableOpacity>
                    );
                }}
            /> 
        </>
    );
};

TaskListDriverScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        margin: 5,
        borderRadius: 8,
        borderColor: 'lightgrey',
        padding: 4,
        justifyContent: "space-between"
    },
    city: {
        fontWeight: "bold",
        marginVertical: 3
    }
});

export default TaskListDriverScreen;