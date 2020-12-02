import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { colors } from '../constants/color';

const TaskList = ({ navigation, onSelectTask ,type, isCompleted, city, cliente, data, ora, wasteType, addetto }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onSelectTask}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                {type === 'IN' ? <Text style={styles.taskType}>RECUPERO IN ENTRATA</Text> : <Text style={styles.taskType}>RECUPERO IN USCITA</Text>}
                {(isCompleted === null || isCompleted === false) ? <Badge containerStyle={{ marginHorizontal: 4 }} value={<Text></Text>} status='error' /> : <Badge containerStyle={{ marginHorizontal: 4 }} value={<Text></Text>} status='success' />}
            </View>
            <View style={{ borderTopWidth: 2, borderColor: 'lightgrey', marginVertical: 4 }} />
            <Text style={styles.city}>Luogo : {city}</Text>
            <Text style={styles.city}>Cliente : {cliente}</Text>
            <Text style={styles.city}>Data : {data}</Text>
            {ora == null ? <Text style={styles.city}>Ora : Giornata Odierna</Text> : <Text style={styles.city}>Ora : {ora}</Text>}

            <Text style={styles.city}>Tipologia Rifiuti : {wasteType}</Text>
            {addetto == null ?
                <Text style={styles.addettoNotAssigned}>Addetto non assegnato</Text>
                :
                <Text style={styles.city}>Adetto : {addetto.firstName} {addetto.lastName}</Text>
            }


        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        margin: 5,
        borderRadius: 8,
        borderColor: 'lightgrey',
        paddingVertical: 4,
        justifyContent: "space-between"
    },
    taskType: {
        fontWeight: "bold",
        marginVertical: 3,
        marginHorizontal: 4,
        color: colors.primary
    },
    city: {
        marginHorizontal: 4,
        fontWeight: "bold",
        marginVertical: 3
    },
    addettoNotAssigned:{
        marginHorizontal: 4,
        fontWeight: "bold",
        marginVertical: 3,
        color: 'red'
    }
});

export default TaskList;