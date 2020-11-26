import AsyncStorage from "@react-native-async-storage/async-storage";
import puliecolServer from "../api/puliecolServer";
import { navigate } from "../navigationRef";
import createDataContext from "./createDataContext";


const processReducer = (state, action) => {
    switch (action.type) {
        case 'load_task':
            return { ...state, task: action.payload };
        case 'load_task_driver':
            return { ...state, task: action.payload };
        case 'load_completed_task':
            return { ...state, task: action.payload };
        case 'load_driver':
            return{...state , driver: action.payload};
        case 'load_vehicle':
            return { ...state, vehicle: action.payload };
        case 'load_isle':
            return { ...state, isle: action.payload };
        case 'search_isle':
            return { ...state, isle: state.isle.filter(item => item.city == action.payload) };
        case 'load_announce':
            return{...state , announce: action.payload};
        case 'clear_process_state':
            return { task: [], announce: [], vehicle: [], isle: [] }
        default:
            return state;
    }
}

// Chiamata per restituire tutte le task all' Admin
const loadTask = dispatch => async () => {
    try {
        const response = await puliecolServer.get('/tasks');
        console.log('-----> Caricamento dati Task');
        dispatch({ type: 'load_task', payload: response.data });

    } catch (err) {
        console.log(err);
    };
};

const loadTaskDriver = dispatch => async ({ id }) => {
    try {
        const response = await puliecolServer.get('/tasks');
        console.log('-----> Caricamento task Driver')
        dispatch({ type: 'load_task_driver', payload: response.data.filter((item) => item.UserId == id) })
    } catch (err) {
        console.log(err);
    }
}


// Chiamata per restituire tutte le task completate 
const loadCompletedTask = dispatch => async () => {
    try {
        const response = await puliecolServer.get('/tasks/completed');
        dispatch({ type: 'load_completed_task', payload: response.data });
        navigate('mainFlow')
    } catch (err) {
        console.log(err);
    };
};

// Chiamata per restituire tutti gli User Driver
const loadDriver = dispatch => async () => {
    try{
        const response = await puliecolServer.get('/users/drivers');
        dispatch({type: 'load_driver', payload: response.data});
    }catch(err){
        console.log(err);
    }
}

// Chiamata per restituire tutte i mezzi
const loadVehicle = dispatch => async () => {
    try {
        const response = await puliecolServer.get('/vehicles');
        dispatch({ type: 'load_vehicle', payload: response.data });
        console.log('-----> Caricamento dati Veicoli');
    } catch (err) {
        console.log(err)
    }
}
// Chiamata per restituire tutte le isole ecologiche
const loadIsle = dispatch => async () => {
    try {
        const response = await puliecolServer.get('/isles');
        console.log('-----> Caricamento dati Isole Ecologiche');
        dispatch({ type: 'load_isle', payload: response.data });
    } catch (err) {
        console.log(err);
    };
};

// Chiamata per filtrare le isole ecologiche ( Ricerca )
const searchSpecificIsle = dispatch => async ({ textSearch }) => {
    if (textSearch == '') {
        const response = await puliecolServer.get('/isles');
        console.log('-----> Caricamento dati Isole Ecologiche');
        dispatch({ type: 'load_isle', payload: response.data });
    } else {
        dispatch({ type: 'search_isle', payload: textSearch.toUpperCase() });
    };

};

const loadAnnounce = dispatch => async() => {
    try{
        const response = await puliecolServer.get('/announces');
        dispatch({type: 'load_announce' , payload: response.data});
    }catch(err){

    }
}

const addAnnounce = dispatch => async ({message , priority}) =>{
    try{
        puliecolServer.post('/announces',{message , priority});
        navigate('AnnounceList')
    }catch(err){
        console.log(err);
    }
} 

const clearProcessState = (dispatch) => {
    return () => {
        dispatch({type: 'clear_process_state'});
        console.log('Bye Bye');
    };
};

export const { Provider, Context } = createDataContext(
    processReducer,
    {
        loadTask,
        loadTaskDriver,
        loadCompletedTask,
        loadDriver,
        loadVehicle,
        loadIsle,
        searchSpecificIsle,
        loadAnnounce,
        addAnnounce,
        clearProcessState
    },
    {
        task: [],
        driver: [],
        announce: [],
        vehicle: [],
        isle: [],
        wasteType:  ['R1', 'R2' , 'R3' , 'R4' , 'R5' , 'R6'],
    }
)