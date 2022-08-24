
import { Ajax } from '@/api'
import React, { FC, useEffect, useState, useRef } from 'react'
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useStore } from '@/mobx/context'
import { showError, showSuccess } from '@/utils/message';
import { observer } from 'mobx-react';
import {Tag} from 'antd'
type GithubIssueItem = {
    url: string;
    avatar: string;
    password: string
    phone: string
    role: number
    time: string
    username: string
    __v: number
    _id: string
};

const List: FC = () => {
    const { MyInfo: { userInfo, roleList } } = useStore();
    const actionRef = useRef<ActionType>();
    const [dataSource, setDataSource] = useState<GithubIssueItem[]>([]);
    
    
    const columns: ProColumns<GithubIssueItem>[] = [
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            editable: false,
        },
        {
            title: '用户名',
            dataIndex: 'username',
            copyable: true,
            editable: false,
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            copyable: true,
            editable: false,
        },
        {
            title: '密码',
            dataIndex: 'password',
            search: false,
            editable: false,
        },
        {
            title: '权限',
            dataIndex: 'role',
            filters: true,
            onFilter: true,
            valueType: 'select',
            search: false,
            valueEnum: () => {
                let arr = JSON.parse(JSON.stringify(roleList))
                for (let i in arr) {
                    if (arr[i].value >= userInfo?.role) {
                        arr[i].disabled = true
                    }
                }
                return arr
            },
            render:(text,item:any) => {
                return (
                    <Tag color={roleList.find((v: any) => v.value == item.role).color}>
                    {roleList.find((v: any) => v.value == item.role).text}
                    </Tag>
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
                        if (record.role < userInfo.role) {
                            action?.startEditable?.(record._id);
                        } else {
                            showError('你的权限不足');
                        }
                    }}
                >
                    编辑
                </a>,
                <a key="delete"
                    onClick={() => {
                        if (record.role < userInfo.role) {
                            Ajax.deluser({ _id: record._id }).then((res: any) => {
                                if (res.code == 200) {
                                    action?.reload()
                                }
                            })
                        } else {
                            showError('你的权限不足');
                        }
                    }}
                >
                    删除
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
                        let res = await Ajax.getuserlist({
                            keyword: params.username,
                            phone: params.phone,
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
                                username: type.username,
                                phone: type.phone,
                                password: type.password,
                                role: type.role
                            }
                            let res: any = await Ajax.updateuser(obj)
                            if (res.code == 200) {
                                showSuccess('修改成功');
                            }
                        },
                        onDelete: async (record) => {
                            let res: any = await Ajax.deluser({ _id: record })
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
                    headerTitle="用户列表"
                />
            </div>
        </div>
    )
}

export default observer(List)
