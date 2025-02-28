import React from "react";
import { Link } from "react-router-dom";
import { Menu, Layout } from "antd";

import "./index.scss";

const { SubMenu } = Menu;

export default function Sider({ location, paths }) {

  return (
    <Layout.Sider className="sider">
      <Menu mode="inline" theme="light" className="menu" defaultSelectedKeys={[location?.pathname]}>
        {paths.map((path) => {
          // if (path.slug === "." || path.slug === "..") return null;

          console.log('path', path)
          return (
            <Menu.Item key={path.route} >
              <Link data-menu-label={path.label} to={path.route}>
                {path.slug}
                {path.label}
              </Link>
            </Menu.Item>
          );
        })}

        <SubMenu
          key="sub3"
          title={
            <span>
              <span>Admin</span>
            </span>
          }
        >
          <Menu.Item key="user-types">
            <Link to="/">User Types</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </Layout.Sider >
  );
}
