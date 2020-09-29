//react
import React,{Fragment} from "react";
//css
import './index.css'
//antd
import {Menu} from "antd";
import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
//router
import router from "../../router";
import {Link} from 'react-router-dom';

const {SubMenu} = Menu;

class ASide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    /*
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <ASide />
                    </Menu>
<Menu.Item key="1" icon={<PieChartOutlined />}>
Option 1
</Menu.Item>
<Menu.Item key="2" icon={<DesktopOutlined />}>
Option 2
</Menu.Item>
<SubMenu key="sub1" icon={<UserOutlined />} title="User">
    <Menu.Item key="3">Tom</Menu.Item>
    <Menu.Item key="4">Bill</Menu.Item>
    <Menu.Item key="5">Alex</Menu.Item>
</SubMenu>
<SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
    <Menu.Item key="6">Team 1</Menu.Item>
<Menu.Item key="8">Team 2</Menu.Item>
</SubMenu>
<Menu.Item key="9" icon={<FileOutlined />} />

     */

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
        return (
            <Fragment>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
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

export default ASide;