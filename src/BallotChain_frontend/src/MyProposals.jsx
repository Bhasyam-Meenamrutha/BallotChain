import React, { useState, useEffect } from 'react';
import { BallotChain_backend } from 'declarations/BallotChain_backend';

function MyProposals() {
  const [Nomdata, setNomdata] = useState([]);
  
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

  return (
    <>
      <div>
        <h2>My Proposals</h2>
        <p>Here you can view your proposals.</p>
      </div>
      <div>

      </div>
    </>
    
  );
}

export default MyProposals;
