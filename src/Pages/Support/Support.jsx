import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Support.css";
import { useNavigate } from "react-router-dom";
import { ApiPaths } from "../../API";
import axios from "axios";
import Loader from "../../Component/Loader/Loader";

const Support = () => {

  const navigate = useNavigate();
  const [supportHistoryData, setSupportHistoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = localStorage.getItem('authToken');
  const [msg, setMsg] = useState("");
  useEffect(() => {
    FetchData();
  }, [])

  function SendMessage() {
    setLoading(true);
    axios({
      method: "post",
      url: ApiPaths.Support,
      data: {
        message: msg
      },
      headers: {
        "Content-Type": "multipart/form-data",
        token: Token
      },
    })
      .then(function (response) {
        // console.log(response);
        if (response?.data?.tokenStatus == false) {
          setLoading(false);
          navigate('/login');
        } else if (response?.data) {
          setLoading(false);
          alert(response?.data?.message);
          setMsg("");
          FetchData();
        }
        setLoading(false);
      })
      .catch(function (response) {
        console.log(response);
        setLoading(false);
      });
  }
  function FetchData() {
    setLoading(true);
    axios({
      method: "get",
      url: ApiPaths.SupportHistory,
      headers: {
        "Content-Type": "multipart/form-data",
        token: Token
      },
    })
      .then(function (response) {
        // console.log(response);
        if (response?.data?.tokenStatus == false) {
          setLoading(false);
          navigate('/login');
        } else if (response?.data) {
          setSupportHistoryData(response?.data?.data);
          setLoading(false);
        }
        setLoading(false);
      })
      .catch(function (response) {
        console.log(response);
        setLoading(false);
      });
  }
  return (
    <>
      {
        loading === true ? <Loader /> : null
      }
      <div className="dashSupport_page">
        <Container>
          <Row>
            <Col>
              <div className="supportSection">
                <h4>NEW SUPPORT TICKET</h4>
                <p>
                  Would you like to speak to one of our financial advisers over
                  the phone? Just submit your details and we'll be in touch
                  shortly. You can also email us if you would prefer.
                </p>
                <div className="SupportEnquiry">
                  <label>Description</label>
                  <textarea
                    required=""
                    class="form-control"
                    rows="4"
                    name="description"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  ></textarea>
                  <div class="SupportButtons">
                    <button type="submit" name="send" onClick={SendMessage}>
                      Send
                    </button>
                    <button href="" class="resetCancel" onClick={() => setMsg("")}>
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div class="lastestTransaction_table">
                <div class="tableTrans">
                  <div className="incomesTitle lastest">Support Ticket</div>
                  <table class="mt-2">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Ticket Id</th>
                        <th>Description</th>
                        <th>Create Date</th>
                        <th>Status</th>
                        <th>Reply</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        supportHistoryData?.map((x, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{x?.id}</td>
                              <td>{x?.message}</td>
                              <td>{x?.timestamp}</td>
                              {
                                x?.status == "1" ? <td style={{ color: "green" }}>Replied</td> : <td style={{ color: "red" }}>Pending</td>
                              }
                              {
                                x?.reply_status == "1" ? <td>{x?.reply}</td> : <td>Pending</td>
                              }
                            </tr>
                          )
                        })
                      }
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

export default Support;
