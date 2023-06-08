import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./GenerationTeam.css";
import { LuFilter } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { ApiPaths } from "../../API";
import axios from "axios";
import Change from "../../Common/StringToSub";
import Loader from "../../Component/Loader/Loader";

const Team = () => {
  const [filterToggle, setFilterToggle] = useState("none");
  const Token = localStorage.getItem('authToken');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [generationTeam, setGenerationTeam] = useState([]);
  const [searchLevel, setSearchLevel] = useState('');
  const [userId, setUserId] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  useEffect(() => {
    FetchData();
  }, [])

  function FetchData() {
    setLoading(true);
    axios({
      method: "get",
      url: ApiPaths.TeamGen,
      headers: {
        "Content-Type": "multipart/form-data",
        token: Token
      },
    })
      .then(function (response) {
        console.log(response);
        if (response?.data?.tokenStatus == false) {
          setLoading(false);
          navigate('/login');
        } else if (response?.data) {
          setGenerationTeam(response?.data?.result);
        }
        setLoading(false)
      })
      .catch(function (response) {
        console.log(response);
        setLoading(false);
      });
  }
  function FetchFilterData() {
    let myLink = `${ApiPaths.TeamDirect}/?username=${userId}&start_date=${startDate}&end_date=${endDate}&selected_level=${searchLevel}`
    setLoading(true);
    axios({
      method: "get",
      url: myLink,
      headers: {
        "Content-Type": "multipart/form-data",
        token: Token
      },
    })
      .then(function (response) {
        console.log(response);
        if (response?.data?.tokenStatus == false) {
          setLoading(false);
          navigate('/login');
        } else if (response?.data) {
          setGenerationTeam(response?.data?.result);
        }
        setLoading(false)
      })
      .catch(function (response) {
        console.log(response);
        setLoading(false);
      });
  }


  function Reset() {
    setEndDate("");
    setStartDate("");
    setUserId("");
    setSearchLevel("");
    FetchData();
  }
  return (
    <>
      {
        loading === true ? <Loader /> : null
      }
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
                    filter <i></i>
                  </h4>
                  <i className="filterToggleButton" onClick={() => filterToggle === "none" ? setFilterToggle("block") : setFilterToggle("none")}><BiMenuAltRight /></i>
                </div>

                <div className="filterRow" style={{ display: filterToggle }}>
                  <Row>
                    <Col md="2" className="mb-2">
                      <input
                        name="username"
                        type="text"
                        class="form-control filterInput"
                        placeholder="Search by User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                      />
                    </Col>
                    <Col md="2" className="mb-2">
                      <input
                        name="start_date"
                        type="date"
                        class="form-control filterInput"
                        placeholder="From Registration Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                    </Col>
                    <Col md="2" className="mb-2">
                      <input
                        name="start_date"
                        type="date"
                        class="form-control filterInput"
                        placeholder="From Registration Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </Col>
                    <Col lg="2" md="4">
                      <div>
                        <select value={searchLevel}
                          className="form-control filterInput"
                          onChange={(e) => setSearchLevel(e.target.value)} >
                          <option value="2">--Select Level--</option>
                          <option value="1">Level 1</option>
                          <option value="2">Level 2</option>
                          <option value="3">Level 3</option>
                          <option value="4">Level 4</option>
                          <option value="5">Level 5</option>
                          <option value="6">Level 6</option>
                          <option value="7">Level 7</option>
                          <option value="8">Level 8</option>
                          <option value="9">Level 9</option>
                          <option value="10">Level 10</option>
                        </select>
                      </div>
                    </Col>
                    <Col md="2" className="mb-2">
                      <div className="filterButtons">
                        <button onClick={() => FetchFilterData()}>filter</button>
                        <button onClick={() => Reset()}>reset</button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="lastestTransaction_table">
                <div className="tableTrans">
                  <div className="incomesTitle lastest">Generation team</div>
                  <table className="mt-2">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Active Date</th>
                        <th>Username</th>
                        <th>Sponsor</th>
                        <th>Active Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        generationTeam?.map((x, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>{x?.Activation_date}</td>
                              <td>{Change(x?.username)}</td>
                              <td>{Change(x?.sponsor)}</td>
                              {
                                x?.active_status == 1 ? <td style={{ color: "green" }}>Active</td> : <td style={{ color: "red" }}>Inactive</td>
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

export default Team;
