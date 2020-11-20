import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const server= axios.create({
    baseURL: "https://puliecol.herokuapp.com",
  });
  
  server.interceptors.request.use(
    async config => {
      config.headers['x-auth-token'] = await AsyncStorage.getItem("token");
      return config;
    }
  );
  
  export default server;