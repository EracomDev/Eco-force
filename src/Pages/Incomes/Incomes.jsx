import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Incomes.css";
import { LuFilter } from "react-icons/lu";

const Incomes = () => {
  return (
    <>
      <div className="dashAllincomes">
        <Container>
          <Row>
            <Col>
              <div className="DashFilter_section">
                <div className="dashFilter_incomes">
                  <h4>
                    <i>
                      <LuFilter />
                    </i>
                    filter
                  </h4>
                  <select name="my_incomes" id="incomes_list">
                    <option value="Direct">Direct Income</option>
                    <option value="ROI">ROI Income</option>
                    <option value="ROI_level">ROI level Income</option>
                    <option value="Reward">Reward Income</option>
                  </select>
                </div>

                <div className="filterRow">
                  <Row>
                    <Col md="2" className="mb-2">
                      <input
                        name="username"
                        type="text"
                        class="form-control filterInput"
                        placeholder="Search by User ID"
                        value=""
                      />
                    </Col>
                    <Col md="2" className="mb-2">
                      <input
                        name="start_date"
                        type="date"
                        class="form-control filterInput"
                        placeholder="From Registration Date"
                        value=""
                      />
                    </Col>
                    <Col md="2" className="mb-2">
                      <input
                        name="start_date"
                        type="date"
                        class="form-control filterInput"
                        placeholder="From Registration Date"
                        value=""
                      />
                    </Col>
                    <Col md="2" className="mb-2">
                      <div className="filterButtons">
                        <button>filter</button>
                        <button>reset</button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div class="lastestTransaction_table">
                <div class="tableTrans">
                  <div className="incomesTitle lastest">INCOMES</div>
                  <table class="mt-2">
                    <thead>
                      <tr>
                        <th>S.NO</th>
                        <th>User</th>
                        <th>From</th>
                        <th>Amount($)</th>
                        <th>Remarks</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colspan="6" class="text-center">
                          No transactions found.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Incomes;
