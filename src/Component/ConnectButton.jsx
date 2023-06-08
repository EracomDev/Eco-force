import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setaccount } from './../Redux/Accounts';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { IoWallet } from "react-icons/io5";
import Change from '../Common/StringToSub';
import Loader from '../Component/Loader/Loader';

const ConnectButton = () => {
    const ethers = require('ethers');
    const [web3Modal, setWeb3Modal] = useState(null);
    const acc = useSelector((state) => state.account.value);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const checkWalletIsConnected = () => {
        const { ethereum } = window;
        if (!ethereum) {
            console.log("Make sure you have MetaMask installed");
            setMsg("Make sure you have MetaMask installed");
            return;
        } else {
            console.log("Wallet exists! We are ready to go");
            setMsg("Wallet exists! We are ready to go");
        }
    }

    useEffect(() => {
        checkWalletIsConnected();
    }, []);

    useEffect(() => {
        const providerOptions = {
            walletconnect: {
                package: WalletConnectProvider,
                options: {
                    infuraId: "05f311673625f063cd5c0736f5bb17b0",
                }
            },
        };

        const newWeb3Modal = new Web3Modal({
            cacheProvider: true,
            providerOptions,
        });

        setWeb3Modal(newWeb3Modal);
    }, []);

    useEffect(() => {
        if (web3Modal && web3Modal.cachedProvider) {
            connectWallet();
        }
    }, [web3Modal]);

    async function connectWallet() {
        try {
            const provider = await web3Modal.connect();
            addListeners(provider);
            const ethersProvider = new ethers.providers.Web3Provider(provider);
            const userAddress = await ethersProvider.getSigner().getAddress();
            dispatch(setaccount(userAddress));
        } catch (e) {
            console.log(e);
        }
    }

    async function addListeners(web3ModalProvider) {
        web3ModalProvider.on("accountsChanged", (accounts) => {
            // window.location.reload()
        });

        // Subscribe to chainId change
        web3ModalProvider.on("chainChanged", () => {
            // window.location.reload()
        });
    }

    const [msg, setMsg] = useState("");

    return (
        <>
            {
                acc != null ?
                    <span id="connectButtonAddress"><i><IoWallet /></i>{Change(acc)}</span> :
                    <button onClick={connectWallet} className='btnConnect'>Connect</button>
            }
            {
                // console.log(contractABI)
                // localStorage.getItem("account")
            }
        </>
    );
}

export default ConnectButton;
