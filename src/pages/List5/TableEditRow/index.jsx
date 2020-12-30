import styles from './index.less';
import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd';
const originData = [{
  key: 1,
  project: 'A',
  activity: '标注',
  mon: 3,
  thu:2,
  wed:2.5,fri:3.1,
  tue:2,
  wed:4,
  sat:2,
  sun:0
},{
  key: 2,
  project: 'A',
  activity: '开会',
  mon: 0.5,
  thu:0,
  wed:0,fri:0,
  tue:3,
  wed:3,
  sat:4,
  sun:0
},{
  key: 3,
  project: 'A',
  activity: '培训',
  mon: 1.1,
  thu:3,
  wed:4,fri:4,
  tue:0,
  wed:0,
  sat:0,
  sun:0
},{
  key: 4,
  project: 'A',
  activity: '其他',
  mon: 3,
  thu:0,
  wed:0,fri:0,
  tue:2.3,
  wed:0,
  sat:0,
  sun:0
},{
  key: 5,
  project: '  B',
  activity: '标注',
  mon: 3,
  thu:2.5,
  wed:3,fri:3,
  tue:4,
  wed:3,
  sat:0,
  sun:0
},{
  key: 6,
  project: 'B',
  activity: '开会',
  mon: 1.5,
  thu:0,
  wed:3,fri:4,
  tue:5,
  wed:0,
  sat:2.5,
  sun:0
},{
  key: 7,
  project: 'B',
  activity: '培训',
  mon: 0.5,
  thu:1,
  wed:3,fri:2,
  tue:3,
  wed:1.5,
  sat:0,
  sun:0
},{
  key: 8,
  project: 'B',
  activity: '其他',
  mon: 0,
  thu:0,
  wed:0,fri:0,
  tue:0,
  wed:3.5,
  sat:0,
  sun:0
}];


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const EditableTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: '项目',
      dataIndex: 'project',
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if ((index+4)%4 === 0) {
          obj.props.rowSpan = 4;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj;
      },
      editable: true,
    },
    {
      title: '活动',
      dataIndex: 'activity',
      editable: false,
      width: '20%',
    },
    {
      title: '周一',
      dataIndex: 'mon',
      editable: true,
    }, {
      title: '周二',
      dataIndex: 'tue',
      editable: true,
    }, {
      title: '周三',
      dataIndex: 'wed',
      editable: true,
    }, {
      title: '周四',
      dataIndex: 'thu',
      editable: true,
    }, {
      title: '周五',
      dataIndex: 'fri',
      editable: true,
    }, {
      title: '周六',
      dataIndex: 'sat',
      editable: true,
    }, {
      title: '周天',
      dataIndex: 'sun',
      editable: true,
    },
    {
      title: '编辑',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div>
            <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            编辑 / 
          </a>
          <a> 删除</a>
          </div>
          
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-edit-row">
        <h1 style={{justifyContent: 'space-between', display: 'flex', margin: '5px 20px 5px 0'}}><b>张三</b></h1>
        <div style={{justifyContent: 'space-between', display: 'flex', margin: '5px 20px 5px 0'}}>
        <Button type="primary" style={{ marginBottom: 16 }}>
          添加项目
        </Button>
        <Button type="primary"  style={{ marginBottom: 16 }}>
          提交
        </Button>
        </div>
      <EditableTable />
      <h1 style={{justifyContent: 'flex-end', display: 'flex', margin: '5px 20px 5px 0', color: '#1890ff'}}><b>总计: 46 H</b></h1>
    </div>
  </div>
);
