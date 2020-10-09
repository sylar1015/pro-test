//react
import React, {Fragment} from 'react';
//antd
import {Form, Input, Button, InputNumber, Switch, message} from "antd";

class DepartmentListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formLayout : {
                labelCol:{span:2},
                wrapperCol:{span:10}
            }
        };

        this.onFinish = this.onFinish.bind(this);
    }

    onFinish(value) {
        message(value);
    }

    render() {

        const {formLayout} = this.state;

        return (
            <Fragment>
                <Form {...formLayout} onFinish={this.onFinish}>
                    <Form.Item name='name' label="部门名称" rules={[{required:true, message:'非空'}]}>
                        <Input></Input>
                    </Form.Item>

                    <Form.Item name='number' label="人员数量" rules={[{required:true}]}>
                        <InputNumber min={0} max={1000}></InputNumber>
                    </Form.Item>

                    <Form.Item name='status' label="禁启用" checked={true}>
                        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
                    </Form.Item>

                    <Form.Item name='content' label="描述">
                        <Input.TextArea></Input.TextArea>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">确认</Button>
                    </Form.Item>
                </Form>
            </Fragment>
        );
    }
}

export class DepartmentAddComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>DepartmentAddComponent</div>
        );
    }
}

export default DepartmentListComponent;
