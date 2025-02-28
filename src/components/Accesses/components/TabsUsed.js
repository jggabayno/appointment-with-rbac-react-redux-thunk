import React from 'react'

import { Tabs, Row, Col, Card, Form, Checkbox } from 'antd'


const { TabPane } = Tabs;

export default function TabsUsed({ portals, roleAccesses, type }) {
    

    const isSplitCard = roleAccesses.data.map(row => row.feature).length >= 2

    return (
        <Tabs defaultActiveKey="0">
            {portals.map((portal, key) => (
                <TabPane tab={portal} key={portal + key}>
                    <Row type='flex' justify={isSplitCard ? 'start' : 'space-between'} gutter={isSplitCard && [32, 0]}>
                        {roleAccesses.data
                            .filter((row) => row.portal === portal)
                            .map((row, index) => (
                                <Col key={portal + index} span={isSplitCard ? 9 : 7}>
                                    <Card
                                        title={row.feature}
                                        headStyle={{ textTransform: "capitalize" }}
                                        style={{ pointerEvents: type === 'view' && 'none' }}
                                    >
                                        <Row type="flex">
                                            {row.access.map((access, index) => {



                                                const { portal, feature } = row;
                                                const { type, label } = access;
                                                return (
                                                    <Form.Item
                                                        key={feature + index}
                                                        name={["access", portal, feature, type]}
                                                        valuePropName="checked"

                                                    >
                                                        <Checkbox>{label}</Checkbox>
                                                    </Form.Item>
                                                );
                                            })}
                                        </Row>
                                    </Card>
                                </Col>
                            ))}
                    </Row>
                </TabPane>
            ))}
        </Tabs>
    )
}
