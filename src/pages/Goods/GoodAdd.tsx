import MyTitle from '@/components/MyTitle'
import type { RangePickerProps } from 'antd/es/date-picker';
import moment from 'moment';
import React, { FC, useState } from 'react'
import { ProForm, ProFormDateTimeRangePicker , ProFormMoney, ProFormText, ProFormUploadButton, ProFormTextArea,ProFormSelect, } from '@ant-design/pro-components';
import { observer } from 'mobx-react';
import { useStore } from '@/mobx/context';
import {  discount } from '@/utils'
import { showError, showSuccess } from '@/utils/message';
import { Ajax } from '@/api';
import { history } from 'umi';

const GoodAdd: FC = () => {
    const { MyInfo: { userInfo } } = useStore()
    return (
        <div>
            <MyTitle level={5} title="添加商品"></MyTitle>
            <ProForm
                onFinish={async (values) => {
                    let image:any=[]
                    values.userId=userInfo._id
                    if(!values.discount&&values.discount!=0){
                        values.dateTimeRange=[]
                    }else{
                        values.startime=new Date(values.dateTimeRange[0])
                        values.endtime=new Date((values.dateTimeRange[1]))
                    }
                    values.image?.forEach((item:any)=>{
                        image.push(item.xhr.responseURL)
                    })
                    values.image=image
                    Ajax.addshop(values).then((res:any)=>{
                        if(res.code==200){
                            history.push('/app/good/index')
                        }
                    })
                }}
                onFinishFailed={() => {
                    showError('请填写商品信息')
                }}
                initialValues={{
                    dateTimeRange: [Date.now(), Date.now() + 1000 * 60 * 60 * 24],
                }}
            >
                <ProFormText
                    width="md"
                    name="name"
                    label="商品名称"
                    placeholder="请输入商品名称"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品名称!',
                        }
                    ]}
                />
                <ProFormMoney
                    width='md'
                    label="商品价格"
                    name="price"
                    locale="zh-CN"
                    min='1'
                    rules={[
                        {
                            required: true,
                            message: '请输入商品价格!',
                        },
                        
                    ]}
                 />
                <ProFormSelect
                    width="md"
                    name="discount"
                    label='折扣'
                    options={[...discount]}
                />
                <ProFormDateTimeRangePicker
                    width="md"
                    name="dateTimeRange" 
                    label="折扣开始结束日期" 
                 />
                <ProFormTextArea
                    width="md"
                    name="desc"
                    label="商品描述"
                    placeholder="请输入商品描述"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品描述!',
                        }
                    ]}
                />
                
                <ProFormUploadButton
                    label="图片上传"
                    name="image"
                    title="商品图片上传"
                    accept="image/*"
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

export default observer(GoodAdd)
