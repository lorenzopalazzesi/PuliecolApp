import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Badge } from "react-native-elements";
import HeaderComponent from "../components/HeaderComponent";
import { Context as ProcessContext } from "../context/ProcessContext";

const TaskDetailScreen = ({ navigation }) => {
  const id = navigation.getParam("id");
  const { state } = useContext(ProcessContext);

  const specificTask = state.task.find((t) => t.id == id);

  return (
    <View>
      <HeaderComponent
        headerTitle="Dettagli Recupero"
        iconName="close"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.line}>
        <Text style={{ marginRight: 10 }}>STATO</Text>
        <Badge value={<Text style={{ padding: 20 }}>Da completare</Text>} status='error' />
        <Text>{specificTask.Isle.city}</Text>
      </View>

      <Text>{specificTask.status}</Text>
    </View>
  );
};

TaskDetailScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  line: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  city: {
    fontSize: 24,
  },
});

export default TaskDetailScreen;
