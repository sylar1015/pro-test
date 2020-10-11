import {connect} from 'react-redux';

const data = {
    status: [
        {label:'启用', value:true},
        {label:'禁用', value:false}
    ]
};

const constantReducer = function (state = data, action) {
    return state;
};

export default constantReducer;