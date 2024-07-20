import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ConnectPage from './ConnectPage';
import { AuthClient } from "@dfinity/auth-client";
import { useEffect, useState } from "react";
import CreateProposals from './CreateProposals';
import AllProposals from './AllProposals';
import MyProposals from './MyProposals';

function Home() {
  const navigate = useNavigate();
  const [identity, setIdentity] = useState(null);

  async function handleConnect() {
    const authClient = await AuthClient.create();
    authClient.login({
      maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: async () => {
        const identity = await authClient.getIdentity();
        setIdentity(identity);
        navigate("/ConnectPage",{ state: { principal: identity.getPrincipal().toText() } });
      },
    });
  }

  useEffect(() => {
    async function init() {
      const authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        const identity = await authClient.getIdentity();
        setIdentity(identity);
      }
      
    }
    init();
  }, []);

  return (
    <div className="App">
      <button className="connect-button" onClick={handleConnect}>Connect</button>
      {/* {identity && identity.getPrincipal && (
        <p id="PrincPrint">Principal: {identity.getPrincipal().toText()}</p>
      )} */}
      <div className="text-container">
        <h1 className="caption">Take Charge of Your Vote</h1>
        <p className="tagline">Blockchain-Powered Voting: Your Voice, Immutable and Secure</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ConnectPage" element={<ConnectPage />} />
        <Route path="/CreateProposals" element={<CreateProposals />} />
        <Route path="/AllProposals" element={<AllProposals /> } />
        <Route path="/MyProposals" element={<MyProposals />} />
      </Routes>
    </Router>
  );
}

export default App;