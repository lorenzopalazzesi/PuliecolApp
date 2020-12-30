import React from 'react';
import { View , Text , StyleSheet } from 'react-native';
import { colors } from '../constants/color';

const TaskDetailData = ({title , text}) => {
    return (
        <View style={{ flexDirection: "column", paddingVertical: 10, paddingHorizontal: 15,  justifyContent: "space-between", alignItems: "flex-start" }}>
            <Text style={styles.infoTitle}>{title} : </Text>
            <Text style={styles.infoData}>{text} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    infoTitle:{
        fontSize: 18,
        textTransform: "uppercase",
        color: colors.primary,
        fontWeight: "bold",
    },
    infoData:{
        fontSize : 16,
        fontWeight: "bold",
        color: 'grey',
        marginTop: 5,
    }
});

export default TaskDetailData;