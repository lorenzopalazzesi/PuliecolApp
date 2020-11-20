import puliecolServer from "../api/puliecolServer";
import { navigate } from "../navigationRef";
import createDataContext from "./createDataContext";


const processReducer = (state , action) => {
    switch(action.type){
        case 'load_task':
            return{...state , task : action.payload};
        case 'load_completed_task':
            return{...state , task: action.payload}
        default: 
            return state;
    }
}
// Chiamata per restituire tutte le task all' Admin
const loadTask = dispatch => async () =>{
    try{
        const response = await puliecolServer.get('/tasks');
        console.log('Reloading Tasks');
        dispatch({type: 'load_task' , payload: response.data});
        
    }catch(err){
        console.log(err);
    };
};

const loadCompletedTask = dispatch => async() => {
    try{
        const response = await puliecolServer.get('/tasks/completed');
        dispatch({type: 'load_completed_task' , payload: response.data});
        navigate('mainFlow')
    }catch(err){
        console.log(err);
    }
}

export const { Provider , Context } = createDataContext(
    processReducer,
    {
        loadTask,
        loadCompletedTask
    },
    {
        task: []
    }
)