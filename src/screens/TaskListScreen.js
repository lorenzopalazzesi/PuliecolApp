import React, { useContext, useEffect } from 'react';
import { Button, StyleSheet, FlatList, View } from 'react-native';
import { Text, Badge } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderComponent from '../components/HeaderComponent';
import { Context as ProcessContext } from '../context/ProcessContext';

const TaskListScreen = ({ navigation }) => {
    const { state, loadTask} = useContext(ProcessContext);

    useEffect(() => {
        loadTask();
    }, []);

    return (
        <View style={{ flex: 1 , backgroundColor:'white' }}>
            <HeaderComponent
                headerTitle='Lista Recuperi'
                iconName='user-o'
                onPress={() => navigation.navigate('Account')}
            />
             <FlatList
                data={state.task}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('TaskDetail' , {id : item.id})}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <Text style={styles.city}>Luogo : {item.Isle.city}</Text>
                                {(item.completed === null || item.completed === false) ? <Badge value={<Text></Text>} status='error' /> : <Badge value={<Text></Text>} status='success' />}
                            </View>
                            <Text style={styles.city}>Data : {item.date}</Text>
                            <Text style={styles.city}>Ora : {item.hour}</Text>
                            <Text style={styles.city}>Cliente : {item.Isle.client}</Text>
                            <Text style={styles.city}>Tipologia Rifiuti : {item.wasteType}</Text>
                            

                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
};

TaskListScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        borderWidth: 2,
        margin: 5,
        borderRadius: 8,
        borderColor: 'black',
        padding: 4,
        justifyContent: "space-between"
    },
    city: {
        fontWeight: "bold",
        marginVertical: 2
    }
});


export default TaskListScreen;