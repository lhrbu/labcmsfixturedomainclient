import React, { Fragment, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Breadcrumb,Modal,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import md5 from 'md5';
import cookie from 'react-cookies'
import RolesWebAPI from '../WebAPIs/RolesWebAPI';
import './SignIn.css';
import LoginedStateCachedService from '../Services/LoginedStateCachedService';
import Logined from '../States/Logined';
const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 12 },
};
const _rolesWebAPI = new RolesWebAPI();
const _rolePayloadCacheService = new LoginedStateCachedService();



function SignIn () {
    const [loginButtonLoading, setLoginButtonLoading] = useState<boolean>(false);
    return (
        !Logined.Current?
        <Modal visible={!Logined.Current} title="Log in" closable={false} footer={null}>
            <Form {...layout}
                size={'large'}
                style={{ marginTop: '32px' }}
                name="SignInForm"
                initialValues={{ Remember: true }}
                onFinish={LoginAsync}>
                <Form.Item
                    label="User Id"
                    name="UserId"
                    rules={[{ required: true, message: 'Please input your user id!' }]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="User Id" />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Form.Item name="Remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item><a className="login-form-forgot" href="/">Forgot password</a>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        loading={loginButtonLoading}>
                        Log In
                </Button>
                Or <a href="/">register now!</a>
                </Form.Item>
            </Form>
        </Modal>:<div></div>
    );

    async function LoginAsync(values: any) {
        setLoginButtonLoading(true);
        try {
            await _rolesWebAPI.LoginAsync(values.UserId, md5(values.Password));
            if (values.Remember) {
                const rolePayloadCookie = cookie.load("RolePayload");
                _rolePayloadCacheService.SetRolePayload(rolePayloadCookie);
            }
            _rolePayloadCacheService.SetUserId(values.UserId)
        } catch (err) {
            window.alert(err);
        } finally { 
            message.success("Log in!")
            setLoginButtonLoading(false); 
        }
    }
}

export default SignIn;