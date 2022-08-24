import { Ajax } from '@/api'
import React, { FC, useEffect, useState, useRef } from 'react'
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { showError, showSuccess } from '@/utils/message';
import {discount} from '@/utils'
import { observer } from 'mobx-react';
import { Upload,Modal } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { PlusOutlined } from '@ant-design/icons';
type GithubIssueItem = {
    name: string
    price: number
    discount: number
    startime:string
    endtime:string
    desc:string
    time: string
    image:any
    userId: string
    _id: string
};

const GoodIndex: FC = () => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const actionRef = useRef<ActionType>();
    // 预览图片弹窗关闭
    const handleCancel = () => setPreviewVisible(false);
    // 预览图片弹窗打开
    const handlePreview = async (file: UploadFile) => {    
        setPreviewImage(file.url as string);
        setPreviewVisible(true);
        setPreviewTitle(file.url!.substring(file.url!.lastIndexOf('/') + 1));
      };
    // 表格
    const columns: ProColumns<GithubIssueItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            editable: false,
        },
        {
            title: '商品名称',
            dataIndex: 'name',
            width:90,
        },
        {
            title: '商品价格',
            dataIndex: 'price',
            sorter: true,
            search:false,
            width:100,
            render:(text,item:any)=>{
                return (
                    '¥'+item.price
                )
            }
        },
        {
            title: '折扣',
            dataIndex: 'discount',
            search: false,
            valueType: 'select',
            valueEnum:discount,
            
        },
        {
            title:'折扣开始时间',
            width:110,
            dataIndex:'startime',
            valueType: 'dateTime',
            search:false,
        },
        {
            title:'折扣结束时间',
            width:110,
            dataIndex:'endtime',
            valueType: 'dateTime',
            search:false,
        },
        {
            title:'商品描述',
            dataIndex:'desc',
            search: false,
        },
        {
            title: '图片',
            dataIndex: 'image',
            search: false,
            editable: false,
            render: (text,item,_,action) => {
                        let arr=item.image.map((item1:string)=>{
                            return {
                               url:item1,
                               uid:item1,
                            }
                        })
                        return (
                            <>
                                <div>
                                    <Upload
                                    // 上传图片
                                    action={ (file)=>{    
                                        let obj:any={}                                    
                                        const data = new FormData()
                                        data.append('file',file)
                                        return new Promise( (resolve,reject)=>{ 
                                             Ajax.uploadfiles(data).then( (res:any)=>{
                                                let path='http://120.48.35.240:7001'+res.path.replace(/public/,'')
                                                item.image.push(path.replace(/\\/g,'\/'))
                                                obj._id=item._id
                                                obj.image=item.image
                                                Ajax.updateshop(obj).then((result:any)=>{
                                                    if(result.code==200){
                                                        action?.reload()
                                                    }
                                                })
                                                
                                            })
                                        })
                                    }}
                                    listType="picture-card"
                                    fileList={arr}
                                    accept="image/*"
                                    onPreview={handlePreview}
                                    // 删除
                                    onChange={async (e)=>{
                                        let obj:any={}
                                        if(e.file.status=="removed"){
                                            item.image=item.image.filter((i:any)=>{return i!=e.file.url})
                                            obj._id=item._id
                                            obj.image=item.image
                                            let res: any = await Ajax.updateshop(obj)
                                                if (res.code == 200) {
                                                    action?.reload()
                                                }
                                        }
                                            
                                    }}
                                    >
                                            <div>
                                                <PlusOutlined />
                                                <div style={{ marginTop: 8 }}>上传图片</div>
                                            </div>
                                    </Upload>
                                    {/* 图片查看弹窗 */}
                                    <Modal width={400}  visible={previewVisible} title={previewTitle} footer={null}   onCancel={handleCancel}>
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </>
                        )
            }
        },
        {
            title: '创建时间',
            key: 'showTime',
            dataIndex: 'time',
            valueType: 'dateTime',
            width:110,
            sorter: true,
            search: false,
            editable: false,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            width:50,
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                            action?.startEditable?.(record._id);
                    }}
                >
                    编辑
                </a>,
            ],
        },
    ];

    return (
        <div>
            <div className="table">
                <ProTable<GithubIssueItem>
                    columns={columns}
                    actionRef={actionRef}
                    cardBordered
                    request={async (params = {}, sort) => {
                        let obj:any={}
                        if(sort.time=='ascend'){
                            obj.time=1
                        }else if(sort.time=='descend'){
                            obj.time=-1
                        }else if(sort.price=='ascend'){
                            obj.price=1
                        }else if(sort.price=='descend'){
                            obj.price=-1
                        }
                        let res = await Ajax.getshop({name:params.name,sort:obj}) as any
                        return {
                            data: res.result,
                            success: true,
                        }
                    }}
                    editable={{
                        type: 'single',
                        onSave: async (record, type) => {
                            let obj={
                                desc: type.desc,
                                startime:type.startime,
                                endtime:type.endtime,
                                name: type.name,
                                price: type.price,
                                _id: type._id
                            }
                            let res: any = await Ajax.updateshop(obj)
                            if (res.code == 200) {
                                showSuccess('修改成功');
                            }
                        },
                        onDelete: async (record) => {
                            let res:any=await Ajax.delshop({ _id:record})
                            if (res.code == 200) {
                                showSuccess('删除成功');
                            }
                        }

                    }}
                    columnsState={{
                        persistenceKey: 'pro-table-singe-demos',
                        persistenceType: 'sessionStorage',
                    }}
                    rowKey="_id"
                    search={{
                        labelWidth: 'auto',
                    }}
                    options={{
                        setting: {
                            listsHeight: 400,
                        },
                    }}
                    pagination={{
                        pageSize: 6,
                    }}
                    dateFormatter="string"
                    headerTitle="商品列表"
                />
            </div>
        </div>
    )
}

export default observer(GoodIndex)
