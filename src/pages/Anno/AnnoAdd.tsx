import MyTitle from '@/components/MyTitle'
import React, { FC, useState } from 'react'
import { ProForm, ProFormDependency, ProFormSelect, ProFormText, ProFormUploadButton, ProFormTextArea } from '@ant-design/pro-components';
import { Form, Upload,Modal } from 'antd';
import { observer } from 'mobx-react';
import { useStore } from '@/mobx/context';
import { annoListtype } from '@/utils'
import { showError, showSuccess } from '@/utils/message';
import { Ajax } from '@/api';
import { history } from 'umi';

const AnnoAdd: FC = () => {
    const { MyInfo: { roleList, userInfo } } = useStore()
    return (
        <div>
            <MyTitle level={5} title="添加公告"></MyTitle>
            <ProForm
                onFinish={async (values) => {
                    let { desc, content, type, image,name } = values;
                    let images:any=[]
                    image.forEach((item:any)=>{
                        images.push(item.xhr.responseURL)
                    })
                    let res:any = await Ajax.addanno({ desc, content, type, name, userId: userInfo._id,image:images });
                    if (res.code ==200) {
                        history.push('/app/anno/list')
                    }
                }}
                onFinishFailed={() => {
                    showError('请填写公告信息')
                }}
                initialValues={{
                    type: 0
                }}
            >
                <ProFormText
                    width="md"
                    name="name"
                    label="公告标题"
                    placeholder="请输入公告标题"
                    rules={[
                        {
                            required: true,
                            message: '请输入公告标题!',
                        }
                    ]}
                />
                <ProFormTextArea
                    width="md"
                    name="desc"
                    label="公告描述"
                    placeholder="请输入公告描述"
                    rules={[
                        {
                            required: true,
                            message: '请输入公告描述!',
                        }
                    ]}
                />
                <ProFormTextArea
                    width="md"
                    name="content"
                    label="公告内容"
                    placeholder="请输入公告内容"
                    rules={[
                        {
                            required: true,
                            message: '请输入公告内容!',
                        }
                    ]}
                />
                <Form.Item noStyle shouldUpdate>
                    {(form) => {
                        return (
                            <ProFormSelect
                                options={annoListtype.map((item: any) => {
                                    return {
                                        label: item.text,
                                        value: item.value,
                                    }
                                })}
                                width="md"
                                name="type"
                                label={'公告类型'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择公告类型!',

                                    }
                                ]}
                            />
                        );
                    }}
                </Form.Item>
                <ProFormUploadButton
                    accept="image/*"
                    label="图片上传"
                    name="image"
                    title="上传图片"
                   
                    action={(file)=>{
                        const data = new FormData()
                        data.append('file',file)
                        return new Promise((resolve,reject)=>{ 
                             Ajax.uploadfiles(data).then( (res:any)=>{
                                let path='http://120.48.35.240:7001'+res.path.replace(/public/,'')
                                return resolve(path)
                            })
                        })
                    }}
                />
            </ProForm>
        </div>
    )
}

export default observer(AnnoAdd)
