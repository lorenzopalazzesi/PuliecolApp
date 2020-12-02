import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Badge } from 'react-native-elements';

const TaskDetailStatus = ({status}) => {
    return (
        <View style={styles.statusContainer}>
            <Text style={styles.statusTitle}>STATO ATTUALE</Text>
            {status == true ?
                <Badge status='success' value={<Text></Text>} /> :
                <Badge status='error' value={<Text></Text>} />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    statusContainer: {
        borderBottomWidth: 1.5,
        borderBottomColor: 'lightgrey',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15
    },
    statusTitle: {
        fontWeight: "bold",
        color: 'lightgrey',
        fontSize: 16
    },
});

export default TaskDetailStatus;