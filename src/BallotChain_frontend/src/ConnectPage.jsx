import React from 'react';
import './ConnectPage.css';
import { useLocation } from 'react-router-dom';
import {Principal} from '@dfinity/principal';
import {  useNavigate } from 'react-router-dom';


function ConnectPage() {
  const location= useLocation();
  const {principal}=location.state || {};
  const navigate = useNavigate();

// function getPri(){
//   console.log(Principal.fromText(principal))
// }
// for(var i=0;i<1;i++){
//   getPri();
// }
function CreateProposalsfun(){
  navigate('/CreateProposals',{ state: { principal: principal} });

}
function AllPropPage(){
  navigate('/AllProposals',{ state: { principal: principal} });
}
  
function MypropPage(){
  navigate('/MyProposals',{ state: { principal: principal} });
}
  return (
    <div className="dashboard">
      
        <div id="profile"><b><strong> PROFILE</strong> </b></div>
      
      <nav className="sidebar">
        <ul>
          <li onClick={CreateProposalsfun}> Create Voting </li>
          <li onClick={AllPropPage}>Voting Topics</li>
          <li onClick={MypropPage}>My Votings</li>
          
        </ul>
      </nav>
      <div id="pri"> 
        <b>Principal: {principal} </b>
      </div>
    </div>
  );
}

export default ConnectPage;
