import React, { useState } from "react";
import { MapView } from "expo";
import { View, Text, StyleSheet  } from "react-native";
import HeaderComponent from "../components/HeaderComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input, } from "react-native-elements";
import DatePicker from 'react-native-datepicker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CreateTaskScreen = ({ navigation, onSubmit }) => {
  const [Data, setData] = useState();
  const [Orario, setOrario] = useState();
  const [Isola, setIsola] = useState("");
  const [Materiale, setMateriale] = useState("R1");
  const [TipoTask, setTipoTask] = useState("IN");
  const [Driver, setDriver] = useState("");
  const [Note, setNote] = useState("");

  console.log({Driver})
  return (
    <View style={styles.GlobalViewStyle}>
      <HeaderComponent
        headerTitle="Inserisci Recupero"
        iconName="close"
        onPress={() => navigation.goBack()}
      />

      <View style={styles.ViewInputStyle}>
      <DatePicker
          style={styles.datePickerStyle}
          date={Data} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2028"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
        <Picker
           
          >
        
          <Picker.Item label="isola1" value=""/>
          <Picker.Item label="isola2" value="" />
        </Picker>

        <Picker>
          <Picker.Item label="materiale" value="" />
          <Picker.Item label="materiale" value="" />
        </Picker>

        <Picker>
          <Picker.Item label="IN" value="" />
          <Picker.Item label="OUT" value="" />
        </Picker>

        <Picker>
          <Picker.Item label="Driver1" value="" />
          <Picker.Item label="Driver2" value="" />
        </Picker>
        <Input
          placeholder="Data"
          leftIcon={{ type: "font-awesome", name: "clock-o" }}
          style={styles.InputStyle}
          value={Data}
          onChangeText={setData}
          autoCorrect={false}
        />
       
        <Input
          placeholder="Note"
          leftIcon={{ type: "font-awesome", name: "comment" }}
          style={styles.InputStyle}
          value={Note}
          onChangeText={setNote}
        />
        <Button
          title="Inserisci Task"
          style={styles.buttonStyle}
          titleStyle={styles.TextbuttonStyle}
          onPress={() =>
            onSubmit({ Data, Isola, Materiale, TipoTask, Driver, Note })
          }
        ></Button>
      </View>
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
  ViewInputStyle: {
    paddingHorizontal: wp(5),
    justifyContent: "center",
  },
  InputStyle: {
    paddingHorizontal: wp(1),
  },
  buttonStyle: {},
  TextbuttonStyle: {},
});

export default CreateTaskScreen;
