import React,{ useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Badge,message } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import {
  LogoutOutlined, UserOutlined, SendOutlined, HistoryOutlined,
  LoginOutlined, FileSearchOutlined,HomeFilled
} from '@ant-design/icons';
import './App.css';
import SignIn from './Components/SignIn';
import CheckoutApplyHistory from './Pages/CheckoutApplyHistory';
import LoginedStateCachedService from './Services/LoginedStateCachedService';
import RolesWebAPI from './WebAPIs/RolesWebAPI';
import CheckoutApply from './Pages/CheckoutApply';
import TestFieldResponseTodo from './Pages/TestFieldResponseTodo';
import CheckoutRecordsWebAPI from './WebAPIs/CheckoutRecordsWebAPI';
import Logined from './States/Logined'
import { observer } from "mobx-react-lite";
import Home from './Pages/Home';

const { Header, Content, Footer } = Layout;
const _rolePayloadCacheService = new LoginedStateCachedService();
const _checkoutRecordsWebAPI = new CheckoutRecordsWebAPI();
const _rolesWebAPI = new RolesWebAPI();

let App = observer(()=> {
  const [todoCount,setTodoCount] = useState<number>(0);
  useEffect(() => {
    if (_rolePayloadCacheService.GetRolePayloadAndSetCookie()) { 
      Logined.SetLogin(true)
    }
    else {
      Logined.SetLogin(false)
    }
  }, []);

  useEffect(()=>{
    _checkoutRecordsWebAPI.GetCheckoutRecordsTestRoomApproverTodoCount()
        .then(count=>setTodoCount(count));
  },[]);

  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" style={{ fontSize: '16px' }}
          hidden={!Logined.Current} defaultSelectedKeys={[window.location.pathname]}>
          <Menu.Item key="/Todo">
            <Link to="/Todo">
              <Badge count={todoCount}>
                <Avatar shape='square' icon={<UserOutlined />} />
              </Badge>
            </Link>
          </Menu.Item>
          <Menu.Item key="/"><Link to='/'><HomeFilled />Home</Link></Menu.Item>
          <Menu.Item key="/Fixtures.xltm"><a href="/Fixtures.xltm" target="_blank"><FileSearchOutlined />Query Fixtures</a></Menu.Item>
          <Menu.Item key="/CheckoutRecord"><Link to='/CheckoutRecord'><SendOutlined />Checkout Apply</Link></Menu.Item>
          <Menu.Item key="/History"><Link to="/History"><HistoryOutlined />Apply History</Link></Menu.Item>
          <Menu.Item key="/SignOut" hidden={!Logined.Current} 
                onClick={async e=>{
                    await _rolesWebAPI.LogoutAsync()
                    message.warning("Sign out!")}} >
          <LogoutOutlined />Sign out</Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div className="site-layout-content">
          <Switch>
            <Route exact path='/CheckoutRecord'>
              <CheckoutApply />
            </Route>
            <Route exact path="/Todo">
              <TestFieldResponseTodo />
            </Route>
            <Route exact path="/History">
              <CheckoutApplyHistory />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
        <SignIn />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        LabCMS.EquipmentDomain ©2021 Created by Raccoon Li
        </Footer>
    </Layout>
  );
});

export default App; 
