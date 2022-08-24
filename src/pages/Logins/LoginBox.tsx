import { LockOutlined, MobileOutlined, UserOutlined, } from '@ant-design/icons';
import { LoginForm, ProFormCaptcha, ProFormCheckbox, ProFormText, } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { reg } from '@/utils/validate';
import { showError, showSuccess } from '@/utils/message';
import { Link, history } from 'umi';
import { Ajax } from '@/api/index';
import { useStore } from '@/mobx/context';

type LoginType = 'phone' | 'account';

export default () => {
    const formRef: any = useRef<ProFormInstance<{ username?: string; password?: string; mobile?: string; captcha?: string }>>()
    const [loginType, setLoginType] = useState<LoginType>('phone');
    const { MyInfo: { getRoleListAsync } } = useStore();
    // 页面加载判断账号是否自动登录
    useEffect(() => {
        if (localStorage.getItem('token')) {
            let token: any = localStorage.getItem('token')
            Ajax.tokenlogin({}, {}, { token }).then((res: any) => {
                if (res.code == 200) {
                    sessionStorage.setItem('token', res.token)
                    getRoleListAsync({})
                    history.push('/app')
                } else {
                    localStorage.removeItem('token')
                    showError('用户过期，请重新登录')
                }
            })
        }
    }, [])


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
        if (loginType == 'phone') {
            let res: any = await Ajax.captchalogin({ phone: value.mobile, captcha: value.captcha })
            if (res.code == 200) {
                sessionStorage.setItem('token', res.token)
                if (value.autoLogin) {
                    localStorage.setItem('token', res.token)
                }
                getRoleListAsync({})
                history.push('/app/home')
            }
        } else {
            let res: any = await Ajax.login({ username: value.username, password: value.password })
            if (res.code == 200) {
                sessionStorage.setItem('token', res.token)
                if (value.autoLogin) {
                    localStorage.setItem('token', res.token)
                }
                getRoleListAsync({})
                history.push('/app/home')
            }
        }
    }
    // 提交失败 表单 
    const onFinishFailed = () => {
        showError("请输入有效的登录信息")
    }
    return (
        <div style={{ backgroundColor: 'white' }}>
            <LoginForm
                formRef={formRef}
                logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                title="千峰教育"
                subTitle="后台管理系统"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Tabs activeKey={loginType} onChange={(activeKey) => setLoginType(activeKey as LoginType)}>
                    <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                    <Tabs.TabPane key={'phone'} tab={'手机验证码登录'} />
                </Tabs>
                {loginType === 'account' && (
                    <>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: <UserOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'用户名或手机号'}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名或手机号',
                                },
                            ]}
                        />
                        <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: <LockOutlined className={'prefixIcon'} />,
                            }}
                            placeholder={'密码'}
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
                    </>
                )}
                {loginType === 'phone' && (
                    <>
                        <ProFormText
                            fieldProps={{
                                size: 'large',
                                prefix: <MobileOutlined className={'prefixIcon'} />,
                            }}
                            name="mobile"
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
                                onGetCaptcha(formRef.current.getFieldValue('mobile'))
                            }}
                        />
                    </>
                )}
                <div
                    style={{
                        marginBottom: 24,
                    }}
                >
                    <ProFormCheckbox noStyle name="autoLogin">
                        自动登录
                    </ProFormCheckbox>
                    <Link
                        style={{
                            float: 'right',
                        }}
                        to="/findpass"
                    >
                        忘记密码
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
    );
};