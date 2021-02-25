import React, { useEffect, useState } from 'react';
import { Layout, Menu, Avatar, Badge } from 'antd';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import {
  HomeFilled, LogoutOutlined, ProfileFilled, UserOutlined, SendOutlined, HistoryOutlined,
  LoginOutlined, CodeFilled, SaveFilled, DatabaseFilled, BarChartOutlined
} from '@ant-design/icons';
import './App.css';
import SignIn from './Pages/SignIn';
import ApplyHistory from './Pages/ApplyHistory';
import RolePayloadCacheService from './Services/RolePayloadCacheService';
import RolesService from './Services/RolesService';
import CheckoutApply from './Pages/CheckoutApply';
import CheckoutTestRoomApproverTodo from './Components/CheckoutTestRoomApproverTodo';
import Todo from './Pages/Todo';
import CheckoutRecordsWebAPI from './WebAPIs/CheckoutRecordsWebAPI';

const { Header, Content, Footer } = Layout;
const _rolePayloadCacheService = new RolePayloadCacheService();


const _checkoutRecordsWebAPI = new CheckoutRecordsWebAPI();

function App(props: any) {
  const [logined, setLogined] = useState<boolean>(false);
  const [todoCount,setTodoCount] = useState<number>(0);
  const history = useHistory();
  useEffect(() => {
    if (_rolePayloadCacheService.Get()) { 
      setLogined(true); 
    }
    else {
      history.push("/SignIn");
    }
  }, []);

  useEffect(()=>{
    // const id = setInterval(()=>{
    //   _checkoutRecordsWebAPI.GetCheckoutRecordsTestRoomApproverTodoCount()
    //     .then(count=>setTodoCount(count));
    // },2400);
    // return ()=>clearInterval(id);
    _checkoutRecordsWebAPI.GetCheckoutRecordsTestRoomApproverTodoCount()
        .then(count=>setTodoCount(count));
  },[]);

  return (
    <Layout className="layout">
      <Header>
        {
          logined ? (
            <Menu theme="dark" mode="horizontal" style={{ fontSize: '16px' }}
              hidden={!logined} >
              <Menu.Item  key="/Todo">
                <Link to="/Todo">
                  <Badge count={todoCount}>
                    <Avatar shape='square' icon={<UserOutlined />} />
                  </Badge>
                </Link>
              </Menu.Item>
              <Menu.Item key="/SignIn" hidden={logined}><Link to='/SignIn'><LoginOutlined />Sign In</Link></Menu.Item>

              <Menu.Item key="/CheckoutRecord"><Link to='/CheckoutRecord'><SendOutlined />Checkout Apply</Link></Menu.Item>
              <Menu.Item key="/History"><Link to="/History"><HistoryOutlined />Apply History</Link></Menu.Item>
              <Menu.Item key="/SignOut" hidden={!logined} onClick={OnSignoutAsync} ><LogoutOutlined />Sign out</Menu.Item>
            </Menu>):(
            <Menu theme="dark" mode="horizontal" style={{ fontSize: '18px' }}>
              <Menu.Item><LoginOutlined />Please Login</Menu.Item>
            </Menu>)
        }
      </Header>
      <Content>
        <div className="site-layout-content">
          <Switch>
            <Route exact path='/CheckoutRecord'>
              <CheckoutApply />
            </Route>
            <Route exact path="/CheckoutRecordTodo">
              <CheckoutTestRoomApproverTodo />
            </Route>
            <Route exact path="/Todo">
              <Todo />
            </Route>
            <Route exact path="/History">
              <ApplyHistory />
            </Route>
            <Route path='/'>
              <SignIn OnSignIn={OnSignIn} />
            </Route>
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        LabCMS.EquipmentDomain ©2021 Created by Raccoon Li
        </Footer>
    </Layout>
  );

  function OnSignIn() {
    window.alert("Sign in successfully, back to Home page now!");
    setLogined(true);
    history.push('/History');
  }

  async function OnSignoutAsync() {
    const rolesService = new RolesService();
    await rolesService.LogoutAsync();
    setLogined(false);
    window.alert("Sign out, back to sign in page");
    history.push('/SignIn');
  }
}

export default App; 
