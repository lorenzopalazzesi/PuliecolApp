import puliecolServer from "../api/puliecolServer";
import createDataContext from "./createDataContext";


const processReducer = (state , action) => {
    switch(action.type){
        case 'load_task':
            return{...state , task : action.payload};
        default: 
            return state;
    }
}
// Chiamata per restituire tutte le task all' Admin
const loadTask = dispatch => async () =>{
    try{
        const response = await puliecolServer.get('/tasks');
        dispatch({type: 'load_task' , payload: response.data});
    }catch(err){
        console.log(err);
    };
};


const getUserData = () => async () => {
    try{
        const response = await puliecolServer.get('/users/profile');
        console.log(response);
    }catch(err){
        console.log(err);
    }
}

export const {Provider , Context } = createDataContext(
    processReducer,
    {
        loadTask,
        getUserData
    },
    {
        task: [
        ]
    }
)