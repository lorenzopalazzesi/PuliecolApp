import React, { useContext } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Badge } from 'react-native-elements';
// Components
import HeaderComponent from "../components/HeaderComponent";


// Context
import { Context as ProcessContext } from "../context/ProcessContext";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import TaskDetail from "../components/TaskDetail";
import { colors } from "../constants/color";
import TaskDetailStatus from "../components/TaskDetailStatus";


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
        <TaskDetailStatus status={specificTask.completed}/>
        <View style={styles.infoContainer}>
          {specificTask.type === 'IN' ? <Text style={styles.taskType}>RECUPERO IN ENTRATA</Text> : <Text style={styles.taskType}>RECUPERO IN USCITA</Text>}
        
        </View>

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
  
  taskType:{
    fontWeight: "bold",
    color: colors.primary,
    fontSize: 20
  },
  infoContainer:{
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
  }

});

export default TaskDetailScreen;
