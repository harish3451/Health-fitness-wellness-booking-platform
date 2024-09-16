import { ADD_SERVICE, DELETE_SERVICE, EMAIL_REGISTERED, FETCH_SERVICE, UPDATE_SERVICE } from "../action/ServiceAction";

const ServiceReducer = (state=[],action)=>{
    switch(action.type){
        case ADD_SERVICE:
            return [...state,action.payload];
        case UPDATE_SERVICE:
            var i = state.findIndex(s=>s.id === action.id);
            state[i] = action.payload;
            return state;
        case FETCH_SERVICE:
            return action.payload;
        case DELETE_SERVICE:
            return state.filter(s=>s.id !== action.payload);
        default:
            return state;
    }
}

export default ServiceReducer;