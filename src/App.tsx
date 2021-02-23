import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu,Avatar, Badge } from 'antd';
import { BrowserRouter, Link, Route, Switch,useHistory } from 'react-router-dom';
import
  {
    HomeFilled, LogoutOutlined, ProfileFilled,UserOutlined,SendOutlined,HistoryOutlined,
    LoginOutlined, CodeFilled, SaveFilled, DatabaseFilled, BarChartOutlined
  } from '@ant-design/icons';
  import { Typography } from 'antd';
import './App.css';
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import { RolePayloadCacheService } from './Services/RolePayloadCacheService';
import RolesService from './Services/RolesService';
import CheckoutRecord from './Pages/CheckoutRecord';
import CheckoutRecordTodo from './Components/CheckoutRecordTodo';
import CheckinRecordTodo from './Components/CheckinRecordTodo';
import Todo from './Pages/Todo';
import CheckinRecord from './Pages/CheckinRecord';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const _rolePayloadCacheService = new RolePayloadCacheService();



function App(props:any) {
  const [logined,setLogined] = useState<boolean>(false);
  const history = useHistory();
  useEffect(()=>{
    if(_rolePayloadCacheService.Get())
    { setLogined(true);}
    else{
      history.push("/SignIn");
    }
  },[]);

  return (
    <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal"  style={{ fontSize: '16px' }}
            hidden = {!logined}
            selectedKeys={[]}>
            <Menu.Item style={{marginRight:'0.5rem'}} key="/Todo">
              <Link to="/Todo">
              <Badge count={1}>
                <Avatar shape='square' icon={<UserOutlined />}/>  
              </Badge>
              </Link>
            </Menu.Item>
            <Menu.Item key="/SignIn" hidden={logined}><Link to='/SignIn'><LoginOutlined />Sign In</Link></Menu.Item>
            <Menu.Item key ="/SignOut" hidden={!logined} onClick={OnSignoutAsync} ><LogoutOutlined />Sign out</Menu.Item>
            <Menu.Item key="/CheckoutRecord"><Link to='/CheckoutRecord'><SendOutlined />Checkout</Link></Menu.Item>
            <Menu.Item key="/CheckinRecord"><Link to='/CheckinRecord'><SendOutlined rotate={180}/>Checkin</Link></Menu.Item>
            <Menu.Item key="/History"><Link to="/History"><HistoryOutlined />History</Link></Menu.Item>
          </Menu>
          <Title level={3}
            style={{color:"white",textAlign:"center",margin:"0.5rem auto",
              display:logined?"none":"block"}}
            >Please Login</Title>
        </Header>
        <Content>
          <div className="site-layout-content">
            <Switch>
              
              <Route exact path='/CheckoutRecord'>
                <CheckoutRecord />
              </Route>
              <Route exact path='/CheckinRecord'>
                <CheckinRecord />
              </Route>
              <Route exact path="/CheckoutRecordTodo">
                <CheckoutRecordTodo />
              </Route>
              <Route exact path="/CheckinRecordTodo">
                <CheckinRecordTodo />
              </Route>
              <Route exact path="/Todo">
                <Todo />
              </Route>
              <Route path='/'>
                <SignIn OnSignIn={OnSignIn}/>
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          LabCMS.EquipmentDomain ©2021 Created by Raccoon Li
        </Footer>
    </Layout>
  );

  function OnSignIn()
  {
    window.alert("Sign in successfully, back to Home page now!");
    setLogined(true);
    history.push('/Todo');
  }

  async function OnSignoutAsync()
  {
    const rolesService = new RolesService();
    await rolesService.LogoutAsync();
    setLogined(false);
    window.alert("Sign out, back to sign in page");
    history.push('/SignIn');
  }
}

export default App;
