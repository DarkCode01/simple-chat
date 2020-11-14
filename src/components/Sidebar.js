import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import { UserOutlined, GlobalOutlined } from '@ant-design/icons';

export const Sidebar = ({
  current, setCurrent, userId, users
}) => (
  <Layout.Sider
    collapsible
    collapsed={false}
    onCollapse={() => {}}
  >
    <Typography.Title type="success">Online</Typography.Title>

    <Menu theme="dark" defaultSelectedKeys={[current]} mode="inline">
      <Menu.Item
        key="general"
        icon={<GlobalOutlined />}
        onClick={setCurrent('general')}
      >
        General
      </Menu.Item>

      { users.map(user => (
          <Menu.Item
            key={user.id}
            icon={<UserOutlined />}
            disabled={userId === user?.id}
            onClick={setCurrent(user?.info?.name)}
          >
            { userId === user.id ? 'me' : user?.info?.name }
          </Menu.Item>
        ))
      }
    </Menu>
  </Layout.Sider>
)