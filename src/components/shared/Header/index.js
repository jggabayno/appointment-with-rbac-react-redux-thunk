import React from "react";
import { useSelector, useDispatch } from 'react-redux'

import { logout } from '../../../actions'
import makeStorage from '../../../utilities/storage';

import { Menu, Layout } from "antd";
import "./index.scss";

export default function Header({ location, paths }) {

  const dispatchLogout = useDispatch()

  const onLogout = () => {
    dispatchLogout(logout())
    makeStorage().clearSession()
  }

  const auth = useSelector(state => state.auth)

  return (
    <Layout.Header className="header">
      Logo
      <Menu mode="horizontal" className="menu">
        <Menu.Item>{auth?.loggedData?.user?.name}</Menu.Item>
        <Menu.Item onClick={onLogout}>Logout</Menu.Item>
      </Menu>
    </Layout.Header>
  );
}
