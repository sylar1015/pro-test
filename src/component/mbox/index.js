import React from "react";
import PropTypes from 'prop-types';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {Modal} from "antd";

const {confirm} = Modal;

export function ConfirmBox(cb) {
    confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        okText: '确认',
        onOk: cb,
        cancelText: '取消',
        content: "是否确认删除"})
}

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
    }

    onOk = () => {
        
    };

    show = () => {
        this.setState({visible:true});
    };

    hide = () => {
        this.setState({visible:false});
    };

    render() {

        const {visible} = this.state;
        const {title, text, okText, cancelText, width, closable} = this.props;

        return (
            <Modal
                title={title}
                visible={visible}
                okText={okText}
                cancelText={cancelText}
                onOk={this.onOk}
                onCancel={this.hide}
                width={width}
                closable={closable}
            >
                <p>{text}</p>
            </Modal>
        )
    }
}

MessageBox.propTypes = {

};

MessageBox.defaultProps = {
    title: "提示",
    text: "确认删除？",
    okText: "确认",
    cancelText: "取消",
    width:250,
    closable:false

};

export default MessageBox;

//redux
/*
store
state
action
reducer
* */