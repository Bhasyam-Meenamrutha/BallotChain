import React, { useState, useEffect } from 'react';
import { BallotChain_backend } from 'declarations/BallotChain_backend';

function AllProposals() {
  const [Nomdata, setNomdata] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');

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

  return (
    <>
      <div>
        <h2>All Proposals</h2>
        <p>Here you can view all proposals.</p>
      </div>
      <div>
        <div>
          {Nomdata.length === 0 ? null : (
            Nomdata.map((Nm, index) => (
              <div key={index}>
                <p>Nomination: {Nm.NominatePorpose.toString()}</p>
                <p>NominationId: {Nm.NominateId.toString()}</p>
                <button onClick={() => getPart(Nm.NominateId)}>Get Part</button>
              </div>
            ))
          )}
        </div>
        
        <div id="Nominationdet">
          {participants.length === 0 ? null : (
            participants.map((details, index) => (
              <div key={index}>
                <p>NominateId: {details.NominateId.toString()}</p>
                <p>Participants:</p>
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
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default AllProposals;
