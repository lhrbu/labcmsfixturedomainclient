import React, { Fragment, useEffect, useState } from 'react';
import { Form, Input, Button, Checkbox, Breadcrumb } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import md5 from 'md5';
import cookie from 'react-cookies'
import RolesService from '../Services/RolesService';
import './SignIn.css';
import { RolePayloadCacheService } from '../Services/RolePayloadCacheService';
import { Redirect, useHistory } from 'react-router-dom';
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 },
};
const _rolesService = new RolesService();
const _rolePayloadCacheService = new RolePayloadCacheService();



const SignIn: React.FC<{ OnSignIn?: () => void }> = ({ OnSignIn }) => {
    const [loginButtonLoading, setLoginButtonLoading] = useState<boolean>(false);
    const history = useHistory();
    useEffect(()=>{
        if(_rolePayloadCacheService.Get()){
            history.push("/History");
        }
    },[])


    return _rolePayloadCacheService.Get() ? <Redirect to='/' /> : (
        <Fragment>
            <div style={{ padding: '0 50px',background:'#eee',minHeight:'1.8rem',lineHeight:'1.8rem'}}>
                <Breadcrumb>
                    <Breadcrumb.Item>Website</Breadcrumb.Item>
                    <Breadcrumb.Item>SignIn</Breadcrumb.Item>
                </Breadcrumb>
            </div>

            <Form {...layout}
                size={'large'}
                style={{ marginTop: '10vh' }}
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
        </Fragment>
    );

    async function LoginAsync(values: any) {
        setLoginButtonLoading(true);
        try {
            await _rolesService.LoginAsync(values.UserId, md5(values.Password));
            if (values.Remember) {
                const rolePayloadCookie = cookie.load("RolePayload");
                _rolePayloadCacheService.Set(rolePayloadCookie);
            }
            OnSignIn?.();
        } catch (err) {
            window.alert(err);
        } finally { setLoginButtonLoading(false); }
    }
}

export default SignIn;