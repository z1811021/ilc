import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Form, Tabs , DatePicker, Space, Modal, Radio, Select , Table } from 'antd';
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const dataSource = [
  {
    key: '1',
    date: '2019-09-03',
    planData: '100',
    realData: '200',
    planHour: '20',
    realHour: '16'
  },
  {
    key: '2',
    date: '2019-09-04',
    planData: '300',
    realData: '100',
    planHour: '10',
    realHour: '8'
  },
  {
    key: '3',
    date: '2019-09-05',
    planData: '100',
    realData: '200',
    planHour: '20',
    realHour: '6'
  },
  {
    key: '4',
    date: '2019-09-06',
    planData: '100',
    realData: '200',
    planHour: '20',
    realHour: '16'
  },
  {
    key: '5',
    date: '2019-09-07',
    planData: '600',
    realData: '400',
    planHour: '1',
    realHour: '2'
  },
];
const dataSource2 = [
  {
    key: '1',
    id: 'id1',
    name: 'Jorge',
    role: '测试',
    startTime: '2019-01-01',
    endTime: '2020-01-01',
    planHour: '20',
    realHour: '30'
  },
    {
    key: '2',
    id: 'id2',
    name: 'Bob',
    role: '测试',
    startTime: '2019-03-30',
    endTime: '2020-05-30',
    planHour: '20',
    realHour: '30'
  },  {
    key: '3',
    id: 'id3',
    name: 'keven',
    role: '研发',
    startTime: '2020-05-30',
    endTime: '2019-09-30',
    planHour: '20',
    realHour: '30'
  },
      {
    key: '4',
    id: 'id4',
    name: 'Young',
    role: '研发',
    startTime: '2019-05-30',
    endTime: '2019-08-30',
    planHour: '20',
    realHour: '30'
  },  {
    key: '5',
    id: 'id5',
    name: 'Raytoo',
    role: 'DBA',
    startTime: '2019-02-08',
    endTime: '2019-03-08',
    planHour: '20',
    realHour: '30'
  }
];
const columns2 = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
    {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '角色',
    dataIndex: 'role',
    key: 'role',
  },
    {
    title: '开始时间',
    dataIndex: 'startTime',
    key: 'startTime',
  },
      {
    title: '结束时间',
    dataIndex: 'endTime',
    key: 'endTime',
  },
  {
    title: '计划工时',
    dataIndex: 'planHour',
    key: 'planHour',
  },
  {
    title: '实际工时',
    dataIndex: 'realHour',
    key: 'realHour',
  },
];
const columns = [
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '计划数据量',
    dataIndex: 'planData',
    key: 'planData',
  },
  {
    title: '实际数据量',
    dataIndex: 'realData',
    key: 'realData',
  },
  {
    title: '计划工时',
    dataIndex: 'planHour',
    key: 'planHour',
  },
  {
    title: '实际工时',
    dataIndex: 'realHour',
    key: 'realHour',
  },
];
import styles from './index.less';
export default () => {
  const [loading, setLoading] = useState(true);
    function callback(key) {
    console.log(key);
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageContainer className={styles.main}>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="项目A" key="1" style={{marginTop:0}}>
          <Space style={{ marginBottom: 16 }}>
              <RangePicker defaultValue={[moment('2019-09-03', 'YYYY-MM-DD'), moment('2019-11-22', 'YYYY-MM-DD')]} />&nbsp;&nbsp;&nbsp;&nbsp;
              数据量: 2000 &nbsp;&nbsp;&nbsp;&nbsp;
              计划工时: 15天 &nbsp;&nbsp;&nbsp;&nbsp;
              PM: Steve
          </Space>
          <Table dataSource={dataSource} columns={columns} />
          <Space style={{ marginBottom: 16 }}>
              <b>项目人员</b>
          </Space>
          <Table dataSource={dataSource2} columns={columns2} />;
        </TabPane>
        <TabPane tab="项目B" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="项目C" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="项目D" key="4">
          Content of Tab Pane 4
        </TabPane>
        <TabPane tab="项目E" key="5">
          Content of Tab Pane 5
        </TabPane>
        <TabPane tab="项目F" key="6">
          Content of Tab Pane 6
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};
