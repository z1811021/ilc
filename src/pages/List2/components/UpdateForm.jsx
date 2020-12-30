import React, { useState } from 'react';
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


const UpdateForm = (props) => {
  const [formVals, setFormVals] = useState({
    name: props.values.name,
    desc: props.values.desc,
    key: props.values.key,
    target: '0',
    template: '0',
    type: '1',
    time: '',
    frequency: 'month',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const {
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
  } = props;

  function callback(key) {
    console.log(key);
  }
  
  return (
    <Modal
      width={640}
      bodyStyle={{
        padding: '32px 40px 48px',
      }}
      destroyOnClose
      title="详情"
      visible={updateModalVisible}
      onCancel={() => handleUpdateModalVisible()}
      onOk={() => handleUpdateModalVisible()}
    >
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="项目A" key="1">
        <Space style={{ marginBottom: 16 }}>
            <RangePicker defaultValue={[moment('2019-09-03', 'YYYY-MM-DD'), moment('2019-11-22', 'YYYY-MM-DD')]} />&nbsp;&nbsp;&nbsp;&nbsp;
            数据量: 2000 &nbsp;&nbsp;&nbsp;&nbsp;
            计划工时: 15天
        </Space>
        <Table dataSource={dataSource} columns={columns} />;
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
    </Modal>
  );
};

export default UpdateForm;
