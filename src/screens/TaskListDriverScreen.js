import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Badge } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';
import HeaderComponent from '../components/HeaderComponent';
import { Context as ProcessContext } from '../context/ProcessContext';
import { Context as AuthContext } from '../context/AuthContext';
import TaskList from '../components/TaskList';

const TaskListDriverScreen = ({ navigation }) => {
    const { state: { user } } = useContext(AuthContext);
    const { state: { task }, loadTaskDriver } = useContext(ProcessContext);
    const id = user.id;
    return (
        <>
            <NavigationEvents onDidFocus={() => loadTaskDriver({ id })} />
            <HeaderComponent
                headerTitle='I Miei Recuperi'
            />
            <FlatList
                ListEmptyComponent={
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                        <Text style={{marginTop: 10 , fontSize:16 , fontWeight: 'bold'}}>Non hai alcun recupero assegnato...</Text>
                    </View>
                }
                data={task}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TaskList
                            onSelectTask={() => navigation.navigate('TaskDetailDriver', { id: item.id })}
                            type={item.type}
                            city={item.Isle.city}
                            isCompleted={item.completed}
                            cliente={item.Isle.fir}
                            data={item.date}
                            wasteType={item.wasteType}
                            addetto={item.User}
                        />
                    );
                }}
            />
        </>
    );
};

TaskListDriverScreen.navigationOptions = () => {
    return {
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        margin: 5,
        borderRadius: 8,
        borderColor: 'lightgrey',
        padding: 4,
        justifyContent: "space-between"
    },
    city: {
        fontWeight: "bold",
        marginVertical: 3
    }
});

export default TaskListDriverScreen;