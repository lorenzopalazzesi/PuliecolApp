import React from 'react';
import { View , Text , StyleSheet } from 'react-native';
import { colors } from '../constants/color';

const TaskDetailData = ({title , text}) => {
    return (
        <View style={{ flexDirection: "row", marginVertical: 10, justifyContent: "space-between", alignItems: "center" }}>
            <Text style={styles.infoTitle}>{title} : </Text>
            <Text style={styles.infoData}> {text} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    infoTitle:{
        fontSize: 16,
        textTransform: "uppercase",
        color: colors.primary,
        fontWeight: "bold",
        marginLeft: 15
    },
    infoData:{
        fontSize : 16,
        fontWeight: "bold",
        color: 'grey',
        marginRight: 15
    }
});

export default TaskDetailData;