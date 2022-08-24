import React, { FC, useRef, useState } from 'react'
import { Modal, Layout, Row, Col, Typography, Carousel, Space, Dropdown, Menu, Tag, Button, Tooltip } from 'antd';
import { ExclamationCircleOutlined, DownOutlined, SmileOutlined, PoweroffOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { inject, observer } from 'mobx-react';
import { history } from 'umi';
import Tou from './Tou';
import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { reg } from '@/utils/validate';
import { showError } from '@/utils/message';
import { Ajax } from '@/api';
const { Header } = Layout;
const { Title } = Typography


const contentStyle: React.CSSProperties = {
    height: '64px',
    width: '100%',
    color: '#fff',
    lineHeight: '64px',
    textAlign: 'center',
    background: '#364d79',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    fontSize: 22
};

const Head: FC<{ MyInfo?: any,MyData?:any }> = ({ MyInfo,MyData }) => {
    const { userInfo, roleList, changeUserInfo } = MyInfo;
    const { collapsed, setCollapsed } = MyData;
    const [visible, setvisible] = useState<boolean>(false)
    const formRef:any=useRef()
    const onMenuClick = (item: any) => {
        if (item.key == 'changepass') {
            // 弹框
            setvisible(true)
        } else {
            // 跳转页面 

        }
    }
    // 账号下的菜单
    const menu = (
        <Menu
            onClick={onMenuClick}
            items={[
                {
                    key: '/app/home',
                    label: "首页",
                    icon: <SmileOutlined />,
                },
                {
                    key: '/app/anno',
                    label: "公告",
                    icon: <SmileOutlined />,
                },
                {
                    key: '/app/mine',
                    label: "个人中心",
                    icon: <SmileOutlined />,
                },
                {
                    key: 'changepass',
                    label: '修改密码',
                    icon: <SmileOutlined />,
                },
            ]}
        />
    );

    // 修改密码
    const confirmAction = async (value: any) => {
        if (value.newpass == userInfo.password) {
            showError("重置的密码不能跟原密码一样");
        } else {
            let res: any = await Ajax.changeuserinfo({
                password: value.newpass
            });
            if (res.code == 200) {
                history.push('/login')
            }
        }
    };
    // 退出登录
    const logoutAction = () => {
        Modal.confirm({
            title: '友情提示',
            icon: <ExclamationCircleOutlined />,
            content: '你真的要注销登录吗?',
            cancelText: "取消",
            okText: "确定",

            onOk: () => {
                sessionStorage.removeItem("token")
                localStorage.removeItem("token")
                changeUserInfo(null)
                history.replace("/login")
            },
            onCancel() {
            },
        });
    }
    return (
        <Header style={{ padding: " 0 20px" }}>
            <ModalForm
                formRef={formRef}
                width={'40%'}
                title="修改密码"
                visible={visible}
                onVisibleChange={setvisible}
                modalProps={{
                    onCancel: () => {
                        setvisible(false)
                        formRef.current?.resetFields()
                    },
                }}
                onFinish={async (values: any) => confirmAction(values)}
            >
                <ProFormText width="md" name="oldpass" label="旧密码" initialValue={userInfo ? userInfo.password : ''} disabled />
                <ProFormText.Password width="md" name="newpass" label="新密码" placeholder="请输入新密码"
                    rules={[
                        {
                            required: true,
                            message: '请输入密码！',
                        },
                        {
                            pattern: reg.pwd,
                            message: '请输入6-16位数字字母组合的密码',
                        }
                    ]}
                />
                <ProFormText.Password width="md" name="dbnewpass" label="新密码" placeholder="请再次输入密码" dependencies={['newpass']}
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码！',
                        },
                        {
                            pattern: reg.pwd,
                            message: '请输入6-16位数字字母组合的密码',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newpass') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致!'));
                            },
                        }),
                    ]}
                />
            </ModalForm>


            <Row>
                <Col span={7} style={{ display: 'flex', alignItems: 'center' }} >
                    <span style={{ fontSize: 20, color: "#fff", marginRight: 15 }} >
                        {React.createElement(true ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => {setCollapsed() },
                        })}
                    </span>
                    <Title style={{ fontSize: 30, color: "#fff", margin: 0 }}> 后台管理系统 </Title>
                </Col>
                <Col span={9} offset={1}>
                    <Carousel dotPosition={'right'} autoplay dots={false}>
                        <div style={{ height: '64px' }}>
                            <h3 style={contentStyle}>WH2206-YYDS</h3>
                        </div>
                        <div style={{ height: '64px' }}>
                            <h3 style={contentStyle}>WH2206-daydayup</h3>
                        </div>
                        <div style={{ height: '64px' }}>
                            <h3 style={contentStyle}>WH2206-天道酬勤</h3>
                        </div>
                    </Carousel>
                </Col>
                <Col span={6} offset={1} style={{ display: 'flex', alignItems: 'center', color: "#fff", justifyContent: "flex-end" }}>
                    {
                        userInfo && <Space className="info">
                            <Dropdown overlay={menu}>
                                <Space>
                                    <span >
                                        {userInfo.username}
                                    </span>
                                    <DownOutlined />
                                </Space>
                            </Dropdown>
                            <Tag color={roleList.find((item: any) => item.value == userInfo.role).color}>
                                {roleList.find((item: any) => item.value == userInfo.role).text}
                            </Tag>


                            <Tou />

                            <Tooltip title="注销登录">
                                <Button onClick={logoutAction} icon={<PoweroffOutlined />} size={'middle'} shape="circle" danger></Button>
                            </Tooltip>

                        </Space>
                    }
                </Col>
            </Row>
        </Header>
    )
}

export default inject('MyInfo','MyData')(observer(Head))