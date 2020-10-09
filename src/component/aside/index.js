//react
import React,{Fragment} from "react";
//css
import './index.css'
//antd
import {Menu} from "antd";
import {PieChartOutlined, UserOutlined} from "@ant-design/icons";
//router
import router from "../../router";
import {Link, withRouter} from 'react-router-dom';

const {SubMenu} = Menu;

class ASide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //open_keys:[],
            //selected_keys:[]
        };
    }

    componentDidMount() {
        console.log(this.props);
    }

    renderSubMenu = ({title, key, children}) => {
        return (
            <SubMenu key={key} icon={<UserOutlined />} title={title}>
                {children && children.map(item => {
                    return item.children && item.children.length > 0
                        ? this.renderSubMenu(item)
                        : this.renderMenu(item);
                }) }
            </SubMenu>
        )
    };

    renderMenu = ({title, key}) => {
        return (
            <Menu.Item key={key} icon={<PieChartOutlined />}>
                <Link to={key} />
                {title}
            </Menu.Item>
        )
    };

    render() {

        //const {selected_keys, open_keys} = this.state;

        return (
            <Fragment>
                <Menu theme="dark"
                      /*
                      selectedKeys={selected_keys}
                      openKeys={open_keys}
                       */
                      mode="inline">
                    {router && router.map(item=>{
                            return item.children && item.children.length > 0
                                ? this.renderSubMenu(item)
                                : this.renderMenu(item);
                        })
                    }
                </Menu>
            </Fragment>
        );
    }
}

export default withRouter(ASide);