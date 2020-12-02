import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
// Colors 
import { colors } from "../constants/color";

const TaskDetail = ({ iconName, title, text }) => {
    return (
        <View style={styles.line}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome5 name={iconName} size={24} color={colors.primary} />
                <Text style={{ marginLeft: 10, fontSize: 18, color: colors.primary, fontWeight: "bold" }} >{title}</Text>
            </View>
            <Text>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    line: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10
    }
});

export default TaskDetail;