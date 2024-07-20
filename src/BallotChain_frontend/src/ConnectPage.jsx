import React from 'react';
import {  Link } from 'react-router-dom';
import CreateProposals from './CreateProposals';
import AllProposals from './AllProposals';
import MyProposals from './MyProposals';
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
  navigate('/AllProposals');
}
  
  return (
    <div className="dashboard">
      
        <div id="profile"><b><strong> PROFILE</strong> </b></div>
      
      <nav className="sidebar">
        <ul>
          <li onClick={CreateProposalsfun}> Create Prooposals </li>
          <li onClick={AllPropPage}>All Proposals</li>
          <li><Link to="my-proposals">My Proposals</Link></li>
          
        </ul>
      </nav>
      {/* <div className="content">
        
        <Routes>
          <Route path="/CreateProposals" element={<CreateProposals />} />
          <Route path="all-proposals" element={<AllProposals />} />
          <Route path="my-proposals" element={<MyProposals />} />
          
        </Routes>
      </div> */}
      <div id="pri"> 
        Principal: {principal}


      </div>
    </div>
  );
}

export default ConnectPage;
