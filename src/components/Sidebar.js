import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { UserOutlined, GlobalOutlined } from '@ant-design/icons';

export const Sidebar = ({ users }) => (
  <Layout.Sider
    collapsible
    collapsed={false}
    onCollapse={() => {}}
    defaultOpenKeys={['general']}
  >
    <Typography.Title type="success">Online</Typography.Title>

    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="general" icon={<GlobalOutlined />}>
        General
      </Menu.Item>

      { users.map(user => (
          <Menu.Item key={user} icon={<UserOutlined />}>
            { user }
          </Menu.Item>
        ))
      }
    </Menu>
  </Layout.Sider>
)