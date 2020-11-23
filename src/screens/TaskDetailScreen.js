import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Badge } from 'react-native-elements';
// Components
import HeaderComponent from "../components/HeaderComponent";


// Context
import { Context as ProcessContext } from "../context/ProcessContext";
import { ScrollView } from "react-native-gesture-handler";
import TaskDetail from "../components/TaskDetail";


const TaskDetailScreen = ({ navigation }) => {
  const id = navigation.getParam("id");

  const { state } = useContext(ProcessContext);

  const specificTask = state.task.find((t) => t.id == id);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <HeaderComponent
        headerTitle="Dettagli Recupero"
        iconName="close"
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={{ borderBottomWidth: 1.5, borderBottomColor: 'lightgrey', flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 }}>
          <Text style={styles.statusTitle}>STATO ATTUALE</Text>
          {specificTask.completed == true ?
            <Badge status='success' value={<Text></Text>} /> :
            <Badge status='error' value={<Text></Text>} />
          }
        </View>
        <TaskDetail
          iconName='map-marker-alt'
          title='Città'
          text={specificTask.Isle.city}
        />
        <TaskDetail
          iconName='industry'
          title='Azienda'
          text={specificTask.Isle.fir}
        />
      </ScrollView>
    </View>
  );
};

TaskDetailScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  statusTitle: {
    fontWeight: "bold",
    color: 'lightgrey',
    fontSize: 16
  },

});

export default TaskDetailScreen;
