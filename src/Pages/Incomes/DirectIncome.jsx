import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import "./Incomes.css";
import { LuFilter } from "react-icons/lu";
import { BiMenuAltRight } from 'react-icons/bi';
import Loader from '../../Component/Loader/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ApiPaths } from '../../API';
import Change from '../../Common/StringToSub';
const DirectIncome = () => {
    const [filterToggle, setFilterToggle] = useState("none");
    const [loading, setLoading] = useState(false);
    const [incomeData, setIncomeData] = useState([]);
    const [userId, setUserId] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const navigate = useNavigate;
    const Token = localStorage.getItem("authToken");
    useEffect(() => {
        FetchData();
    }, [])

    function FetchData() {
        setLoading(true);
        let myPath = `${ApiPaths.Incomes}/?type=direct`
        axios({
            method: "get",
            url: myPath,
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
                    setIncomeData(response?.data)
                }
                setLoading(false)
            })
            .catch(function (response) {
                console.log(response);
                setLoading(false);
            });
    }
    function FetchDataFilter() {
        setLoading(true);
        let myPath = `${ApiPaths.Incomes}/?type=direct&username=${userId}&start_date=${fromDate}&end_date=${toDate}`
        axios({
            method: "get",
            url: myPath,
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
                    setIncomeData(response?.data)
                }
                setLoading(false)
            })
            .catch(function (response) {
                console.log(response);
                setLoading(false);
            });
    }
    function Reset() {
        setFromDate('');
        setToDate('');
        setUserId('');
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
                                                value={fromDate}
                                                onChange={(e) => setFromDate(e.target.value)}
                                            />
                                        </Col>
                                        <Col md="2" className="mb-2">
                                            <input
                                                name="start_date"
                                                type="date"
                                                class="form-control filterInput"
                                                placeholder="From Registration Date"
                                                value={toDate}
                                                onChange={(e) => setToDate(e.target.value)}
                                            />
                                        </Col>
                                        <Col md="2" className="mb-2">
                                            <div className="filterButtons">
                                                <button onClick={FetchDataFilter}>filter</button>
                                                <button onClick={Reset}>reset</button>
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
                                    <div className="incomesTitle lastest">Direct Incomes</div>
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
                                            {
                                                incomeData?.result?.map((x, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{Change(x?.user)}</td>
                                                            <td>{Change(x?.to_from)}</td>
                                                            <td>{parseFloat(x?.amount).toFixed(2)}</td>
                                                            <td>{x?.remark}</td>
                                                            <td>{x?.time}</td>
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
}

export default DirectIncome