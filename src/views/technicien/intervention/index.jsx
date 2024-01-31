import React, { useState, useEffect } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import { useInterventionsContext } from 'Hooks/useIntervention';
import FicheIntervention from '../ficheintervention';

const ListeIntervention = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInter, setSelectedInter] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = (intervention) => {
    setIsModalOpen(true);
    setSelectedInter(intervention);
  };
  const { user } = useAuthContext();
  const { interventions, dispatch } = useInterventionsContext()

  useEffect(() => {
    const fetchInterventions = async () => {
      const response = await fetch('/api/inter/get', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_INTERVENTIONS', payload: json })
        console.log(json);
      }
    }
    if (user) {
      fetchInterventions()
    }

  }, [dispatch, user])
  return (
    <div>
      <h1 className='text-[1.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'>Liste d'intervention</h1>
      <ul>
      {interventions && Array.isArray(interventions)
        ? interventions.map((intervention) => (
            <div key={intervention._id} className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
            <div className='flex'>
              <div className="ml-4">
                <ul>
                  <li>
                    <strong>_id: </strong>{intervention._id}
                  </li>
                  <li>
                    <strong>numRapport: </strong>{intervention.numRapport}
                  </li>
                  <li>
                    <strong>type: </strong>{intervention.type}
                  </li>
                  <li>
                    <strong>dateDebut: </strong> {new Date(intervention.dateDebut).toLocaleString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </li>
                  <li>
                    <strong>dateFin: </strong>{new Date(intervention.dateFin).toLocaleString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </li>
                  <li>
                    <strong>client: </strong>{intervention.client}
                  </li>
                  <li>
                    <strong>description: </strong>{intervention.description}
                  </li>
                  
                </ul>
                <button className='p-2 text-lg bg-tunisys-100 rounded text-white'onClick={() => handleOpenModal(intervention)}> Voir   </button>
              </div>
            </div>
          </div>
         ))
         : (
             <p>No interventions available.</p>
           )
       }
      </ul>
      {isModalOpen && (
                  <div className='modal'>
                    <div className='modal-content border-x-violet-800	'>
                      <span className='close' onClick={() => setIsModalOpen(false)}>
                        &times;
                      </span>
                      {isModalOpen && <FicheIntervention handleClose={handleCloseModal} intervention={selectedInter} />}
                    </div>
                  </div>
                )}
    </div>
  );
 }  

export default ListeIntervention;
