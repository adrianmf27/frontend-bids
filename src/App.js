/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-comment-textnodes */
import 'antd/dist/reset.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import CreateUserComp from './Components/CreateUserComp';
import LoginUserComp from './Components/LoginUserComp';
import ItemsComp from './Components/ItemsComp';
import CreateItemComp from './Components/CreateItemComp';
import MyItemsComp from './Components/MyItemsComp';
import DetailsItemComp from './Components/DetailsItemComp';
import EditItemComp from './Components/EditItemComp';
import React, { useEffect, useState } from 'react';
import { backendUrl } from './Globals';
import ListBidsComp from './Components/ListBidsComp';
import { Layout, Menu } from 'antd';
import { Content, Footer, Header } from 'antd/es/layout/layout';

function App() {
  let [notif, setNotif] = useState("")
  let [login, setLogin] = useState(false)

  let navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem("apiKey")!= null){
      setLogin(true)
    }
  }, [])  

  let createNotif = (msg) => {
    setNotif(msg)
    setTimeout(() => {setNotif("")}, 3000)
  }

  let disconnect = async () => {
    await fetch(backendUrl + "/user/disconnect?apiKey=" + localStorage.getItem("apiKey"))
    localStorage.removeItem("apiKey")
    setLogin(false)
    navigate("/login")
  }

  return (
    <Layout className='layout' style={{minHeight: '100vh'}}>
      <Header>
        {!login && (
          <Menu mode='horizontal' theme='dark' items={[
            {key: "menuRegister", label: <Link to="/register">Register</Link>},
            {key: "menuLogin", label: <Link to="/login">Log In</Link>}
          ]}></Menu>)}

        {login && (
        <Menu mode='horizontal' theme='dark' items= {[
          {key: "menuItems", label: <Link to="/items">Items</Link>},
          {key: "menuMyItems", label: <Link to="/myItems">My Items</Link>},
          {key: "menuCreateItem", label: <Link to="/createItem">Create Item</Link>},          
          {key: "menuDisconnect", label: <Link to="#" onClick={disconnect}>Disconnect</Link>}]}>
        </Menu>)}
      </Header>

      <Content>
        <Routes>
          <Route path="/register" element={<CreateUserComp createNotification={createNotif}/>}/>
          <Route path="/login" element={<LoginUserComp setLogin={setLogin}/>}/>
          <Route path="/" element={<p>Index of website</p>}/>
          <Route path="/items" element={<ItemsComp/>}/>
          <Route path="/createItem" element={<CreateItemComp createNotification={createNotif}/>}/>
          <Route path="/myItems" element={<MyItemsComp createNotification={createNotif}/>}/>
          <Route path="/item/:itemId" element={<DetailsItemComp createNotification={createNotif}/>}/>
          <Route path="/item/edit/:itemId" element={<EditItemComp createNotification={createNotif}/>}/>
          <Route path="/item/:itemId/bids" element={<ListBidsComp createNotification={createNotif}/>}/>
        </Routes>
      </Content>

      <Footer style={{textAlign: 'center'}}> My website </Footer>
    </Layout>
  );
}

export default App;
