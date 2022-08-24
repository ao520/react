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
    // 页面加载判断账号是否自动登录


    // 获取手机验证码
    const onGetCaptcha = async (phone: string) => {
        let res: any = await Ajax.sendcaptcha({ phone })
        if (res.code == 200) {
            showSuccess("验证码发送成功")
        } else {
            showError(res.msg)
        }
    }
    // 提交成功 表单
    const onFinish = async (value: any) => {
        let res:any=await Ajax.checkcaptcha(value)
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
                                  找回密码
                                </Button>,
                              ];
                            },
                          }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <Tabs>
                            <Tabs.TabPane tab={'找回密码'} />
                        </Tabs>
                        <>
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
                            <ProFormCaptcha
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                }}
                                placeholder={'请输入验证码'}
                                captchaTextRender={(timing, count) => {
                                    if (timing) {
                                        return `${count} ${'获取验证码'}`;
                                    }
                                    return '获取验证码';
                                }}
                                name="captcha"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入验证码！',
                                    },
                                    {
                                        pattern: reg.code,
                                        message: '验证码格式错误(4位)',
                                    }
                                ]}
                                // 发送验证码
                                onGetCaptcha={async () => {
                                    onGetCaptcha(formRef.current.getFieldValue('phone'))
                                }}
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
                                to="/register"
                            >
                                注册账号
                            </Link>
                        </div>
                    </LoginForm>
                </div>
            </div>
        </div>
    );
};

export default FindPass