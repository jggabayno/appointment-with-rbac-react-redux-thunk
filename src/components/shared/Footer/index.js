import React from "react";
import "./index.scss";
import { Row, Col, Typography } from "antd";

export default function Footer() {
  return (
    <Row className="footer">
      <Col>
        <Typography level={4}>© 2020 Footer</Typography>
      </Col>
    </Row>
  );
}
