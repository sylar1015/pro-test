import React from "react";
import {withRouter} from "react-router-dom";
//css
import './login.scss'
//antd
import {Form, Input, Button, Row, Col} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons'
//utils
import {validate_password} from "../../utils/validate";
//api
import {Login} from "../../api/account";
//local component
import Code from '../../component/code/index';

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

        //this.props.history.push('/index');
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

        this.state = {
            username:'',
        };

        this.onFinish = this.onFinish.bind(this);
        this.onChangeFormType = this.onChangeFormType.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onFinish(values) {
        //console.log("onFinish", values);
        Login(values).then(response => {

            this.props.history.push('/index');

        }).catch(error => {
            console.log(error);
        });
    }

    onChangeFormType() {
        this.props.changeFormType('register');
    }

    /*
    * 输入内容变更
    * */
    onInputChange(e) {
        const value = e.target.value;
        this.setState({username:value});
    }

    render() {

        const {username} = this.state;

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
                                        <Code username={username} model='login' />
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
        this.state = {
            username:''
        };

        this.onFinish = this.onFinish.bind(this);
        this.onChangeFormType = this.onChangeFormType.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
    }

    onFinish(values) {
        console.log("onFinish", values);
    }

    onChangeFormType() {
        this.props.changeFormType('login');
    }

    onInputChange(e) {
        let value = e.target.value;
        this.setState({username:value});
    }

    render() {

        const {username} = this.state;

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

                            <Form.Item name='password'
                                       rules={[
                                           {required: true, message:'Please Input Password'},
                                           {pattern: validate_password, message:'请输入6到20位数字+字母组合'}
                                       ]}
                                       hasFeedback>
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
                                        <Code username={username} model='register' />
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

export default withRouter(LoginComponent);