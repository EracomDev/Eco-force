import React from "react";
import { Col } from "react-bootstrap";
const IncomeComponent = (props) => {
  return (
    <>
      <Col md="4" xs="6">
        <div className="dashboardIncome_box">
          <div class="inomesContent">
            <p>{props.incomeName}</p>
            <h4>$ {props.value}</h4>
          </div>
          <div className="inomesIcons">
            <i>{props.icon}</i>
          </div>
        </div>
      </Col>
    </>
  );
};

export default IncomeComponent;
