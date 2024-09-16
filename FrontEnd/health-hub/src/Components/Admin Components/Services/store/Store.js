import { applyMiddleware, createStore } from "redux";
import ServiceReducer from "../reducer/ServiceReducer";
import { thunk } from "redux-thunk";


const store = createStore(ServiceReducer,applyMiddleware(thunk));
export default store;