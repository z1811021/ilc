import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, message, Input, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { useIntl, FormattedMessage } from 'umi';
import { queryRule, updateRule, addRule, removeRule } from './service';
import './index.less'
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  const columns = [
    {
      title: (
        <FormattedMessage
          id="pages.searchTable.porojectId"
          defaultMessage="编号"
        />
      ),
      dataIndex: 'porojectId',
      tip: '工号是唯一的 key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.searchTable.porojectName" defaultMessage="名称" />,
      dataIndex: 'porojectName',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.searchTable.pm" defaultMessage="pm" />,
      dataIndex: 'pm',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.searchTable.requireProgram" defaultMessage="需求方" />,
      dataIndex: 'requireProgram',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.searchTable.bussinessLine" defaultMessage="业务线" />,
      dataIndex: 'bussinessLine',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.searchTable.totalAccount" defaultMessage="总额" />,
      dataIndex: 'totalAccount',
      valueType: 'text',
    },
    {
      title: <FormattedMessage id="pages.searchTable.totalData" defaultMessage="总数据量" />,
      dataIndex: 'totalData',
      valueType: 'text',
    },
    {
      title: '计划开始时间',
      dataIndex: 'startAt',
      sorter: true,
      valueType: 'date',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '计划结束时间',
      dataIndex: 'endAt',
      sorter: true,
      valueType: 'date',
      hideInForm: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '成本',
      dataIndex: 'cost',
      hideInForm: true,
      valueEnum: {
        0: {
          status: 'Success',
        },
        1: {
          status: 'Processing',
        },
        2: {
          status: 'Warning',
        },
        3: {
          status: 'Error',
        },
      },
    },
    {
      title: '进度',
      dataIndex: 'process',
      hideInForm: true,
      valueEnum: {
        0: {
          status: 'Success',
        },
        1: {
          status: 'Processing',
        },
        2: {
          status: 'Warning',
        },
        3: {
          status: 'Error',
        },
      },
    },
    {
      title: '风险',
      dataIndex: 'risk',
      hideInForm: true,
      valueEnum: {
        0: {
          status: 'Success',
        },
        1: {
          status: 'Processing',
        },
        2: {
          status: 'Warning',
        },
        3: {
          status: 'Error',
        },
      },
    },
    {
      title: '范围',
      dataIndex: 'range',
      hideInForm: true,
      valueEnum: {
        0: {
          status: 'Success',
        },
        1: {
          status: 'Processing',
        },
        2: {
          status: 'Warning',
        },
        3: {
          status: 'Error',
        },
      },
    },
    {
      title: '干系人',
      dataIndex: 'ganxiren',
      hideInForm: true,
      valueEnum: {
        0: {
          status: 'Success',
        },
        1: {
          status: 'Processing',
        },
        2: {
          status: 'Warning',
        },
        3: {
          status: 'Error',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            详情
          </a>
        </>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
        <ProTable
          onSubmit={async (value) => {
            const success = await handleAdd(value);

            if (success) {
              handleModalVisible(false);

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          rowKey="key"
          type="form"
          columns={columns}
        />
      </CreateForm>
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);

            if (success) {
              handleUpdateModalVisible(false);
              setStepFormValues({});

              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
