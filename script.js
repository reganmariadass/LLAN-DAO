const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractABI = [ ];
import { Magic } from 'magic-sdk';
import { ethers } from 'ethers';

const magic = new Magic('pk_live_6CCE50694B6D38EC', {
  network: {
    rpcUrl: 'https://rpc.sepolia.org', // Use Sepolia Testnet
    chainId: 11155111,
  },
});
let provider;
let signer;
let contract;

async function connectWallet() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        const address = await signer.getAddress();
        document.getElementById("walletAddress").innerText = "Connected: " + address;
        contract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
        alert("Please install MetaMask!");
    }
}

async function joinDAO() {
    const tx = await contract.joinDAO();
    await tx.wait();
    alert("Joined DAO!");
}

async function createProposal() {
    const desc = document.getElementById("proposalDesc").value;
    const amount = ethers.utils.parseEther(document.getElementById("proposalAmount").value);
    const tx = await contract.createProposal(desc, amount);
    await tx.wait();
    alert("Proposal Created!");
}

async function voteProposal() {
    const id = document.getElementById("voteProposalId").value;
    const tx = await contract.voteOnProposal(id);
    await tx.wait();
    alert("Voted Successfully!");
}

async function fundDAO() {
    const value = ethers.utils.parseEther("0.1");
    const tx = await signer.sendTransaction({
        to: contractAddress,
        value: value
    });
    await tx.wait();
    alert("DAO Funded!");
}
