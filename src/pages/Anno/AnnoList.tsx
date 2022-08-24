
import { Ajax } from '@/api'
import React, { FC, useEffect, useState, useRef } from 'react'
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useStore } from '@/mobx/context'
import { showError, showSuccess } from '@/utils/message';
import {annoListtype} from '@/utils'
import { observer } from 'mobx-react';
import { Image,Tag } from 'antd';
type GithubIssueItem = {
    url: string;
    name: string
    type: number
    desc: string
    content: string
    time: string
    image:any
    userId: string
    __v: number
    _id: string
};

const AnnoList: FC = () => {
    const { MyInfo: { userInfo, roleList } } = useStore();
    const actionRef = useRef<ActionType>();
    
    
    const columns: ProColumns<GithubIssueItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            editable: false,
        },
        {
            title: '标题',
            dataIndex: 'name',
            copyable: true,
        },
        {
            title: '描述',
            dataIndex: 'desc',
            copyable: true,
        },
        {
            title: '内容',
            dataIndex: 'content',
            search: false,
        },
        {
            title: '类型',
            dataIndex: 'type',
            filters: true,
            onFilter: true,
            valueType: 'select',
            search: false,
            valueEnum: () => {
                return {...annoListtype}
            },
            render:(text,item:any) => {
                return (
                    <Tag color={annoListtype.find((v: any) => v.value == item.type).color}>
                    {annoListtype.find((v: any) => v.value == item.type).text}
                    </Tag>
                  )
            }
        },
        {
            title: '图片',
            dataIndex: 'image',
            search: false,
            editable: false,
            render: (text,item) => {
                return (
                    item?.image.map((item1:string)=>{
                        return (
                            <Image key={item1} src={item1} width={50} height={60} preview={{src:item1}}/>
                        )
                    })
                  )
            }
        },
        {
            title: '创建时间',
            key: 'showTime',
            dataIndex: 'time',
            valueType: 'dateTime',
            sorter: true,
            hideInSearch: true,
            editable: false,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
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
                        let a
                        if (sort.time == 'descend') {
                            a = -1
                        } else if (sort.time == 'ascend') {
                            a = 1
                        } else {
                            a = 0
                        }
                        let res = await Ajax.getanno({
                            name: params.name,
                            desc: params.desc,
                            sort: a
                        }) as any
                        return {
                            data: res.result,
                            success: true,
                        }
                    }}
                    editable={{
                        type: 'single',
                        onSave: async (record, type) => {
                            let obj = {
                                _id: type._id,
                                name: type.name,
                                type: type.type,
                                desc: type.desc,
                                content:type.content,
                            }
                            let res: any = await Ajax.updateanno(obj)
                            if (res.code == 200) {
                                showSuccess('修改成功');
                            }
                        },
                        onDelete: async (record) => {
                            let res: any = await Ajax.delanno({ _id: record })
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
                        pageSize: 5,
                    }}
                    dateFormatter="string"
                    headerTitle="公告列表"
                />
            </div>
        </div>
    )
}

export default observer(AnnoList)

