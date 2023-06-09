import React, { useEffect, useState } from 'react'
import { ApiPaths } from '../../API';
import axios from 'axios';
import { ethers } from "ethers";
import Loader from '../../Component/Loader/Loader'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [sponsor, setSponsor] = useState();
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');
    const { ethereum } = window
    const navigate = useNavigate();
    const [chainIdd, setChainIdd] = useState();

    useEffect(() => {
        const after = window.location.search.slice(window.location.search.indexOf('=') + 1);
        setSponsor(after);
    }, [])

    async function loadEthers() {
        setLoading(true);
        try {
            if (window.ethereum) {
                window.provider = new ethers.providers.Web3Provider(window.ethereum);
                await window.ethereum.enable(); // Request user permission to access their accounts
                setLoading(false);
            } else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
                setLoading(false);
            }
        } catch (e) {
            console.log("Please check your network");
            setLoading(false);
        }
    }

    async function getChain() {
        try {
            setLoading(true)
            const network = await window.provider.getNetwork();
            const chainId = network.chainId;
            setChainIdd(chainId);
            console.log('Chain ID:', chainId);
            setLoading(false);
            return chainId;
        } catch (e) {
            console.log("Please check your network");
            setLoading(false);
        }
    }
    async function CheckBeforeRegister() {
        if (!sponsor) {
            setMsg('Invalid Sponsor');
        } else {
            await loadEthers();
            let chain = await getChain();
            if (chain == 56) {
                Register();
            } else {
                alert("Please Connect your wallet with BNB Smart Chain Mainnet");
            }
        }
    }
    async function Register() {
        try {
            setLoading(true)
            let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            axios({
                method: "post",
                url: ApiPaths.RegisterApi,
                data: {
                    username: accounts[0],
                    u_sponsor: sponsor
                },
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then(function (response) {
                    // console.log(response);
                    if (response?.data?.tokenStatus == false) {
                        navigate('/login');
                        setMsg(response?.data?.message)
                    } else
                        if (response?.data?.token) {
                            localStorage.setItem('authToken', response?.data?.token);
                            navigate('/dashboard')
                        }
                    setLoading(false)
                })
                .catch(function (response) {
                    console.log(response);
                    setLoading(false);
                });
        } catch (e) {
            setLoading(false);
        }
    }

    return (
        <>
            {
                loading === true ? <Loader /> : null
            }
            <span className='text-danger errorMsg' style={{ color: "red" }}>{msg.replace(/<[^>]+>/g, '')}</span>
            <div className="connectRegisterLeft">
                <input type="text" placeholder="Enter Sponsor ID." value={sponsor} onChange={(e) => setSponsor(e.target.value)} id="sponsor" />
                <div className="registerButtons">
                    <button className="viewing bgOrange" id="registerBtn" onClick={CheckBeforeRegister}>Register</button>
                </div>
            </div>
        </>
    )
}

export default Register