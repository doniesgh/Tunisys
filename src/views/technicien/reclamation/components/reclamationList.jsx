import React, { useState, useEffect } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TechReclamationsContext } from './hooks/useRecsContext'; // Update the import path

const ReclamationsList = (socket) => {
  const [reclamations, setReclamations] = useState([]);
  const { user } = useAuthContext();
  const [accepted,setAccepted ] = useState(false)
  const [reported,setReported ] = useState(false)
  const [finalised,setFinalised] = useState(false)
  const { loading, setLoading } = TechReclamationsContext(); // Use the context

  const DebutButton = async (reclamationId,type) => {
    try {
      setLoading(true); // Set loading to true
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

      setReclamations(prevReclamations => prevReclamations.map(reclamation =>
        reclamation._id === updatedReclamation._id ? updatedReclamation : reclamation
      ));

      toast.success('Vous avez commencé à résoudre la réclamation');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setAccepted(true);
      socket.emit("sendNotification",{
        senderName:user,
        receiverName:user,
        type,
      })
    }
  };
  const finalButton = async (reclamationId,type) => {
    try {
      setLoading(true); // Set loading to true
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

      setReclamations(prevReclamations => prevReclamations.map(reclamation =>
        reclamation._id === updatedReclamation._id ? updatedReclamation : reclamation
      ));

      toast.success('Vous avez finalisé la réclamation');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setFinalised(true);
      socket.emit("sendNotification",{
        senderName:user,
        receiverName:user,
        type,
      })
    }
  };
  const reportButton = async (reclamationId,type) => {
    try {
      setLoading(true); // Set loading to true
      const response = await fetch(`/api/rec/update-reclamation-status/${reclamationId}/reporte`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedReclamation = await response.json();

      setReclamations(prevReclamations => prevReclamations.map(reclamation =>
        reclamation._id === updatedReclamation._id ? updatedReclamation : reclamation
      ));

      toast.error('Vous avez reporté la réclamation');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setReported(true) 
        socket.emit("sendNotification",{
          senderName:user,
          receiverName:user,
          type,
        }) 
    }
  };

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        setLoading(true); 
        const response = await fetch('/api/rec/assigned-reclamations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response Data:', data);

        setReclamations(data.reclamations);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
        
      }
    };
   
      //const interval = setInterval(fetchReclamations, 5000); // Fetch every 5 seconds (adjust as needed)
      //return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [user.token]);

  return (
    <div>
      <ToastContainer />
  <h1 className='text-[2.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'>Réclamations Affectées</h1>
  <ul>
    {reclamations.map(reclamation => (
      <div key={reclamation._id} className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
        <div className='flex'>
          <div className="ml-4">
            <li>
              <p className="mb-1"><strong>Id :</strong>{reclamation.idn} </p>
              <p className="mb-1"><strong>Client :</strong>{reclamation.client} </p>
              <p className="mb-1"><strong>Localisation :</strong>{reclamation.localisation } </p>
              <p className="mb-1"><strong>Type :</strong>{reclamation.type} </p>
              <p className="mb-1"><strong>Equipement :</strong>{reclamation.equipement} </p>
              <p className="mb-1"><strong>Etat:</strong>{reclamation.etat} </p>
            </li>
            <button className='text-white rounded cursor-pointer p-2.5 border-0 bg-tunisys-100' onClick={() => DebutButton(reclamation._id,1)}>Débuter</button>
            <button className='text-white ml-3 rounded cursor-pointer p-2.5 border-0 bg-tunisys-100' onClick={() => reportButton(reclamation._id,2)}>Reporter</button>
            <button className='text-white ml-3 rounded cursor-pointer p-2.5 border-0 bg-tunisys-100' onClick={() => reportButton(reclamation._id,2)}>Reporter</button>

          </div>
        </div>
      </div>
    ))}
  </ul>

</div>

  );
};

export default ReclamationsList;