import React, { useState, useContext } from "react";
import { MapView } from "expo";
import { View, Text, StyleSheet, FlatList } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import RNPickerSelect from "react-native-picker-select";
import { Context as ProcessContext } from "../context/ProcessContext";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CreateTaskScreen = ({ navigation, onSubmit }) => {
  const { state, loadIsle, searchSpecificIsle } = useContext(ProcessContext);

  const [Data, setData] = useState();
  const [Orario, setOrario] = useState();
  const [Isola, setIsola] = useState("");
  const [Materiale, setMateriale] = useState("R1");
  const [TipoTask, setTipoTask] = useState("IN");
  //const [Driver, setDriver] = useState("");
  const [Note, setNote] = useState("");
  console.log({loadIsle});
  return (
    <View style={styles.GlobalViewStyle}>
      <HeaderComponent
        headerTitle="Inserisci Recupero"
        iconName="close"
        onPress={() => navigation.goBack()}
      />

      <Input
        placeholder="Data"
        value={Data}
        onChangeText={setData}
        placeholderTextColor="lightgrey"
        autoCorrect={false}
        autoCapitalize={"none"}
      />
      <Input
        placeholder="Orario"
        value={Orario}
        onChangeText={setOrario}
        placeholderTextColor="lightgrey"
        autoCorrect={false}
        autoCapitalize={"none"}
      />
      <Input
        placeholder="IN o 0UT"
        value={TipoTask}
        onChangeText={setTipoTask}
        placeholderTextColor="lightgrey"
        autoCorrect={false}
        autoCapitalize={"none"}
      />
      <Input
        placeholder="Note"
        value={Note}
        onChangeText={setNote}
        placeholderTextColor="lightgrey"
        autoCorrect={false}
        autoCapitalize={"none"}
      />

      <RNPickerSelect
        onValueChange={(value) => setMateriale(value)}
        style={styles.RNPickerSelect}
        placeholder={{
          label: "Seleziona la priorità tipo materiale",
        }}
        items={[
          { label: "R1" },
          { label: "R2" },
          { label: "R3" },
          { label: "R4" },
          { label: "R5" },
          { label: "R6" },
        ]}
      ></RNPickerSelect>

    
    </View>
    
  );
};

CreateTaskScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  GlobalViewStyle: {
    flex: 1,
  },
  RNPickerSelect: {},
  ViewInputStyle: {
    paddingHorizontal: wp(5),
    justifyContent: "center",
  },
  InputStyle: {
    paddingHorizontal: wp(1),
  },
  buttonStyle: {},
});

export default CreateTaskScreen;
