import React, { useContext } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import { Context as ProcessContext } from '../context/ProcessContext';
import { NavigationEvents } from 'react-navigation';
import TaskList from '../components/TaskList';

const TaskListScreen = ({ navigation }) => {
    const { state, loadTask } = useContext(ProcessContext);


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <NavigationEvents onDidFocus={loadTask} />
            <HeaderComponent
                headerTitle='Lista Recuperi'
                iconName='plus'
                onPress={() => { navigation.navigate('CreateTask') }}
            />
            <FlatList
                data={state.task}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TaskList
                            onSelectTask={() => navigation.navigate('TaskDetail', { id: item.id })}
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
        </View>
    );
};

TaskListScreen.navigationOptions = () => {
    return {
        headerShown: false
    }
}

const styles = StyleSheet.create({

});


export default TaskListScreen;