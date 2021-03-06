//css
import './index.css'
//react
import React, {Fragment} from 'react';
//route
import {Link} from 'react-router-dom';
//antd
import {Form, Input, Button, InputNumber, Switch, message, Table} from "antd";
//
import MessageBox,{ConfirmBox} from "@c/mbox";
//
import DepartmentTable from "@c/department/table";

export class DepartmentAddComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formLayout : {
                id:"",
                labelCol:{span:2},
                wrapperCol:{span:10}
            }
        };

        this.onFinish = this.onFinish.bind(this);


    }

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({id:this.props.location.state.id});
        }
    }

    componentDidMount() {

        if (this.state.id) {
            console.log('dept', this.state.id);
        }
    }

    onFinish(value) {
        message.info(value);

        this.refs.form.resetFields();
    }

    render() {

        const {formLayout} = this.state;

        return (
            <Fragment>
                <Form ref='form' {...formLayout} onFinish={this.onFinish}>
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

class DepartmentListComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [
                {title:'部门名称',dataIndex:'name',key:'name'},
                {
                    title:'禁启用',
                    dataIndex:'status',
                    key:'status',
                    render: (status) => {
                        return (
                            <Fragment>
                                <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={status} />
                            </Fragment>
                        )
                    }
                },
                {title:'人员数量',dataIndex:'number',key:'number'},
                {
                    title:'操作',
                    dataIndex:'operation',
                    key:'operation',
                    width:215,
                    render: (text, rowData) => {
                        return (
                            <div>
                                <Button type="primary">
                                    <Link to={{pathname:'/index/department/add', state:{id:rowData.id} }}>编辑</Link>
                                </Button>
                                <Button onClick={()=>this.onDelDept(rowData.id)}>删除</Button>
                            </div>
                        )
                    }
                },
            ],
            dataSource: [
                {
                    id:'100',
                    key:'1',
                    name:'研发部',
                    status:true,
                    number:10,
                    operation:'编辑/删除'
                }
            ],

            selectedRowKeys:[],
            selectedKey:"",
        };
    }

    onOk = () => {
        message.info(this.state.selectedKey);
        this.setState({visible:false});
    };

    onEditDept = (id) => {
        console.log('edit', id)
    };

    temp = ()=> {
      console.log('tmp', this.state.selectedKey);
    };

    onDelDept = (id) => {
        this.setState({selectedKey:id});
        ConfirmBox(this.temp);
    };

    onFinish = (value) => {
        message.info(value.name);
    };

    onTableChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});

    };

    onTableSelect = (e) => {
        console.log('select', e);
    };

    loadData = () => {

    };

    render() {

        const {columns, dataSource} = this.state;

        const rowSelection = {
                type: "checkbox",
                onChange: this.onTableChange,
                onSelect: this.onTableSelect
        };

        return (
            <div>
                <Form onFinish={this.onFinish} layout="inline">
                    <Form.Item label="部门名称" name="name">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>

                <Table className="table-wrap" bordered size="small"
                    rowSelection={rowSelection}
                    columns={columns} dataSource={dataSource}
                >

                </Table>

                <MessageBox ref="messagebox" />

                <DepartmentTable/>

            </div>
        );
    }
}

export default DepartmentListComponent;
