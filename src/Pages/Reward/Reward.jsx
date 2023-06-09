import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Reward.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Component/Loader/Loader";
import { ApiPaths } from "../../API";
const Reward = () => {

  const navigate = useNavigate();
  const [rewardData, setRewardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = localStorage.getItem('authToken');
  useEffect(() => {
    FetchData();
  }, [])

  function FetchData() {
    setLoading(true);
    axios({
      method: "get",
      url: ApiPaths.Reward,
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
          setRewardData(response?.data?.data);
        }
        setLoading(false)
      })
      .catch(function (response) {
        console.log(response);
        setLoading(false);
      });
  }

  return (
    <>{
      loading === true ? <Loader /> : null
    }
      <div className="rewardSsection">
        <Container>
          <Row>
            <Col>
              <div className="dashCard_headingPages">
                <h4>reward</h4>
              </div>
              <div className="dashPages_tables">
                <div class="tableTrans">
                  <table class="mt-2">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Reward Business</th>
                        <th>Reward</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        rewardData?.map((x, i) => {
                          return (
                            <tr>
                              <td>{x?.rank}</td>
                              <td>{x?.reward_business}</td>
                              <td>{x?.reward}</td>
                              {
                                x?.status == "Pending" ? <td style={{ color: "red" }}>{x?.status}</td> : <td style={{ color: "green" }}>{x?.status}</td>
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

export default Reward;
