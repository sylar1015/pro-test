import {UserOutlined} from "@ant-design/icons";

const router = [
    {
        title:'控制台',
        icon:'',
        key:'/index'
    },
    {
        title: '用户管理',
        icon:'',
        key:'/index/user',
        children:[
            {
                title: '用户列表',
                icon:'',
                key:'/index/user/list',
            },
            {
                title: '添加用户',
                icon:'',
                key:'/index/user/add',
            }
        ]
    },
    {
        title: '部门管理',
        icon:'laptop',
        key:'/index/department',
        children:[
            {
                title: '部门列表',
                icon:'',
                key:'/index/department/list',
            },
            {
                title: '添加部门',
                icon:'',
                key:'/index/department/add',
            }
        ]
    },
    {
        title: '职位管理',
        icon:'laptop',
        key:'/index/job',
        children:[
            {
                title: '职位列表',
                icon:'',
                key:'/index/job/list',
            },
            {
                title: '添加职位',
                icon:'',
                key:'/index/job/add',
            }
        ]
    },
    {
        title:'请假',
        icon:'',
        key:'/index/leave'
    },
    {
        title:'加班',
        icon:'',
        key:'/index/overtime'
    }
];

export default router;