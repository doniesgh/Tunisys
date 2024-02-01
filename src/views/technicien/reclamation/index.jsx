import React, { useState, useEffect } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Intervention from './components/intervention';
import { useHelpRecContext } from 'Hooks/useHelpRecContext';
import { json } from 'react-router-dom';
const ReclamationsList = () => {
  const { helpreclamations, dispatch } = useHelpRecContext()
  const { user } = useAuthContext();
  const [selectedRec, setSelectedRec] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = (reclamation) => {
    setIsModalOpen(true);
    setSelectedRec(reclamation);
  };

  useEffect(() => {
    const fetchReclamations = async () => {
      const response = await fetch('/api/rec/assigned-reclamations', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_HREC', payload: json })
        console.log(json);
      }
    }
    if (user) {
      fetchReclamations()
    }

  }, [dispatch, user])
  
  const Debuter = async (reclamationId, type) => {
    try {
      const response = await fetch(`/api/rec/update-reclamation-status/${reclamationId}/en cours`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const updatedReclamation = await response.json();
  
      dispatch({
        type: 'UPDATE_REC_DEBUTER',
        payload: { _id: reclamationId, etat: 'en cours' }, // Utilisez 'en cours' ici
      });
  
      toast.success('État de la réclamation mis à jour : en cours');
      localStorage.setItem('debuterButtonVisible', JSON.stringify(false));
      

    } catch (error) {
      console.error('Error:', error);
    }
  };
  const Reporter = async (reclamationId, type) => {
    try {
      const response = await fetch(`/api/rec/reporte/${reclamationId}/reporte`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const updatedReclamation = await response.json();
  
      dispatch({
        type: 'UPDATE_REC_REPORTER',
        payload: { _id: reclamationId, etat: 'reporte' }, // Utilisez 'en cours' ici
      });
  
      toast.error('État de la réclamation mis à jour : reporté');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const Finaliser = async (reclamationId, type) => {
    try {
      const response = await fetch(`/api/rec/update-reclamation-status/${reclamationId}/finalise`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const updatedReclamation = await response.json();
  
      dispatch({
        type: 'UPDATE_REC_FINALISER',
        payload: { _id: reclamationId, etat: 'finalise' }, 
      });
  
      toast.success('État de la réclamation mis à jour :finalisé');
      handleOpenModal(updatedReclamation); 
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div>
      <ToastContainer />
      <h1 className='text-[1.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'>Réclamations Affectées</h1>
      <ul>  
       {helpreclamations && Array.isArray(helpreclamations)
        ? helpreclamations.map((reclamation) => (
          <div key={reclamation._id} className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
            <div className='flex'>
              <div className="ml-4">
                <li>
                  <p className="mb-1"><strong>Id :</strong>{reclamation.idn} </p>
                  <p className="mb-1"><strong>Client :</strong>{reclamation.client} </p>
                  <p className="mb-1"><strong>Localisation :</strong>{reclamation.localisation} </p>
                  <p className="mb-1"><strong>Type :</strong>{reclamation.type} </p>
                  <p className="mb-1"><strong>Equipement :</strong>{reclamation.equipement} </p>
                  <p className="mb-1"><strong>Etat:</strong>{reclamation.etat} </p>
                  <p className="mb-1"><strong>Manager:</strong>{reclamation.creerpar} </p>
                  <p className="mb-1">
                    <strong>Date de création:</strong>
                    {new Date(reclamation.createdAt).toLocaleString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </p>
            <button className='text-white  rounded cursor-pointer p-2.5 border-0 bg-orange-400' onClick={() => Debuter(reclamation._id, 1)}>
              Débuter
            </button>
          
            <>
              <button className='text-white ml-3 rounded cursor-pointer p-2.5 border-0 bg-tunisys-100' onClick={() => Reporter(reclamation._id, 2)}>
                Reporter
              </button>
              <button className='text-white ml-3 rounded cursor-pointer p-2.5 border-0 bg-green-400' onClick={() => Finaliser(reclamation._id, 3)}>
                Finaliser
              </button>
            </>
               </li>
               {isModalOpen && (
                  <div className='modal'>
                    <div className='modal-content border-x-violet-800	'>
                      <span className='close' onClick={() => setIsModalOpen(false)}>
                        &times;
                      </span>
                      {isModalOpen && <Intervention handleClose={handleCloseModal} reclamation={selectedRec.reclamation} />}

                    </div>
                  </div>
                )}


              </div>
            </div>
          </div>
        ))
        : (
            <p>Pas de réclamations.</p>
          )
      }
      </ul>

    </div>

  );
};

export default ReclamationsList;

