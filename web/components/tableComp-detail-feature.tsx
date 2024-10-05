'use client';

import { useParams, useRouter } from 'next/navigation';

import { useMemo, useState } from 'react';
// import { AppHero } from '../ui/ui-layout';
// import { TableCompUi } from './tableComp-ui';

import { ArrowLeftOutlined, ClockCircleOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, ConfigProvider, Layout, theme, Card, Row, Col, Button } from 'antd';
// import { Router } from 'next/router';

const { Header, Content, Footer } = Layout;


function DurationCard() {
  return (
    <Row gutter={16} className='mb-4'>
      <Col span={6} >
        <Card title={<div className='!text-white'> <ClockCircleOutlined/>Duration</div>} bordered={false}>

          <h1>4D12H</h1>
        </Card>
      </Col>
      <Col span={6}>
        <Card title={<div className='text-white'><UserOutlined /> Home</div>} bordered={false}>
          <h1>4D12H</h1>
        </Card>
      </Col>
      <Col span={6}>
        <Card title={<div className='text-white'  ><HomeOutlined /> Home</div>} bordered={false}>
          <h1>4D12H</h1>
        </Card>
      </Col>
      <Col span={6}>
        <Card title={<div className='text-white'  ><HomeOutlined /> Home</div>} bordered={false}>
          <h1>4D12H</h1>
        </Card>
      </Col>
    </Row>
  );
}

export default function ClusterFeature() {
  const { address } = useParams();
  const router = useRouter();
  console.log("路由参数:", address);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const gridStyle: React.CSSProperties = {
    width: '25%',
    // textAlign: 'center',
    color: '#fff',
    background: '#000'
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            itemColor: '#fff',
            lastItemColor: '#fff',
            separatorColor: '#fff',
          },
          Card: {
            colorBgContainer: 'gray',
            colorText: '#fff',
          },

        },
      }}
    >
      <Content style={{ padding: '0 48px' }} className='w-full h-full'>

        {/* <Breadcrumb style={{ margin: '16px 0', color: '#fff' }} separator=''>
          <Breadcrumb.Item>
            <Button type='link' className='text-white' icon={<ArrowLeftOutlined />} onClick={() => {
              router.back();
            }} />
           
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <span className='mx-4 text-lg'>
              Position
            </span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {address}

          </Breadcrumb.Item>
        </Breadcrumb> */}
        {/* </div> */}

        <div
          style={{
            // background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            // borderRadius: borderRadiusLG,
          }}

        >
          <div style={{ marginBottom: '16px' }}> {/* 添加 margin-bottom */}
            <DurationCard />
          </div>
          <div style={{ marginBottom: '16px' }}> {/* 添加 margin-bottom */}
            <DurationCard />
          </div>
          {/* <TableCompUi /> */}
        </div>
      </Content>
    </ConfigProvider>
  );
}
