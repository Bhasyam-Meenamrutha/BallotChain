import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Principal } from '@dfinity/principal';
import { BallotChain_backend } from 'declarations/BallotChain_backend';

function MyProposals() {
  const [Nomdata, setNomdata] = useState([]);
  const location = useLocation();
  const { principal } = location.state || {};
  const [participants, setParticipants] = useState([]);
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const[mostvoted, setmostvoted] = useState("");
  const[max, setmax] = useState("");

  useEffect(() => {
    async function fetchNominations() {
      if (!principal) {
        console.error('Principal is undefined');
        return;
      }

      try {
        var prince = Principal.fromText(principal);
        const Nominations = await BallotChain_backend.GetNominataionsById(prince);
        console.log(Nominations)
        setNomdata(Nominations);
      } catch (error) {
        console.error('Error fetching nominations:', error);
      }
    }
    fetchNominations();
  }, [principal]);

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

  // async function EndThisVoting(id){
  //   var result = await BallotChain_backend.GetVotedDataByProp(BigInt(id))
  //   console.log(result);
  // }
  let mostFrequent = null;
      let maxCount = 0;
  async function EndThisVoting(id) {
    try {
      var result = await BallotChain_backend.GetVotedDataByProp(BigInt(id));
      console.log(result);
  
      // Initialize a map to count occurrences of each NominatedFor value
      const countMap = {};
  
      // Count occurrences of each NominatedFor
      result.forEach(entry => {
        const nominatedFor = entry.NominatedFor;
        if (countMap[nominatedFor]) {
          countMap[nominatedFor]++;
        } else {
          countMap[nominatedFor] = 1;
        }
      });
  
      // Find the most frequent NominatedFor
      
      
      for (const [nominatedFor, count] of Object.entries(countMap)) {
        if (count > maxCount) {
          mostFrequent = nominatedFor;
          maxCount = count;
        }
      }
  
      console.log('Most Frequent NominatedFor:', mostFrequent);
      console.log('Occurrences:', maxCount);
      setmostvoted(mostFrequent);
      setmax(maxCount);

      

      
    } catch (error) {
      console.error('Error during EndThisVoting:', error);
    }
  }
  


  return (
    <>
      <div>
        <h2>My Proposals</h2>
        <p>Here you can view your proposals.</p>
      </div>
      <div>
        {Nomdata.length === 0 ? null : (
          Nomdata.map((Nm, index) => (
            <div key={index}>
              <p>Nomination: {Nm.NominatePorpose.toString()}</p>
              <p>NominationId: {Nm.NominateId.toString()}</p>
              <button onClick={() => getPart(Nm.NominateId)}>Get Part</button>
              <button onClick={() => EndThisVoting((Nm.NominateId))}>End</button>             
              <div>max number voted:{max}<br />higheste voted for: {mostvoted}
              </div>

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

    </>
  );
}

export default MyProposals;
