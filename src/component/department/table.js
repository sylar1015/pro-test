import React from "react";
import {connect} from "react-redux";

class DepartmentTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        console.log(this.props.status);

        this.props.search({width:100, height:200});
    }

    render() {
        return (
            <div>{this.props.list}</div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list: state.department.departmentList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        search: (args) => {
            //业务逻辑
            console.log(args.width, args.height);
            dispatch({
                type:"GET_DEPARTMENT_LIST",
                payload:{data:[1,2,3,4,5,6,7,8,9]}
            });
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(DepartmentTable);