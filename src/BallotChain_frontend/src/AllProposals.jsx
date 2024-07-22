import React, { useState, useEffect } from 'react';
import { BallotChain_backend } from 'declarations/BallotChain_backend';
import { useLocation } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import './AllProposals.css';

function AllProposals() {
  const [Nomdata, setNomdata] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const location = useLocation();
  const { principal } = location.state || {};

  useEffect(() => {
    async function fetchNominations() {
      try {
        const Nominations = await BallotChain_backend.GetNominataions();
        setNomdata(Nominations);
      } catch (error) {
        console.error('Error fetching nominations:', error);
      }
    }
    fetchNominations();
  }, []);

  async function getPart(id) {
    if (id !== undefined) {
      try {
        const Nmid = await BallotChain_backend.GetParticipantsById(BigInt(id));
        console.log("Nmid", Nmid);
        setParticipants(Nmid);
      } catch (error) {
        console.error('Error fetching participants by ID:', error);
      }
    } else {
      console.error('Invalid ID passed to getPart');
    }
  }

  const handleRadioChange = (event) => {
    setSelectedParticipant(event.target.value);
  };

  async function handleSubmit(id) {
    var prince = Principal.fromText(principal);
    var selected = selectedParticipant;
    var det = {
      Principaid: prince,
      NominatedId: BigInt(id),
      NominatedFor: selected
    };
  
    try {
      var verif = await BallotChain_backend.GetSubmittedDetbyId(prince);
      console.log(verif, "verify");
  
      // Check if `selected` is already present in the `verif` array
      const isAlreadyVoted = verif?.some(entry => entry.NominatedId == id);
  
      if (isAlreadyVoted) {
        console.log("you already voted for this proposal");
        alert("you already voted for this proposal")
      } else {
        var selectedResult = await BallotChain_backend.votedDetails(det);
        console.log(selectedResult);
        console.log("successfully voted")
        alert("successfully voted")
      }
    } catch (error) {
      console.error('Error during handleSubmit:', error);
    }
  }

  return (
    <div className='page-container'>
      <div className="alprop-container">
        <h2>Voting Topics</h2>
        <p>Below, you can view a list of all election titles along with the candidates running for each position.</p>
      </div>
      <div className="main-content">
        <div className="content-container">
          {Nomdata.length === 0 ? null : (
            Nomdata.map((Nm, index) => (
              <div className="nomination-item" key={index}>
                <p>Election Title: {Nm.NominatePorpose.toString()}</p>
                <p>Title Id: {Nm.NominateId.toString()}</p>
                <button onClick={() => getPart(Nm.NominateId)}>Candidates List</button>
              </div>
            ))
          )}
        </div>
        <div id="Nominationdet">
          {participants.length === 0 ? null : (
            participants.map((details, index) => (
              <div key={index}>
                <p>Title Id: {details.NominateId.toString()}</p>
                <p>Candidates:</p>
                <ul>
                  {details.Participant.map((name, i) => (
                    <li key={i}>
                      <label>
                        <input
                          type="radio"
                          name="participant"
                          value={name}
                          checked={selectedParticipant === name}
                          onChange={handleRadioChange}
                        />
                        {name}
                      </label>
                    </li>
                  ))}
                  <button onClick={() => handleSubmit(details.NominateId)}>Submit</button>
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AllProposals;
