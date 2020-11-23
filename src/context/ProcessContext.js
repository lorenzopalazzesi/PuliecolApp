import puliecolServer from "../api/puliecolServer";
import { navigate } from "../navigationRef";
import createDataContext from "./createDataContext";


const processReducer = (state , action) => {
    switch(action.type){
        case 'load_task':
            return{...state , task : action.payload};
        case 'load_completed_task':
            return{...state , task: action.payload};
        case 'load_vehicle':
            return{...state , vehicle: action.payload};
        case 'load_isle':
            return{...state , isle: action.payload};
        case 'search_isle':
            return{...state , isle: state.isle.filter(item => item.city == action.payload)};
        default: 
            return state;
    }
}

// Chiamata per restituire tutte le task all' Admin
const loadTask = dispatch => async () =>{
    try{
        const response = await puliecolServer.get('/tasks');
        console.log('-----> Caricamento dati Task');
        dispatch({type: 'load_task' , payload: response.data});
        
    }catch(err){
        console.log(err);
    };
};


// Chiamata per restituire tutte le task completate 
const loadCompletedTask = dispatch => async() => {
    try{
        const response = await puliecolServer.get('/tasks/completed');
        dispatch({type: 'load_completed_task' , payload: response.data});
        navigate('mainFlow')
    }catch(err){
        console.log(err);
    };
};

// Chiamata per restituire tutte i mezzi
const loadVehicle = dispatch => async() => {
    try{
         const response = await puliecolServer.get('/vehicles');
        dispatch({type: 'load_vehicle' , payload: response.data});
        console.log('-----> Caricamento dati Veicoli');
    }catch(err){
        console.log(err)
    }
}
// Chiamata per restituire tutte le isole ecologiche
const loadIsle = dispatch => async() => {
    try{
        const response = await puliecolServer.get('/isles');
        console.log('-----> Caricamento dati Isole Ecologiche');
        dispatch({type: 'load_isle' , payload: response.data});
    }catch(err){
        console.log(err);
    };
};

const searchSpecificIsle = dispatch => async({textSearch}) =>{
    if(textSearch == ''){
        const response = await puliecolServer.get('/isles');
        console.log('-----> Caricamento dati Isole Ecologiche');
        dispatch({type: 'load_isle' , payload: response.data});
    }else{
        dispatch({type: 'search_isle' , payload: textSearch.toUpperCase() });
    }
    
}

export const { Provider , Context } = createDataContext(
    processReducer,
    {
        loadTask,
        loadCompletedTask,
        loadVehicle,
        loadIsle,
        searchSpecificIsle
    },
    {
        task: [],
        vehicle: [],
        isle: [],
    }
)