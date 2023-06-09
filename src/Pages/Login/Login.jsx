import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from './../../images/logo.png';
import { useState } from 'react';
import Loader from '../../Component/Loader/Loader';
import { Link, useNavigate } from 'react-router-dom';
import ConnectButton from '../../Component/ConnectButton';
import './Login.css'
import Register from './Register';
import { ethers } from 'ethers';
import axios from 'axios';
import { ApiPaths } from '../../API';
const Login = () => {
    const { ethereum } = window;
    const [loading1, setLoading1] = useState(false);
    const [msg1, setMsg1] = useState('');
    const navigate = useNavigate();


    async function loadEthers() {
        setLoading1(true);
        try {
            if (window.ethereum) {
                window.provider = new ethers.providers.Web3Provider(window.ethereum);
                await window.ethereum.enable(); // Request user permission to access their accounts
                setLoading1(false);
            } else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
                setLoading1(false);
            }
        } catch (e) {
            console.log("Please check your network");
            setLoading1(false);
        }
    }

    async function getChain() {
        try {
            setLoading1(true)
            const network = await window.provider.getNetwork();
            const chainId = network.chainId;
            console.log('Chain ID:', chainId);
            setLoading1(false);
            return chainId;
        } catch (e) {
            console.log("Please check your network");
            setLoading1(false);
        }
    }
    async function CheckBeforeLogin() {
        await loadEthers();
        let chain = await getChain();
        if (chain == 56) {
            LoginFun();
        } else {
            alert("Please Connect your wallet with BNB Smart Chain Mainnet");
        }
    }

    async function LoginFun() {
        try {
            setLoading1(true)
            let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            axios({
                method: "post",
                url: ApiPaths.LoginApi,
                data: {
                    username: accounts[0]
                },
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    // console.log(response);
                    if (response?.data?.tokenStatus == false) {
                        navigate('/login');
                        setMsg1(response?.data?.message);
                    } else if (response?.data?.token) {
                        localStorage.setItem('authToken', response?.data?.token);
                        navigate('/dashboard');
                    }
                    setLoading1(false)
                })
                .catch(function (response) {
                    console.log(response);
                    setLoading1(false);
                });
        } catch (e) {
            console.log(e);
            setLoading1(false)
        }
    }
    return (
        <>
            {
                loading1 === true ? <Loader /> : ''
            }
            <div id='bgImage'>
                <Container id="logoContainer">
                    <Link to="/">
                        <img src={Logo} alt="logo.png" />
                    </Link>
                    <ConnectButton />
                </Container>
                <div className="div">
                    <Container className="connectWalletContainer">
                        <Row className="connectWalletRow align-items-center">
                            <center className='text-danger'>{msg1}</center>
                            <Col md='6' className=" ">
                                <h4 className='heading'>AUTOMATIC REGISTRATION</h4>
                                <Register />
                                <p className='text-center' style={{ color: 'black' }}>Check the ID of Your inviter. <br></br>You can edit before proceed to payment.</p>
                            </Col>
                            <Col md='6' className="connectRegisterRight connectLoginRight connectRegisterLeft connectLoginLeft" >
                                <h3 className='heading' >Login to your personal account</h3>
                                {/* <input type="text" id="viewInput" placeholder="Enter User ID." /> */}

                                <p style={{ color: 'black' }}>To access all the functions of your personal account use Auto Login</p>
                                <Link className="loginBtn" onClick={CheckBeforeLogin} >Automatic Login</Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    )
}

export default Login