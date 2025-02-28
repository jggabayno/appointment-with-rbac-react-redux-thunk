import React, { useState, useEffect, createRef } from "react";
import ReactDOM from "react-dom";


import { useSelector, useDispatch } from 'react-redux'

import moment from 'moment'

import { loadWorkingHours, storeWorkingHour, updateWorkingHour, destroyWorkingHour, loadEmployees } from '../../actions'

import makeHelpers from '../../utilities/helpers'

import './index.scss'


import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import {
    Row,
    Col,
    Table,
    Button,
    Layout,
    Form,
    Space,
    Input,
    Modal,
    Popconfirm,
    Select,
    DatePicker,
    TimePicker,
    Card
} from "antd"

import { SearchOutlined, CalendarOutlined, TableOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { TextArea } = Input;


export default function WorkingHours() {



    const dispatchWorkingHours = useDispatch();
    useEffect(() => { dispatchWorkingHours(loadWorkingHours()) }, [dispatchWorkingHours])
    const workingHours = useSelector(state => state.workingHours);

    const dispatchStoreWorkingHour = useDispatch();
    const dispatchUpdateWorkingHour = useDispatch();
    const dispatchDestroyWorkingHour = useDispatch();

    const dispatchEmployees = useDispatch();
    useEffect(() => { dispatchEmployees(loadEmployees()) }, [dispatchEmployees])
    const employees = useSelector(state => state.employees);


    const calendarComponentRef = createRef();

    const employeesOptions = () => employees.data.map(row => (
        <Select.Option value={row.id} key={row.id} >{row.name}</Select.Option>
    ))

    const employeesSelectInputProps = {
        showSearch: 'showSearch',
        optionFilterProp: 'children',
        filterOption: (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
        autoClearSearchValue: 'autoClearSearchValue',
        allowClear: 'allowClear'
    }

    //

    const [form] = Form.useForm();

    const [keyword, setKeyword] = useState('');

    const [modalConfig, setModalConfig] = useState([false, null]);
    const [visibility, type] = modalConfig;

    const [selectedRow, setSelectedRow] = useState({});

    const [selectedDate, setSelectedDate] = useState(Date.now());

    const [isCalendarView, setIsCalendarView] = useState(false)


    useEffect(() => {
        if (type === 'add') {

            form.setFieldsValue({
                date: moment(selectedDate),
                startend: [
                    moment("09:00 am", "HH:mm A"),
                    moment("06:00 pm", "HH:mm A"),
                ],
            });
        }
    }, [selectedDate, type, form])


    useEffect(() => {
        const { employee, date, start_time, finish_time } = selectedRow;


        if (type === "edit") {

            setSelectedDate(moment(selectedRow.date));

            form.setFieldsValue({
                employee: employee.id,
                date: moment(date),
                startend: [
                    moment(start_time, "HH:mm A"),
                    moment(finish_time, "HH:mm A"),
                ],
            });

        }

    }, [form, selectedRow, type]);


    const onShowModal = () => setModalConfig([true, 'add'])
    const onCloseModal = () => { form.resetFields(); setModalConfig([false, null]); }

    async function onSubmit(values) {

        const { employee, date, startend } = values;
        const [start_time, end_time] = startend;

        const params = {
            employee,
            date: moment(date).format("YYYY-MM-DD"),
            start_time: moment(start_time).format("LT"),
            finish_time: moment(end_time).format("LT")
        }

        console.log('params', params)

        if (type === 'add') {
            // dispatchStoreWorkingHour(storeWorkingHour(params))
            // setModalConfig([false, null]);
            // form.resetFields();
        }

        if (type === 'edit') {
            // dispatchUpdateWorkingHour(updateWorkingHour(selectedRow.id, params))
            // setModalConfig([false, null]);
            // form.resetFields();
        }

    }

    const onEdit = (row) => { setModalConfig([true, 'edit']); setSelectedRow(row); }

    async function onDestroy(workingHour) {
        dispatchDestroyWorkingHour(destroyWorkingHour(workingHour.id))
        setModalConfig([false, null]);
        form.resetFields();
    }

    const columns = [

        {
            title: "Employee",
            dataIndex: "employee",
            sorter: (a, b) => a.employee.name.length - b.employee.name.length,
            render: (employee) => employee.name
        },
        {
            title: "Date",
            dataIndex: "date",
            render: (date) => moment(date).format('LL')
        },
        {
            title: "Start Time",
            dataIndex: "start_time",
            render: (start_time) => start_time
        },
        {
            title: "Finish Time",
            dataIndex: "finish_time",
            render: (finish_time) => finish_time
        },
        {
            key: "action",
            title: "Action",
            render: (text, record) => (
                <Space size="middle">
                    <span onClick={() => onEdit(record)}>Edit</span>
                    <Popconfirm
                        title={`Sure to delete selected working hours?`}
                        onConfirm={() => onDestroy(record)}
                    >
                        <span>Delete</span>
                    </Popconfirm>


                </Space>
            ),
        },
    ];

    const dataSource = workingHours.data
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

    // ....


    function fullcalendarEvent() {
        return dataSource.map(row => {
            return {
                id: row.id,
                data: {
                    id: row.id,
                    employee: row.employee.name,
                    start_time: row.start_time,
                    end_time: row.end_time,
                    date_assigned: row.date,
                },
                start: row.date,
                backgroundColor: "transparent",
            }
        })
        // return state.data.map((row) => {
        //   return {
        //     id: row.id,
        //     data: {
        //       id: row.id,
        //       name: row.name,
        //       start_time: row.start_time,
        //       end_time: row.end_time,
        //       date_assigned: row.date_assigned,
        //     },
        //     start: row.date_assigned,
        //     backgroundColor: "transparent",
        //   };
        // });
    }


    console.log('fullcalendarEvent()', fullcalendarEvent())


    return (
        <Layout className="working-hours-page page">
            <Content className="page-content">
                <Row type="flex" align="middle" className="title-add">
                    <Col span={12}>
                        <h1 className="page-title">Working Hours</h1>
                    </Col>
                    <Col span={12} align="right">
                        <Button type="primary"
                            onClick={onShowModal}
                        >
                            Add New Working Hour
                    </Button>
                    Change view to:{ } {isCalendarView
                            ?
                            <TableOutlined title='sdas' onClick={() => setIsCalendarView(prev => !prev)} />
                            :
                            <CalendarOutlined onClick={() => setIsCalendarView(prev => !prev)} />}

                    </Col>
                </Row>

                <Row type="flex">
                    <Col span={24}>
                        {isCalendarView ?


                            <FullCalendar
                                ref={calendarComponentRef}
                                plugins={[dayGridPlugin, interactionPlugin]}
                                header={{
                                    right: "prev,next",
                                    left: "title",
                                    center: "dayGridDay,dayGridWeek,dayGridMonth",
                                }}
                                handleWindowResize={true}
                                defaultView="dayGridMonth"
                                height="parent"
                                buttonText={{
                                    today: "Today",
                                    week: "Week",
                                    day: "Day",
                                    month: "Month",
                                }}
                                eventClassName="calendar-event"
                                eventBorderColor="transparent"
                                events={fullcalendarEvent()}
                                // dateClick={(e) => dateClick(e)}
                                // eventClick={(e) => {
                                //     setSelectedData(e.event.extendedProps.data);
                                // }}
                                eventRender={(e) => {
                                    const {
                                        employee,
                                        end_time,
                                        start_time,
                                    } = e.event.extendedProps.data;

                                    console.log('start_time', start_time)

                                    const content = (
                                        <React.Fragment>
                                            <Card
                                                className="schedule-content"
                                                actions={[
                                                    <div
                                                    // onClick={() => {
                                                    //     setVisibilityType([true, "edit"]);
                                                    //     switch (name) {
                                                    //         case "rest day":
                                                    //             return setRestDay(true);
                                                    //         default:
                                                    //             return setRestDay(false);
                                                    //     }
                                                    // }}
                                                    >
                                                        <EditOutlined className="edit-icon" />
                                                    </div>,
                                                    <Popconfirm
                                                        placement="top"
                                                        title={"Are you sure to delete this schedule?"}
                                                        // onConfirm={dropSchedule}
                                                        okText="Yes"
                                                        cancelText="No"
                                                    >
                                                        <DeleteOutlined className="delete-icon" />
                                                    </Popconfirm>,
                                                ]}
                                                style={{ padding: 0, backgroundColor: 'red' }}
                                            >
                                                <Card.Meta
                                                    title={employee}
                                                    description={
                                                        // name !== "rest day" && (
                                                        < Row
                                                            type="flex"
                                                            justify="space-between"
                                                            className="description"
                                                        >
                                                            <Col span={12}>{start_time}</Col>
                                                            <Col span={12}>{end_time}</Col>
                                                        </Row>
                                                        // )
                                                    }
                                                />
                                            </Card>
                                        </React.Fragment>
                                    );
                                    ReactDOM.render(content, e.el);
                                    return e.el;
                                }}
                                // eventDrop={(e) => moveSchedule(e)}
                                eventOverlap={() => { }}
                                selectable
                                editable
                                droppable
                            />
                            :
                            <Table
                                rowKey='id'
                                dataSource={dataSource}
                                columns={columns}
                                loading={workingHours.isLoading}
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
                            />}


                    </Col>
                </Row>
            </Content>
            <Modal
                title={
                    type === "add"
                        ? "Add New Working Hour"
                        : type === "edit" && "Edit Working Hour"
                }
                centered
                visible={visibility}
                onCancel={onCloseModal}
                width={300}
                footer={false}
                forceRender
            >
                <Form
                    form={form}
                    name="working-hour"
                    onFinish={onSubmit}
                    layout="vertical"
                    hideRequiredMark
                    scrollToFirstError
                >

                    <Form.Item name="employee" label="Employee" rules={[{ required: true }]}>
                        <Select {...employeesSelectInputProps}>
                            {employeesOptions()}
                        </Select>
                    </Form.Item>


                    <Form.Item
                        name="date"
                        label="Date Assigned"
                        rules={[
                            {
                                required: true,
                                message: "Please input assigned date",
                            },
                        ]}
                    >
                        <DatePicker
                            disabledDate={(current) => moment().add(-1, 'days') >= current
                                // || moment().add(1, 'month') <= current;
                            }
                            format={"MM/DD/YYYY"}
                            use12Hours />
                    </Form.Item>



                    <Form.Item
                        name="startend"
                        label="Start Time to Finish Time"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please input range between Start time to Finish time",
                            },
                        ]}
                    >
                        <TimePicker.RangePicker showTime={{ format: "HH:mm" }} use12Hours order={false} placeholder={['Start time', 'Finish time']} />
                    </Form.Item>


                    <Form.Item>
                        <Row type="flex" justify="end">
                            <Button htmlType="submit" className="primary">
                                Assign
                            </Button>
                        </Row>
                    </Form.Item>

                </Form>
            </Modal>
        </Layout>
    )
}
