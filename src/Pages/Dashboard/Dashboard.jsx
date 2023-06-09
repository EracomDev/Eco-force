import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Logo from "../../images/logo.png";
import Plan from "../../images/plan.png";
import User from "../../images/profile_user.png";
import { ImHome } from "react-icons/im";
import { CgProfile, CgGift } from "react-icons/cg";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdGroups2, MdSupportAgent } from "react-icons/md";
import { RiLogoutCircleRLine, RiMenu2Line } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NavPages from "../../NavPages";
import { BsPersonFillDown } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import { ApiPaths } from "../../API";
import Pdf from "./../../PDF/pdf.pdf"
const Dashboard = () => {
  const navigate = useNavigate();
  const [toggleIcon, setToggleIcon] = useState(<RiMenu2Line />);
  const [rotateIcon, setRotateIcon] = useState("rotate(180deg)");
  const [incomeDisplay, setIncomeDisplay] = useState("none")
  const [profile, setProfile] = useState([]);
  const Token = localStorage.getItem('authToken');
  let x = 1;

  useEffect(() => {
    if (x === 1) {
      FetchData();
      x++;
    }
  }, [])

  function FetchData() {
    axios({
      method: "get",
      url: ApiPaths.Dashboard,
      headers: {
        "Content-Type": "multipart/form-data",
        token: Token
      },
    })
      .then(function (response) {
        // console.log(response);
        setProfile(response?.data?.profile);
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  function toggleSidebar() {
    var sidebar = document.getElementById("sidebarClick");
    sidebar.classList.toggle("active");

    if (sidebar.classList.contains("active")) {
      setToggleIcon(<RxCross1 />);
    } else {
      setToggleIcon(<RiMenu2Line />);
    }
  }
  function Logout() {
    localStorage.clear();
    navigate('/');
  }


  function ToggleIncome() {
    if (incomeDisplay === "none") {
      setIncomeDisplay("block")
      setRotateIcon("rotate(0deg)")
    } else {
      setIncomeDisplay("none")
      setRotateIcon("rotate(180deg)")
    }
  }


  return (
    <>
      <div className="alertMsg" id="CopiedMsg">
        Link Copied!
      </div>
      <section className="main_wrapper_dashboard">
        <div className="sideDashboard" id="sidebarClick">

          <div className="sidebarLogo">
            <img className="dashboardLogo" src={Logo} alt="logo" />
            {/* <h5>company name</h5> */}
          </div>

          <div className="sideMneu">
            <ul className="menuList">
              <NavLink activeClassName="active" end to="/dashboard">
                <li>
                  <h5>
                    <i>
                      <ImHome />
                    </i>
                    Dashboard
                  </h5>
                </li>
              </NavLink>
              <NavLink activeClassName="active" to="proflie">
                <li>
                  <h5>
                    <i>
                      <CgProfile />
                    </i>
                    My account
                  </h5>
                </li>
              </NavLink>
              <NavLink activeClassName="active" to="direct_team">
                <li>
                  <h5>
                    <i>
                      <BsPersonFillDown />
                    </i>
                    Direct Team
                  </h5>
                </li>
              </NavLink>
              <NavLink activeClassName="active" to="generation_team">
                <li>
                  <h5>
                    <i>
                      <MdGroups2 />
                    </i>
                    Generation Team
                  </h5>
                </li>
              </NavLink>

              <a onClick={ToggleIncome} className={incomeDisplay == "none" ? "" : "active"}>
                <li className="dropdown">
                  <h5>
                    <i>
                      <FaMoneyBillAlt />
                    </i>
                    my incomes
                  </h5>
                  <i style={{ transform: rotateIcon }}><IoIosArrowDown /></i>
                </li>
              </a>
              <div className="IncomeDropdown" style={{ display: incomeDisplay }}>
                <NavLink activeClassName="active" to="direct_income">
                  <li className="dropdown">
                    <h5>
                      <i>
                        <FaMoneyBillAlt />
                      </i>
                      Direct Income
                    </h5>
                  </li>
                </NavLink>
                <NavLink activeClassName="active" to="signup_income">
                  <li className="dropdown">
                    <h5>
                      <i>
                        <FaMoneyBillAlt />
                      </i>
                      Signup Income
                    </h5>
                  </li>
                </NavLink>
                <NavLink activeClassName="active" to="signup_level_income">
                  <li className="dropdown">
                    <h5>
                      <i>
                        <FaMoneyBillAlt />
                      </i>
                      Signup Level Income
                    </h5>
                  </li>
                </NavLink>
                <NavLink activeClassName="active" to="roi_income">
                  <li className="dropdown">
                    <h5>
                      <i>
                        <FaMoneyBillAlt />
                      </i>
                      ROI Income
                    </h5>
                  </li>
                </NavLink>
                <NavLink activeClassName="active" to="roi_level_income">
                  <li className="dropdown">
                    <h5>
                      <i>
                        <FaMoneyBillAlt />
                      </i>
                      ROI Level Income
                    </h5>
                  </li>
                </NavLink>
                <NavLink activeClassName="active" to="reward_income">
                  <li className="dropdown">
                    <h5>
                      <i>
                        <FaMoneyBillAlt />
                      </i>
                      Reward Income
                    </h5>
                  </li>
                </NavLink>
              </div>
              <NavLink activeClassName="active" to="reward">
                <li>
                  <h5>
                    <i>
                      <CgGift />
                    </i>
                    reward
                  </h5>
                </li>
              </NavLink>
              <NavLink activeClassName="active" to="support">
                <li>
                  <h5>
                    <i>
                      <MdSupportAgent />
                    </i>
                    support
                  </h5>
                </li>
              </NavLink>
              <li onClick={() => Logout()} style={{ cursor: "pointer" }}>
                <h5>
                  <i>
                    <RiLogoutCircleRLine />
                  </i>
                  logout
                </h5>
              </li>
            </ul>
            <a href={Pdf} target="_blank">
              <div className="planDetail">
                <img src={Plan} alt="planimage" />
                <h6>check your plan now</h6>
              </div>
            </a>
          </div>
        </div>
        <div className="navHeader">
          <div className="sideIcon_menu">
            <i id="menuToggle" onClick={() => toggleSidebar("")}>
              {toggleIcon}
            </i>
            <div className="headerProfile">
              <img id="userImg" src={User} alt="user" />
              <div className="userDetail">
                <span>{profile?.username}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="contentSection">
          <NavPages />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
