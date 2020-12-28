import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Platform } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderComponent from '../components/HeaderComponent';

import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { colors } from '../constants/color';

import { Context as ProcessContext } from '../context/ProcessContext';

const CreateTaskScreen = ({ navigation }) => {
  const { state, loadDriverAndIsle , createTask } = useContext(ProcessContext);

  const [tasktype, setTaskType] = useState(null);
  const [wastetype, setWasteType] = useState(null);
  const [driverId, setDriverId] = useState(null);
  const [isleId, setIsleId] = useState(null);
  const [taskDate, setTaskDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTaskDate(date);
    hideDatePicker();
  };

  const autisti = state.driver.map(driver => {
    return {
      label: driver.firstName + ' ' + driver.lastName,
      value: driver.id
    }
  });



  const isole = state.isle.map(isle => {
    return {
      label: isle.city,
      value: isle.id
    }
  });


  return (
    <>
      <NavigationEvents onDidFocus={loadDriverAndIsle} />
      <HeaderComponent headerTitle='Inserisci Recupero' iconName='close' onPress={() => navigation.goBack()} />

      {/** Piker per la selezione del tipo Recupero */}
      <View style={{ flex: 1, padding: 15 }}>
        <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 5
            })
          }}
        >
          <Text style={styles.title}>Seleziona tipo Recupero:</Text>
          <DropDownPicker
            items={[
              { label: 'Recupero in entrata', value: 'IN' },
              { label: 'Recupero in uscita', value: 'OUT' },
            ]}
            placeholder='...'
            defaultValue={null}
            containerStyle={{ height: 40, }}
            activeLabelStyle={{ color: colors.primary }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => setTaskType(item.value)}
          />
        </View>

        {/** Piker per la selezione del materiale */}
        <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 4
            })
          }}
        >
          <Text style={styles.title}>Seleziona materiale Recupero:</Text>
          <DropDownPicker
            items={[
              { label: 'R1', value: 'R1' },
              { label: 'R2', value: 'R2' },
              { label: 'R3', value: 'R3' },
              { label: 'R4', value: 'R4' },
              { label: 'R5', value: 'R5' },
              { label: 'R6', value: 'R6' },
            ]}
            placeholder='...'
            defaultValue={null}
            containerStyle={{ height: 40, }}
            dropDownStyle={{ flex: 1, }}
            activeLabelStyle={{ color: colors.primary }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => setWasteType(item.value)}
          />
        </View>

        <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 3
            })
          }}
        >
          <Text style={styles.title}>Seleziona Isola Ecologica:</Text>
          <DropDownPicker
            searchable={true}
            searchablePlaceholder='Cerca Isola Ecologica'
            searchableError={() => <Text style={{ color: 'red' }}>Nessun risultato</Text>}
            items={isole}
            placeholder='...'
            defaultValue={null}
            containerStyle={{ height: 40, }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => setIsleId(item.value)}
          />
        </View>

        <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 2
            })
          }}
        >
          <Text style={styles.title}>Seleziona Addetto :</Text>
          <DropDownPicker
            searchable={true}
            searchablePlaceholder='Cerca addetto al recupero'
            searchableError={() => <Text style={{ color: 'red' }}>Nessun risultato</Text>}
            items={autisti}
            placeholder='...'
            defaultValue={null}
            containerStyle={{ height: 40, }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' , color: 'red'}}
            onChangeItem={item => setDriverId(item.value)}
          />
        </View>

        {/**Piker relativo alla Data */}
        <View
          style={{
            ...(Platform.OS !== 'android' && {
              zIndex: 0
            })
          }}
        >
          <Text style={styles.title}>Seleziona Giorno e Ora del Recupero:</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => showDatePicker()}>
            <Text>{taskDate == null ? <Text>...</Text> : taskDate.toString()}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>

        <TouchableOpacity style={styles.buttonConfirm } onPress={() => createTask({date: taskDate , wasteType: wastetype , IsleId: isleId, type: tasktype , UserId : driverId})}>
          <Text style={styles.buttonConfirmText}>Conferma</Text>
        </TouchableOpacity>
      </View>

    </>
  );
};

CreateTaskScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}


const styles = StyleSheet.create({
  title: {
    marginVertical: 15,
    fontWeight: 'bold'
  },
  dateButton: {
    height: 42,
    backgroundColor: '#fafafa',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    paddingLeft: 15
  },
  buttonConfirm: {
    margin: 15,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonConfirmText:{
    color: 'white',
    fontWeight: 'bold',
    zIndex: 0,
    fontSize: 16
  }
});

export default CreateTaskScreen;