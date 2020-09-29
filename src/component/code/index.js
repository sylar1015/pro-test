import React from 'react';
import {Button} from "antd";
import {GetCode} from "../../api/account";

let timer = null;

class Code extends React.Component {
    constructor(props) {
        super(props);

        this.button_text = ['获取验证码', '发送中', '60S', '重新获取'];

        this.state = {
            username: props.username,
            model: props.model,
            button_loading: false,
            button_text: this.button_text[0],
            button_click_disabled: false
        };

        this.getCode = this.getCode.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    getCode() {

        const {button_click_disabled, username, model} = this.state;

        if (button_click_disabled) {
            return false;
        }

        this.setState({
            button_text: this.button_text[1],
            button_loading: true,
        });

        const payload = {
            username,
            module:model
        };

        GetCode(payload).then(response => {
            this.countDown();
        }).catch(error => {
            this.setState({
                button_text: this.button_text[3],
                button_loading: false,
                button_click_disabled: false
            });
            console.log(error);
        });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {username} = nextProps;
        this.setState({username});
    }

    componentWillUnmount() {
        clearInterval(timer);
    }

    /*
    * 倒计时
    * */
    countDown() {

        let sec = 60;

        /*
        * setInterval / clearInterval 不间断执行
        * setTimeout / clearTimeout 只执行一次
        *  */

        this.setState({
            button_text: `${sec}S`,
            button_loading: false,
            button_click_disabled: true
        });

        timer = setInterval(() => {
            sec -= 1;
            this.setState({button_text: `${sec}S`});

            if (sec === 0) {
                clearInterval(timer);
                this.setState({
                    button_text: this.button_text[3],
                    button_click_disabled: false
                })
            }
        }, 1000)
    }

    render() {

        const {button_loading, button_text} = this.state;

        return (
            <Button type='danger' loading={button_loading} onClick={this.getCode} block>{button_text}</Button>
        )
    }
}

export default Code;