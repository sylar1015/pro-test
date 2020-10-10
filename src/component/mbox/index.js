import React from "react";

import {Modal, message} from "antd";

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
    }

    onOk = () => {
        message.info('confirm');
    };

    show = () => {
        this.setState({visible:true});
    };

    hide = () => {
        this.setState({visible:false});
    };

    render() {

        const {visible} = this.state;
        const {title, text} = this.props;

        return (
            <Modal
                title={title}
                visible={visible}
                onOk={this.onOk}
                onCancel={this.hide}
            >
                <p>{text}</p>
            </Modal>
        )
    }
}

export default MessageBox;