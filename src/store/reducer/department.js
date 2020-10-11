
const departmentReducer = function (state = [], action) {

    console.log('departmentReducer', action);

    switch (action.type) {
        case "GET_DEPARTMENT_LIST":{
            return {
                ...state,
                departmentList: action.payload.data
            }
        }
    }

    return state;
};

export default departmentReducer;