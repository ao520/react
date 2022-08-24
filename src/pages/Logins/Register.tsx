import { LockOutlined, MobileOutlined, UserOutlined, } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText, } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Tabs,Button } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { reg } from '@/utils/validate';
import { showError, showSuccess } from '@/utils/message';
import { Link, history } from 'umi';
import { Ajax } from '@/api/index';


const FindPass = () => {
    const vsrc = "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/3760b2031ff41ca0bd80bc7a8a13f7bb_preview.mp4"
    const formRef: any = useRef<ProFormInstance<{ password?: string; phone?: string; captcha?: string }>>()



    // 提交成功 表单
    const onFinish = async (value: any) => {
        let res:any=await Ajax.register(value)
        if(res.code==200){
            history.replace('/login')
        }
    }
    // 提交失败 表单 
    const onFinishFailed = () => {
        showError("请输入有效的登录信息")
    }
    return (
        <div className='lgbox'>
            <video
                className='myvideo'
                src={vsrc}
                autoPlay
                muted
                loop
            >
            </video>
            <div className="login-box">
                <div style={{ backgroundColor: 'white' }}>
                    <LoginForm
                        formRef={formRef}
                        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                        title="千峰教育"
                        subTitle="后台管理系统"
                        submitter={{
                            render: (props, doms) => {
                              return [
                                <Button block type="primary" htmlType="submit" key="edit">
                                  注册账号
                                </Button>,
                              ];
                            },
                          }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Tabs>
                            <Tabs.TabPane tab={'注册账号'} />
                        </Tabs>
                        <>
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'} />,
                                }}
                                name="username"
                                placeholder={'用户名'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名！',
                                    },
                                ]}
                            />
                            <ProFormText
                                fieldProps={{
                                    size: 'large',
                                    prefix: <MobileOutlined className={'prefixIcon'} />,
                                }}
                                name="phone"
                                placeholder={'手机号'}
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
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                }}
                                placeholder={'请输入新密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                    {
                                        pattern: reg.pwd,
                                        message: '密码格式错误(6-20位数字加字母)',
                                    }
                                ]}
                            />
                            <ProFormText.Password
                                name="dbpass"
                                dependencies={['password']}
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                }}
                                placeholder={'请再次输入密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请再次输入密码',
                                    },
                                    {
                                        pattern: reg.pwd,
                                        message: '密码格式错误(6-20位数字加字母)',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('两次输入的密码不一致!'));
                                        },
                                    }),
                                ]}
                                
                            />
                        </>
                        <div
                            style={{
                                marginBottom: 24,
                            }}
                        >
                            <Link to="/login">
                                登录
                            </Link>
                            <Link
                                style={{
                                    float: 'right',
                                    marginRight: '10px',
                                }}
                                to="/findpass"
                            >
                                找回密码
                            </Link>
                        </div>
                    </LoginForm>
                </div>
            </div>
        </div>
    );
};

export default FindPass