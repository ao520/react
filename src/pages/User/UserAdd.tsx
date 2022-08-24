import MyTitle from '@/components/MyTitle'
import React, { FC, useState } from 'react'
import { ProForm, ProFormDependency, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Form } from 'antd';
import { observer } from 'mobx-react';
import { useStore } from '@/mobx/context';
import { reg } from '@/utils/validate';
import { showError } from '@/utils/message';
import { Ajax } from '@/api';
import { history } from 'umi';


const UserAdd: FC = () => {
    const { MyInfo: { roleList,userInfo } } = useStore()
    return (
        <div>
            <MyTitle level={5} title="添加用户"></MyTitle>
            <ProForm
                onFinish={async (values) => {
                    let res = await Ajax.adduser(values) as any;
                    if (res.code == 200) {
                        history.push("/app/user/list")
                    }
                }}
                onFinishFailed={() => {
                    showError('请填写有效的用户数据信息')
                }}
                initialValues={{
                    password: 'qwe123'
                }}
            >
                <ProFormText
                    width="md"
                    name="username"
                    label="用户名"
                    tooltip="不能为空"
                    placeholder="请输入用户名"
                    rules={[
                        {
                            required: true,
                            message: '请输入用户名!',
                        }
                    ]}
                />
                <ProFormText
                    width="md"
                    name={'phone'}
                    label="手机号"
                    placeholder="请输入手机号"
                    rules={[
                        {
                            required: true,
                            message: '请输入手机号！',
                        },
                        {
                            pattern: reg.phone,
                            message: '手机号格式错误！',
                        },
                    ]}
                />
                <ProFormText
                    width="md"
                    name={'password'}
                    label="密码"
                    disabled
                />
                <Form.Item noStyle shouldUpdate>
                    {(form) => {
                        return (
                            <ProFormSelect
                                options={roleList.map((item: any) => {
                                    if(item.value > userInfo?.role){
                                        item.disabled = true
                                    }
                                    return {
                                        label: item.text,
                                        value: item.value,
                                        disabled: item.disabled
                                    }
                                })}
                                width="md"
                                name="role"
                                label={'用户角色'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择角色!',
                                    }
                                ]}
                            />
                        );
                    }}
                </Form.Item>
            </ProForm>
        </div>
    )
}

export default observer(UserAdd)