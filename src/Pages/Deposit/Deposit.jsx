import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContractDetails from './../../Contracts/ContractDetails'
import DepositImg from "../../images/deposit.png";
import { ApiPaths } from "../../API";
import axios from "axios";
import Loader from "../../Component/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
const Deposit = () => {
    const { BigInt } = window
    const navigate = useNavigate();
    const [PinData, setPinData] = useState([]);
    const [loading, setLoading] = useState(false);
    const Token = localStorage.getItem('authToken');
    const [msg, setMsg] = useState('')
    const [depositAmount, setDepositAmount] = useState();
    const [userId, setUserId] = useState();
    const [signupWallet, setSignupWallet] = useState();
    var remainAmount = 0;
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
                    setUserId(response?.data?.profile?.id);
                    setPinData(response?.data?.allPins);
                    setSignupWallet(response?.data?.wallets?.signup_wallet);
                }
                setLoading(false)
            })
            .catch(function (response) {
                console.log(response);
                setLoading(false);
            });
    }


    function CheckActiveOrNot() {
        axios({
            method: "get",
            url: ApiPaths.CheckActivePackage,
            data: {
                u_id: userId,
                amount: depositAmount
            },
            headers: {
                "Content-Type": "multipart/form-data",
                token: Token
            },
        })
            .then(function (response) {
                console.log('response', response);
                if (response?.data?.status) {
                    CheckBeforeDeposit(depositAmount);
                } else {
                    if (signupWallet > 0) {
                        let amt = (depositAmount * 20) / 100;

                        if (signupWallet >= amt) {
                            let newAmt = depositAmount - amt;
                            remainAmount = amt;
                            CheckBeforeDeposit(newAmt);
                        } else {
                            let newAmt = depositAmount - signupWallet;
                            remainAmount = signupWallet;
                            CheckBeforeDeposit(newAmt);
                        }
                    } else {
                        CheckBeforeDeposit(depositAmount);
                    }
                }

            })
            .catch(function (response) {
                console.log(response);
                setLoading(false);
            });
    }

    async function CheckBeforeDeposit(newAmount) {

        setLoading(true);
        try {
            axios({
                method: "post",
                url: ApiPaths.BuyPackage,
                data: {
                    amount: newAmount,
                    package: depositAmount
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    token: Token
                },
            })
                .then(function (response) {
                    console.log('response deposit', response)
                    if (response?.data?.status) {
                        increaseAllowance(response.data, newAmount)
                    } else {
                        setMsg(response.data.message)
                        setLoading(false)
                    }
                })
                .catch(function (response) {
                    console.log('deposit', response);
                    setLoading(false)
                });
        } catch (e) {
            console.log(e)
            setLoading(false)
        }

    }
    async function increaseAllowance(regData, newAmount) {
        if (newAmount >= 10) {
            let amount = BigInt(newAmount * 1e18);
            setLoading(true);
            const { ethereum } = window;
            const chekBal = true;
            if (chekBal == true) {
                if (ethereum) {
                    try {
                        const provider = new ethers.providers.Web3Provider(ethereum);
                        const signer = provider.getSigner();
                        const busdInstance = new ethers.Contract(ContractDetails.BUSD, ContractDetails.BUSD_ABI, signer);
                        console.log("Instance : " + busdInstance);

                        let inc = await busdInstance.increaseAllowance(ContractDetails.contract, amount, { value: ethers.utils.parseEther('0') });
                        await inc.wait();
                        // const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                        console.log("Tr Hash 1: " + inc.hash);
                        register(regData);
                    }
                    catch (error) {
                        setLoading(false);
                        console.log(error)
                        setMsg('Something Went Wrong');
                    }
                }
                else {
                    setMsg('Wallet Not Exist');
                    setLoading(false);
                }
            } else {
                setMsg('Insufficient Funds');
                setLoading(false);
            }
        } else {
            setMsg('Amount should be greater then or equal to 2000')
        }
    }

    async function register(apidata) {
        try {
            let add = JSON.parse(apidata?.address);
            let amtval = JSON.parse(apidata?.incomes);
            // var amt = amtval[0] * 1e18;
            let amtArray = [];
            for (let i = 0; i < amtval.length; i++) {
                let kk = BigInt(amtval[i] * 1e18);
                amtArray.push(kk);
            }
            console.log('111', ContractDetails.BUSD)
            console.log('222', add)
            console.log('333', amtArray)
            setLoading(true);
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                console.log('signer', signer)
                const contractinstance = new ethers.Contract(ContractDetails.contract, ContractDetails.contractABI, signer);
                console.log("Instance 1111: " + contractinstance);
                let inc = await contractinstance.shareContribution(add, amtArray, ContractDetails.BUSD, { value: ethers.utils.parseEther('0') });
                await inc.wait();
                console.log("Tr Hash 2: " + inc.hash);
                // alert('success');
                try {
                    setLoading(true)
                    axios({
                        method: "post",
                        url: ApiPaths.ConfirmOrder,
                        data: {
                            "order_id": apidata.order_id,
                            "tx_hash": inc.hash,
                            "signup_debit_amount": remainAmount
                        },
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Accept: "application/json",
                            token: Token
                        },
                    })
                        .then(function (response) {
                            console.log('verify', response);
                            console.log('verify 2', response.data.status);
                            if (response.data.status) {
                                alert('Transaction Success');
                                setMsg('')
                                setLoading(false)
                            } else {
                                alert('Transaction Failed');
                                setLoading(false)
                            }
                        })
                        .catch(function (response) {
                            console.log('verify', response);
                            setLoading(false);
                            setLoading(false)
                        });
                } catch (e) {
                    console.log(e)
                    setLoading(false)
                }
                setLoading(false);
            }
        } catch (error) {
            setMsg(<span className='text-danger'>Something went wrong</span>)
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <>
            {
                loading === true ? <Loader /> : null
            }
            <div className="WithdrawalDeposit_page">
                <center className="text-danger">{msg}</center>
                <Container>
                    <Row>
                        <Col md="3"></Col>
                        <Col md="6">
                            <div className="dashWithrawal_section">
                                <h4>deposit</h4>
                                <img src={DepositImg} alt="Withdrawal_image" />
                                <div className="WithdrawalDeposit_inner mt-3">
                                    <select onChange={(e) => setDepositAmount(e.target.value)} name="wallet" class="wallet_select" id="wallets">
                                        <option value="0">Please Select package:</option>
                                        {
                                            PinData?.map((x, i) => {
                                                return (
                                                    <option value={x?.pin_rate} > {x?.pin_type}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <button class="button_income" onClick={CheckActiveOrNot}>topup</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div >
        </>
    );
};

export default Deposit;
