import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { loadAccesses, storeAccess, updateAccess, destroyAccess, loadRoleAccesses } from '../../actions'

import makeHelpers from '../../utilities/helpers'

import "./index.scss";

import {
  Row,
  Col,
  Table,
  Button,
  Popconfirm,
  Space,
  Input,
  Layout,
  // Skeleton,
  Modal,
  Form,
  Tabs,
  Card,
  Checkbox,
  // message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";



import TabsUsed from './components/TabsUsed'

const { TabPane } = Tabs;
const { TextArea } = Input;
const { Content } = Layout;



export default function Accesses(props) {


  const dispatchAccesses = useDispatch();
  useEffect(() => { dispatchAccesses(loadAccesses()) }, [dispatchAccesses])
  const accesses = useSelector(state => state.accesses);

  const dispatchRoleAccesses = useDispatch();
  useEffect(() => { dispatchRoleAccesses(loadRoleAccesses()) }, [dispatchRoleAccesses])
  const roleAccesses = useSelector(state => state.roleAccesses);

  const dispatchStoreAccess = useDispatch();
  const dispatchUpdateAccess = useDispatch();
  const dispatchDestroyAccess = useDispatch();

  //

  const [form] = Form.useForm();

  const [keyword, setKeyword] = useState('');

  const [modalConfig, setModalConfig] = useState([false, null]);
  const [visibility, type] = modalConfig;

  const [selectedRow, setSelectedRow] = useState({});

  const portals = makeHelpers().uniqueEntries(roleAccesses.data.map((row) => row.portal));

  const [isCheckAllAccess, setCheckAllAccess] = useState(false)

  useEffect(() => {
    const { name, description, access } = selectedRow;

    if (type === "edit" || type === "view") {
      form.setFieldsValue({ name, description, access })
    } else {
      form.resetFields();
    }

    return () => form.resetFields();

  }, [form, selectedRow, type]);

  const onShowModal = () => setModalConfig([true, 'add'])
  const onCloseModal = () => { form.resetFields(); setModalConfig([false, null]); }

  async function onSubmit(params) {

    if (type === 'add') {
      dispatchStoreAccess(storeAccess(params))
      setModalConfig([false, null]);
      form.resetFields();
    }

    if (type === 'edit') {
      console.log('params', params)
      dispatchUpdateAccess(updateAccess(selectedRow.id, params))
      setModalConfig([false, null]);
      form.resetFields();
    }

  }

  const onEdit = (row) => { setModalConfig([true, 'edit']); setSelectedRow(row); }

  const onView = (row) => { setModalConfig([true, 'view']); setSelectedRow(row); }

  async function onDestroy(access) {
    dispatchDestroyAccess(destroyAccess(access.id))
    setModalConfig([false, null]);
    form.resetFields();
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) => a.description.length - b.description.length,
    },
    {
      title: "Accesses",
      dataIndex: "access",
      render: (access, record) => {

        console.log(`access`, access)

        return access ? <Button type='text' onClick={() => onView(record)}>View</Button> : 'None'
      }
    },
    {
      key: "action",
      title: "Action",
      render: (text, record) => (
        <Space size="middle">

          <Button type='text' onClick={() => onEdit(record)}>Edit</Button>
          <Popconfirm
            title={`Sure to delete access type ${record.name}?`}
            onConfirm={() => onDestroy(record)}
          >
            <Button type='text'>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const dataSource = accesses.data
    .filter((row) =>
      (row.name || "").toLowerCase().includes(keyword.toLowerCase()) ||
      (row.description || "")
        .toLowerCase()
        .includes(keyword.toLowerCase())
        .toString()
        .toLowerCase()
        .includes(keyword.toLowerCase())
    )
    .sort((a, b) => a.created_at - b.created_at)
    .reverse();

  // if (accesses.isLoading) {
  //   return (
  //     <Layout>
  //       <Skeleton active />
  //     </Layout>
  //   );
  // }

  return (
    <Layout className="role-and-access-page page">
      <Content className="page-content">
        <Row type="flex" align="middle" className="title-add">
          <Col span={12}>
            <h1 className="page-title">Role & Access</h1>
          </Col>
          <Col span={12} align="right">
            <Button type="primary" onClick={onShowModal}>
              Add New Access
            </Button>
          </Col>
        </Row>
        <Row type="flex">
          <Col span={24}>
            <Table
              rowKey='id'
              dataSource={dataSource}
              columns={columns}
              loading={accesses.isLoading}
              pagination={{ pageSize: 5 }}
              title={() => (
                <Row>
                  <Col span={8}>
                    <Input
                      prefix={<SearchOutlined />}
                      placeholder="Search"
                      className="search-input"
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </Col>
                </Row>
              )}
            />
          </Col>
        </Row>
      </Content>
      <Modal
        title={
          type === "add"
            ? "Add New Access"
            : type === "edit" ? "Edit Access" : 'Accesses'
        }
        centered
        visible={visibility}
        onCancel={onCloseModal}
        width={950}
        footer={false}
        forceRender
      >
        <Form
          form={form}
          name="access"
          onFinish={onSubmit}
          layout="vertical"
          hideRequiredMark
          scrollToFirstError
        >
          {!(type === "view")
            &&
            <>
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input autoFocus />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <TextArea />
              </Form.Item>
            </>

          }

          <Row type="flex">
            <Col span={24}>
              <TabsUsed
                portals={portals}
                roleAccesses={roleAccesses}
                type={type}
              />
            </Col>
          </Row>

          {!(type === "view")
            && <Form.Item>
              <Row type="flex" justify="end">
                <Button htmlType="submit" className="primary">
                  Submit
              </Button>
              </Row>
            </Form.Item>}

        </Form>
      </Modal>
    </Layout>
  );
}
