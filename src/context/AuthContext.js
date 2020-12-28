import createDataContext from './createDataContext';
import puliecolServer from '../api/puliecolServer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from '../navigationRef';


const authReducer = (state , action) => {
    switch(action.type){
        case 'signin':
            return{errorMessage: '' , token: action.payload.token , user: action.payload.user};
        case 'signout':
            return {token: null , errorMessage: '' , user: []};
        case 'add_error_message':
            return{...state , errorMessage: action.payload};
        case 'clear_error_message':
            return{...state , errorMessage: ''};
        default:
            return state;
    }
}

const signin = (dispatch) => async({username , password}) => {
    try{
        const response = await puliecolServer.post('/auth/login', {username , password });
        await AsyncStorage.setItem('token' , response.data.token);
        const responseRole = await puliecolServer.get('/users/profile');
        dispatch({type: 'signin' , payload: {token: response.data.token , user: responseRole.data}});
        console.log('Accesso effettuato con il Token: ' + response.data.token + ' ' + responseRole.data.role);
        if(responseRole.data.role == 'ADMIN') {
            navigate('mainFlow');
        }else if(responseRole.data.role == 'DRIVER'){
            navigate('mainFlowDriver');
        }else if(responseRole.data.role == 'SYSTEM'){
            navigate('mainFlowSystem')
        }

    }catch(err){
        dispatch({type:'add_error_message' , payload: 'Impossibile effettuare il Login'});
    }
};

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        try{
            const responseRole = await puliecolServer.get('/users/profile');
            dispatch({ type: 'signin', payload: {token: token , user: responseRole.data} });
            console.log('Accesso Già Effettuato con Token: ' + token + ' ' + responseRole.data.role);
            if(responseRole.data.role == 'ADMIN') {
                navigate('mainFlow');
            }else if(responseRole.data.role == 'DRIVER'){
                navigate('mainFlowDriver');
            }else if(responseRole.data.role == 'SYSTEM'){
                navigate('mainFlowSystem');
            }
        }catch(err){
            console.log(err);
        }
    } else {
        navigate('loginFlow');
    };
};

const signout = dispatch => async () =>  {
    await AsyncStorage.removeItem('token');
    dispatch({type: 'signout'});
    console.log('Logout effettuato. Token rimosso con successo');
    navigate('loginFlow');
};

const clearErrorMessage = (dispatch) => {
    return () => {
        dispatch({type: 'clear_error_message'})
    };
};




export const { Provider, Context } = createDataContext(
    authReducer,
    {
        signin,
        signout,
        clearErrorMessage,
        tryLocalSignin
    },
    {
        token: null,
        user: [],
        errorMessage: ''
    }
);