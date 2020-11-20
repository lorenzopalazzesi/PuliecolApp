import React from 'react';
import { StyleSheet } from 'react-native';
import {Text , Button} from 'react-native-elements';

const AccountButton = ({title}) => {
    return(
        <Button 
            title={title} 
            style={styles.container}
            buttonStyle={styles.buttonStyle} 
            titleStyle={styles.titleStyle} 
        />
    );
};

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10,
        marginVertical:5,
    },
    buttonStyle:{
        backgroundColor:'lightgrey',
        height: 50,
        borderRadius: 7
    },
    titleStyle:{
        fontWeight: "bold", 
        color: 'grey'
    }
});

export default AccountButton;