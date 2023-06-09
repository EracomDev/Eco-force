import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./WithdrawalDeposit.css";
import Withdrawal from "../../images/withdrawal.png";
import axios from "axios";
import { ApiPaths } from "../../API";
import Loader from "../../Component/Loader/Loader";
const WithdrawalDeposit = () => {
  const [withdrawAmount, setWithdrawAmount] = useState();
  const [availBalance, setAvailBalance] = useState([]);
  const Token = localStorage.getItem('authToken');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  let x = 1;

  useEffect(() => {
    if (x === 1) {
      FetchData();
      x++;
    }
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
        // console.log(response);
        setAvailBalance(response?.data?.wallets?.main_wallet);
        setLoading(false);
      })
      .catch(function (response) {
        console.log(response);
        setLoading(false);
      });
  }


  async function WithdrawFun() {
    setError("")
    if (withdrawAmount) {
      setLoading(true);
      try {
        axios({
          method: "post",
          url: ApiPaths.Withdrawal,
          data: {
            "amount": withdrawAmount
          },
          headers: {
            "Content-Type": "multipart/form-data",
            token: Token
          },
        })
          .then(function (response) {
            // console.log('withdrawAmount', response);
            if (response?.data?.status) {
              alert('Transaction Success');
              FetchData();
            } else {
              setError(response?.data?.message);
            }
            setLoading(false);
          })
          .catch(function (response) {
            console.log('verify', response);
            setLoading(false);
          });
      } catch (e) {
        console.log(e)
        setLoading(false)
      }
    }
  }
  return (
    <>
      {
        loading === true ? <Loader /> : null
      }
      <div className="WithdrawalDeposit_page">
        <Container>
          <Row>
            <Col md="3"></Col>
            <Col md="6">
              <div className="dashWithrawal_section">
                <h4>Withdrawal</h4>
                <img src={Withdrawal} alt="Withdrawal_image" />
                <div className="WithdrawalDeposit_inner mt-3">
                  <div className="availableAount">
                    <p>Available Balance</p>
                    <p>$ {parseFloat(availBalance).toFixed(2)}</p>
                  </div>
                  <p className="error">{error.replace(/<[^>]+>/g, '')}</p>
                  <input min={1} type="number" placeholder="Enter Amount" value={withdrawAmount} className="form-control mb-2" onChange={(e) => setWithdrawAmount(e.target.value)} />
                  <button class="button_income" onClick={WithdrawFun}>Withdraw</button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default WithdrawalDeposit;
