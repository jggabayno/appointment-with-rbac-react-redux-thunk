import React from "react";
import "./index.scss";
import { Row, Col } from "antd";

export default function NotFound() {
  return (
    <Row className="not-found">
      <Col>
        <h1>404 page not found</h1>
        <p> We are sorry but the page you are looking for does not exist.</p>
      </Col>
    </Row>
  );
}
