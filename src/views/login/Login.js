import React from "react";

//css
import './login.scss'
//antd
import {Form, Input, Button, Row, Col, message} from "antd";
import { UserOutlined, LockOutlined, PoweroffOutlined } from '@ant-design/icons'
//utils
import {validate_password} from "../../utils/validate";
//api
import {Login, GetCode} from "../../api/account";

class LoginComponent extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            formType : 'login'
        };

        this.changeFormType = this.changeFormType.bind(this);
    }

    changeFormType (formType) {
        this.setState({formType : formType});
    }

    render() {

        return (
            <div>
                {this.state.formType === 'login'
                    ?
                    <LoginForm changeFormType={this.changeFormType}/>
                    :
                    <RegisterForm changeFormType={this.changeFormType}/>}
            </div>
        )
    }
}

class LoginForm extends React.Component {

    constructor (props) {
        super(props);

        this.code_button_text = ['获取验证码', '发送中', '60S', '重新获取'];
        this.state = {
            username:'',
            code_button_click_disabled:true,
            code_button_loading:false,
            code_button_text: this.code_button_text[0]
        };



        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
        this.onChangeFormType = this.onChangeFormType.bind(this);

        this.getCode = this.getCode.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    getCode() {

        if (this.state.code_button_click_disabled) {
            return false;
        }

        this.setState({
            code_button_text:this.code_button_text[1],
            code_button_loading:true,
        });

        const payload = {
            username: this.state.username,
            module: 'login'
        };

        GetCode(payload).then(response => {

            this.countDown();
        }).catch(error => {
            this.setState({
                code_button_text:this.code_button_text[3],
                code_button_loading:false,
                code_button_click_disabled:false
            });
            console.log(error);
        });
    }

    componentDidMount() {
        //console.log(process.env.REACT_APP_API)
    }

    onFinish(values) {
        //console.log("onFinish", values);
        Login(values).then(response => {
            console(response);
        }).catch(error => {
            console.log(error);
        });
    }

    onFinishFailed(err) {
        console.log('Failed', err);
    }

    onChangeFormType() {
        this.props.changeFormType('register');
    }

    /*
    * 输入内容变更
    * */
    onInputChange(e) {
        const value = e.target.value;
        const disabled = !value;

        this.setState({username:value, code_button_click_disabled:disabled});
    }

    /*
    * 倒计时
    * */
    countDown() {

        let sec  = 60;
        let timer = null;

        /*
        * setInterval / clearInterval 不间断执行
        * setTimeout / clearTimeout 只执行一次
        *  */

        this.setState({
            code_button_text: `${sec}S`,
            code_button_loading:false,
            code_button_click_disabled:true
        });

        timer = setInterval(()=>{
            sec -= 1;
            this.setState({code_button_text: `${sec}S`});

            if (sec == 0) {
                clearInterval(timer);
                this.setState({
                    code_button_text: this.code_button_text[3],
                    code_button_click_disabled: false
                })
            }
        }, 1000)
    }

    render() {

        const {username, code_button_loading, code_button_text} = this.state;

        return (
            <div className="my-login-form">
                <div>
                    <div className="my-login-form-header">
                        <span className="my-title">登录</span>
                        <span onClick={this.onChangeFormType}>账号注册</span>
                    </div>
                    <div className="my-login-form-content">
                        <Form
                            className="login-form"
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}>
                            <Form.Item name='username' rules={[{required: true, message:'Please Input Username'}]}>
                                <Input value={username} onChange={this.onInputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder='账号'/>
                            </Form.Item>

                            <Form.Item name='password'
                                       rules={[
                                           {required: true, message:'Please Input Password'},
                                           {pattern: validate_password, message:'请输入6到20位数字+字母组合'}
                                           /*
                                           ({getFieldValue}) => ({
                                               validator(rule, value) {
                                                   if (value.length < 6) {
                                                       return Promise.reject("密码不小于6位");
                                                   }
                                                   return Promise.resolve();
                                               }
                                           })
                                            */
                                           ]}
                            >
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='密码' />
                            </Form.Item>

                            <Form.Item name='code' rules={[{required: true, message:'Please Input Captcha'}]}>
                                <Row gutter={13}>
                                    <Col span={15}>
                                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="验证码"/>
                                    </Col>
                                    <Col span={9}>
                                        <Button type='danger' loading={code_button_loading}
                                                block onClick={this.getCode}>{code_button_text}</Button>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item>
                                <Button type='primary' htmlType="submit" className="login-form-button" block>登录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

class RegisterForm extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};

        this.onFinish = this.onFinish.bind(this);
        this.onFinishFailed = this.onFinishFailed.bind(this);
        this.onChangeFormType = this.onChangeFormType.bind(this);

        this.onInputChange = this.onInputChange.bind(this);
    }

    onFinish(values) {
        console.log("onFinish", values);
    }

    onFinishFailed(err) {
        console.log('Failed', err);
    }

    onChangeFormType() {
        this.props.changeFormType('login');
    }

    onInputChange() {

    }

    render() {

        const {username} = this.state.username;

        return (
            <div className="my-login-form">
                <div>
                    <div className="my-login-form-header">
                        <span className="my-title">注册</span>
                        <span onClick={this.onChangeFormType}>登录</span>
                    </div>
                    <div className="my-login-form-content">
                        <Form
                            className="login-form"
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}>
                            <Form.Item name='username' rules={[{required: true, message:'Please Input Username'}]}>
                                <Input value={username} onChange={this.onInputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder='账号'/>
                            </Form.Item>

                            <Form.Item name='password' rules={[{required: true, message:'Please Input Password'}]} hasFeedback>
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='密码' />
                            </Form.Item>

                            <Form.Item name='confirm' dependencies={['password']}
                                rules={[
                                    {required: true, message:'Please Confirm Password'},
                                    ({ getFieldValue }) => ({
                                               validator(rule, value) {
                                                   if (!value || getFieldValue('password') === value) {
                                                       return Promise.resolve();
                                                   }

                                                   return Promise.reject('The two passwords that you entered do not match!');
                                               },
                                    }),
                                ]} hasFeedback>
                                <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='再次确认密码' />
                            </Form.Item>

                            <Form.Item rules={[{required: true, message:'Please Input Captcha'}]}>
                                <Row gutter={13}>
                                    <Col span={15}>
                                        <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="验证码"/>
                                    </Col>
                                    <Col span={9}>
                                        <Button type='danger' block>获取验证码</Button>
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item>
                                <Button type='primary' htmlType="submit" className="login-form-button" block>注册</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent;