import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Profile.css";
import UserProfile from "../../images/profile_user.png";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { ApiPaths } from "../../API";
import Loader from "../../Component/Loader/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = localStorage.getItem('authToken');
  useEffect(() => {
    FetchData();
  }, [])

  function FetchData() {
    setLoading(true);
    axios({
      method: "get",
      url: ApiPaths.Dashboard,
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
          setProfileData(response?.data?.profile);
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
      <div className="dashboardProfile">
        <Container>
          <Row>
            <Col>
              <div className="dashCard_headingPages">
                <h4>Profile</h4>
              </div>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md="5">
              <div className="userProfile_page">
                <img src={UserProfile} alt="profile_image" />
                <div className="userName">
                  <h6>Username: {profileData?.username}</h6>
                  <h6>
                    status: {
                      profileData?.active_status == "1" ? <b style={{ color: 'green' }}>Active</b> : <b style={{ color: 'red' }}>Inactive</b>
                    }
                  </h6>
                </div>
              </div>
            </Col>
            <Col md="7">
              <div className="userProfile_page">
                <div className="userProfile_list">
                  <ul>
                    <li>
                      <div>
                        <i>
                          <FaUserCheck />
                        </i>
                        Address
                      </div>
                      <p>{profileData?.userAddress}</p>
                    </li>
                    <li>
                      <div>
                        <i>
                          <FaUserPlus />
                        </i>
                        Sponsor
                      </div>
                      <p>{profileData?.u_sponsor}</p>
                    </li>
                    <li>
                      <div>
                        <i>
                          <BsFillCalendarDateFill />
                        </i>
                        Date of Joinig
                      </div>
                      <p>{profileData?.added_on}</p>
                    </li>
                    <li>
                      <div>
                        <i>
                          <BsFillCalendarDateFill />
                        </i>
                        Activation Date
                      </div>
                      {
                        profileData?.active_date != null ? < p >{profileData?.active_date}</p> : <p >Inactive</p>
                      }
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Profile;
