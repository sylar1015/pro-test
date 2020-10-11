import {createStore, combineReducers} from "redux";

import departmentReducer from "@store/reducer/department";
import constantReducer from "@store/reducer/constant";
import jobReducer from "@store/reducer/job";

const allReducer = {
   department: departmentReducer,
   constant: constantReducer,
   job: jobReducer,
};



const store = createStore(combineReducers(allReducer));

export default store;