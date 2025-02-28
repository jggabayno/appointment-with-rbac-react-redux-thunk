import React, { memo } from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import { useSelector } from "react-redux"

import paths from '../paths'



import { Layout } from "antd"
import './App.scss'
import 'antd/dist/antd.css'

import Header from "./shared/Header";
import Sider from "./shared/Sider";

import Login from "./Login";
import NotFound from "./shared/NotFound";

export default memo(withRouter(function App(props) {

  const auth = useSelector(state => state.auth)
  const { isLoggedIn } = auth;

  return !isLoggedIn ? (
    <Login />
  ) : (
    <Layout className="layout">
      <Header {...props} paths={paths} />
      <Layout.Content>
        <Layout className="sub-layout">
          <Sider {...props} paths={paths} />
          <Layout.Content className="fade-in">
            <Switch>
              {window.scrollTo(0, 0)}
              {paths.map((path) => (
                <Route
                  key={path.slug}
                  exact={path.exact}
                  path={path.route}
                  component={path.component}
                />
              ))}
              <Route component={NotFound} />
            </Switch>
          </Layout.Content>
        </Layout>
      </Layout.Content>
      {/* <Footer {...this.props} paths={paths} /> */}
    </Layout>
  );
}));
