import React from 'react';
import { StyleSheet } from 'react-native';
import {Text , Button} from 'react-native-elements';
import {withNavigation} from 'react-navigation';

const AccountButton = ({navigation, title , routeName}) => {
    return(
        <Button 
            title={title} 
            style={styles.container}
            buttonStyle={styles.buttonStyle} 
            titleStyle={styles.titleStyle} 
            onPress={() => navigation.navigate({routeName})}
        />
    );
};

const styles = StyleSheet.create({
    container:{
    },
    buttonStyle:{
        margin: 5,
        backgroundColor:'lightgrey',
        height: 50,
        borderRadius: 7
    },
    titleStyle:{
        fontWeight: "bold", 
        color: 'grey'
    }
});

export default withNavigation(AccountButton);