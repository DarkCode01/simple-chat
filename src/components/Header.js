import React from 'react';
import { Layout, Typography } from 'antd';

export const Header = ({ current }) => (
  <Layout.Header className="site-layout-background" style={{ padding: 0 }} >
    <Typography.Title style={{ color: 'white' }}>
      { current }
    </Typography.Title>
  </Layout.Header>
)