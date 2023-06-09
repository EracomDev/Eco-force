import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./DirectTeam.css";
import { LuFilter } from "react-icons/lu";
import { BiMenuAltRight } from "react-icons/bi";
import { ApiPaths } from "../../API";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Change from "./../../Common/StringToSub"
import Loader from "../../Component/Loader/Loader";
const DirectTeam = () => {
    const [filterToggle, setFilterToggle] = useState("none");
    const Token = localStorage.getItem('authToken');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [directTeam, setDirectTeam] = useState([]);
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
            url: ApiPaths.TeamDirect,
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
                    setDirectTeam(response?.data?.result);
                }
                setLoading(false)
            })
            .catch(function (response) {
                console.log(response);
                setLoading(false);
            });
    }
    function FetchFilterData() {
        // console.log('username', userId)
        // console.log('start_date', startDate)
        // console.log('end_date', endDate)
        let myLink = `${ApiPaths.TeamDirect}/?username=${userId}&start_date=${startDate}&end_date=${endDate}`
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
                // console.log(response);
                if (response?.data?.tokenStatus == false) {
                    setLoading(false);
                    navigate('/login');
                } else if (response?.data) {
                    // console.log('filter direct team', response)
                    setDirectTeam(response?.data?.result);
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
                            <div class="lastestTransaction_table">
                                <div class="tableTrans">
                                    <div className="incomesTitle lastest">Direct team</div>
                                    <table class="mt-2">
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Active Date</th>
                                                <th>Username</th>
                                                <th>Package</th>
                                                <th>Active Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                directTeam?.map((x, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{x?.Activate_date}</td>
                                                            <td>{Change(x?.username)}</td>
                                                            <td>{x?.my_package}</td>
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

export default DirectTeam;
