import rootReducer from "../redux/reducers/Reducers";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(rootReducer, composeWithDevTools());

export default store;