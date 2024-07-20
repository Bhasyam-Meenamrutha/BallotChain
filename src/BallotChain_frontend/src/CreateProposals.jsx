import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import { BallotChain_backend } from 'declarations/BallotChain_backend';


function CreateProposals() {
  const location = useLocation();
  const { principal } = location.state || {};
  

  async function SubmittingNominationDetails(event) {
    event.preventDefault();
    var prince = Principal.fromText(principal);
    var id = 0;
    var nomination = document.getElementById("nominationpurpose").value;

    var Nominate = {
      Principal: prince,
      NominateId: id,
      NominatePorpose: nomination
    };
    var result = await BallotChain_backend.CreateNomination(Nominate);
    console.log("after pushing", result);
    setNominationId(result);
    alert(result);
  }

  const [nominationId, setNominationId] = useState('');
  const [participants, setParticipants] = useState(['']);

  const handleNominationIdChange = (e) => {
    setNominationId(e.target.value);
  };


  const handleParticipantChange = (index, event) => {
    const newParticipants = [...participants];
    newParticipants[index] = event.target.value;
    setParticipants(newParticipants);
  };

  const addParticipant = () => {
    setParticipants([...participants, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Nomination Id:', nominationId);
    console.log('Participants:', participants);
  };

  async function SubmitParti(){
    var NomParti = participants;
    var NominateId = BigInt(nominationId);

     var FrontendParti = {
      NominateId : NominateId,
      Participant :NomParti
  
     }

    var addingParticipants = await BallotChain_backend.CreateParticipants(FrontendParti);
    console.log("addingParticipants",addingParticipants);

  }
   



  
  return (
    <>
    <div className="form-container">
      <form id="nomination-form" onSubmit={SubmittingNominationDetails}>
        <h2>Nomination Form</h2>
        <div className="form-group">
          <label htmlFor="nomination-purpose">Nomination Purpose</label>
          <input type="text" id="nominationpurpose" name="nomination-purpose" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

    <div>
    <div className="form-container">
      <form id="nomination-form" onSubmit={handleSubmit}>
        <h2>Nomination Form</h2>
        <div className="form-group">
          <label htmlFor="nomination-id">Nomination Id</label>
          <input
            type="text"
            id="nomination-id"
            value={nominationId.toString()}
            onChange={handleNominationIdChange}
            required
            readOnly
          /> 
  </div>
        <div className="form-group">
          <label>Participants</label>
          {participants.map((participant, index) => (
            <div key={index} className="participant-input">
              <input
              id = "multiPart"
                type="text"
                value={participant}
                onChange={(event) => handleParticipantChange(index, event)}
                placeholder={`Participant ${index + 1}`}
                required
              />
            </div>
          ))}
          <button type="button" onClick={addParticipant}>
            Add Participant
          </button>
        </div>
        <button type="submit" onClick={SubmitParti}>Submit</button>
      </form>
    </div>
    </div>
    </>
  );
}

export default CreateProposals;
