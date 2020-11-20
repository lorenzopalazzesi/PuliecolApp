import React from 'react';
import { Image, StyleSheet } from 'react-native';


const HeaderLogo = () => {
    return(
        <Image 
            source={require('../../assets/logo.png')} 
            style={styles.image}
        />
    );
};

const styles = StyleSheet.create({
    image:{
        height: 35,
        width: 35,
        borderRadius: 100
    }
});

export default HeaderLogo;