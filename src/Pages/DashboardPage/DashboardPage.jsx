import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./DashboardPage.css";
import Dash from "../../images/dash.png";
import Package from "../../images/package4.png";
import Package2 from "../../images/package5.png";
import Reffer from "../../images/refer.png";
import Comm from "../../images/community.png";
import Team from "../../images/team.png";
import { IoIosCopy } from "react-icons/io";
import { GiTakeMyMoney, GiWallet } from "react-icons/gi";
import TeamComponent from "../../Component/TeamComponent";
import IncomeComponent from "../../Component/IncomeComponent";
import { Link, useNavigate } from "react-router-dom";
import { ApiPaths } from "./../../API"
import axios from "axios";
import Loader from "../../Component/Loader/Loader";
import CopyToClipboard from './../../Common/CopyToClipboard'
import CountDown from "../../Component/CountDown";
const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const Token = localStorage.getItem('authToken');
  const [dashboardData, setDashboardData] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [timer, setTimer] = useState(0);
  const [community, setCommunity] = useState(0);
  let x = 1;
  useEffect(() => {
    FetchData();
  }, [])
  useEffect(() => {
    setInterval(function () {
      axios({
        method: "get",
        url: ApiPaths.Dashboard,
        headers: {
          "Content-Type": "multipart/form-data",
          token: Token,
        },
      })
        .then(function (response) {
          console.log(response)
          setCommunity(response?.data?.community)
        })
        .catch(function (response) {
        });
    }, 60000);
  }, [])

  function FetchData() {
    setLoading(true);
    axios({
      method: "get",
      url: ApiPaths.Dashboard,
      headers: {
        "Content-Type": "multipart/form-data",
        token: Token,
      },
    })
      .then(function (response) {
        console.log(response);
        if (response?.data?.tokenStatus == false) {
          setLoading(false);
          navigate('/login');
        } else if (response?.data) {
          setDashboardData(response?.data);
          setTimer(response?.data?.timmer)
          let income = Object.entries(response?.data?.incomes)
          setIncomes(income);
          setCommunity(response?.data?.community)
        }
        setLoading(false)
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
      <div className="sectionContent">
        <Container fluid>
          <Row>
            <Col md="8">
              <div className="dashboardTitle_Data">
                <Row className="align-items-center">
                  <Col md="8">
                    <div className="dashboardTitle_inner">
                      <h1>Welcome to Eco Force</h1>
                      <p>Experience the power of our user-friendly dashboard for dominating the world of cryptocurrency!</p>
                      <div className="dashboardTitle_btn">
                        <Link to='deposit'>deposit</Link>
                        <Link to='withdrawal_deposit'>Withdrawal</Link>
                      </div>
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="dashbaordTitle_image">
                      <img src={Dash} alt="images" />
                    </div>
                  </Col>
                </Row>
              </div>

              {/***************   Incomes-start  ****************/}

              <div className="dashboardIncomes">
                <Row>
                  <Col>
                    <div className="incomesTitle">my incomes</div>
                  </Col>
                </Row>
                <Row>
                  {
                    incomes?.map((x, i) => {
                      return (
                        <IncomeComponent
                          incomeName={x[0].split('_').join(' ')}
                          value={parseFloat(x[1]).toFixed(2)}
                          icon={<GiTakeMyMoney />}
                        />
                      )
                    })
                  }
                </Row>
                <div className="incomesTitle">My Wallets</div>
                <Row>
                  <Col xs="6">
                    <div className="dashboardIncome_box">
                      <div class="inomesContent">
                        <p>Main Wallet</p>
                        <h4>$ {parseFloat(dashboardData?.wallets?.main_wallet).toFixed(2)}</h4>
                      </div>
                      <div className="inomesIcons">
                        <i><GiWallet /></i>
                      </div>
                    </div>
                  </Col>
                  <Col xs="6">
                    <div className="dashboardIncome_box">
                      <div class="inomesContent">
                        <p>Signup Wallet</p>
                        <h4>$ {parseFloat(dashboardData?.wallets?.signup_wallet).toFixed(2)}</h4>
                      </div>
                      <div className="inomesIcons">
                        <i><GiWallet /></i>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
              <div class="lastestTransaction_table">
                <div class="tableTrans">
                  <div className="incomesTitle lastest">
                    lastest transaction
                  </div>
                  <table class="mt-2">
                    <thead>
                      <tr>
                        <th>S.No</th>
                        <th>Transaction type</th>
                        <th>Total amount</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        dashboardData?.latest_transaction?.map((x, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td style={{ textTransform: "capitalize" }}>{x?.debit_credit}</td>
                              <td>{parseFloat(x?.amount).toFixed(2)}</td>
                              <td>{x?.date}</td>
                              {
                                x?.status == "1" ? < td >Approve</td> : < td >"Pending"</td>
                              }
                            </tr>
                          )
                        })
                      }

                    </tbody>
                  </table>
                </div>
              </div>
              <div class="lastestTransaction_table">
                <div class="tableTrans">
                  <div className="incomesTitle lastest">
                    worldwide community
                  </div>
                  <div className="marqHeading">
                    <p>Username</p>
                    <p>Country</p>
                    <p>Joining Date</p>
                  </div>
                  {/* <table class="mt-2"> */}
                  <marquee width="100%" direction="up" height="200px" scrollamount="5" loop>
                    {dashboardData?.eco_force?.map((x, i) => {
                      return (
                        <div className="marqContent">
                          <p>{x?.username}</p>
                          <div>
                            <img src={x?.country_img} alt="logo.png" />
                            <p>{x?.country_name}</p>
                          </div>
                          <p>{x?.added_on}</p>
                        </div>
                      );
                    })}
                  </marquee>
                  {/* </table> */}
                </div>
              </div>

              {/*************** Incomes-start-end  ****************/}
            </Col>
            <Col md="4">
              <div className="dashboardRight_box">
                {/* *********** my-package-start ***********/}
                {
                  timer == 0 ? <div className="myPackage signupBanus">
                    <div class="myPackage_inner">
                      <h4>Signup Bonus Timer</h4>
                      <p>00d : 00h : 00m : 00s</p>
                    </div>
                    <img src={Package2} alt="package_image" />
                  </div>
                    :
                    <div className="myPackage signupBanus">
                      <div class="myPackage_inner">
                        <h4>Signup Bonus Timer</h4>
                        <CountDown time={timer} />
                      </div>
                      <img src={Package2} alt="package_image" />
                    </div>
                }
                <div className="myPackage">
                  <div class="myPackage_inner">
                    <h4>my package</h4>
                    <h6>$ {parseFloat(dashboardData?.package).toFixed(2)}</h6>
                  </div>
                  <img src={Package} alt="package_image" />
                </div>
                <div className="myPackage">
                  <div class="myPackage_inner">
                    <h4>Total Community</h4>
                    <h6>{community}</h6>
                  </div>
                  <img src={Comm} alt="img" />
                </div>
                {/* *********** my-package-end ***********/}

                {/* *********** reffer-link-start ***********/}
                <div className="referaLink_section">
                  <h4 className="dashboardRight_heading">Referral Link</h4>
                  <img src={Reffer} alt="imagesreferral" />
                  <div className="referrallink_Copy">
                    <input
                      id="refLink"
                      type="text"
                      class="form-control reffer"
                      placeholder="Referral Link"
                      value={window.location.origin + "/login/?ref=" + dashboardData?.profile?.username}
                    />
                    <i onClick={() => CopyToClipboard("refLink")}>
                      <IoIosCopy />
                    </i>
                  </div>
                </div>
                {/* *********** reffer-link-end ***********/}

                {/* *********** team-start ***********/}
                <div className="dashboardTeam_section">
                  <h4 className="dashboardRight_heading">Team</h4>
                  <img src={Team} alt="images" />
                  <div className="allDirects">
                    <TeamComponent
                      bgColor="#e2e1f0"
                      color="#160ca5"
                      teamName="Active Directs"
                      value={dashboardData?.terams?.active_directs}
                    />
                    <TeamComponent
                      bgColor="#a150202e"
                      color="orange"
                      teamName="inactive Directs"
                      value={dashboardData?.terams?.inactive_directs}
                    />
                    <TeamComponent
                      bgColor="#8500ff14"
                      color="#8500ff"
                      teamName="Total Directs"
                      value={dashboardData?.terams?.total_directs}
                    />
                    <TeamComponent
                      bgColor="#0072ff1f"
                      color="#0072ff"
                      teamName="Total Generation"
                      value={dashboardData?.terams?.total_gen}
                    />
                  </div>
                </div>
                {/* *********** team-end ***********/}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default DashboardPage;
