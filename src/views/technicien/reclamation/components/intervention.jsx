import React, { useState } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
const Intervention = ({ handleClose, reclamation }) => {
const { user } = useAuthContext();
const [numRapport, setNumRapport] = useState(reclamation?.idn);
const [client, setClient] = useState(reclamation?.client || "");
const [type, setType] = useState(reclamation?.type || "");
const [dateDebut, setDateDebut] = useState(reclamation?.createdAt || "");
const [dateFin, setDateFin] = useState(new Date().toISOString().slice(0, 16));
const [description, setDescription] = useState(reclamation?.description || "");
const [reclamations, setReclamations] = useState([]);
const [error, setError] = useState('');
  const add = async (e) => {
    e.preventDefault();
    try {
      const intervention = {
        numRapport,
        type,
        client,
        dateDebut,
        dateFin,
        description
      };
  
      const response = await fetch('/api/inter/add', {
        method: 'POST',
        body: JSON.stringify(intervention),
        headers: {
          'Content-type': 'application/json',
          'Authorization': `Bearer ${user.token}`

        }
      });
  
      const json = await response.json();
  
      if (response.ok) {
        console.log('Intervention created:', json);
        toast.success('Fiche Intervention Crée');
        handleClose();
      } else {
        console.error('Error:', json);
        setError(json.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  return (

    <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
      <ToastContainer />
      <div className="rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100">
        <h2 className="mb-4 text-xl font-semibold text-center text-tunisys-100">Veuillez remplir la fiche intervention</h2>
        <form className="flex flex-col">
          <label>
            Numéro Rapport:
            <input
              type="text"
              value={numRapport}
              onChange={(e) => setNumRapport(e.target.value)}
            />
          </label>
          <label>
            Client:
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </label>
          <label>
            Panne:
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </label>
          <label>
            Date Début:
            <input
              readOnly
              type="datetime-local"
              value={reclamation && reclamation.createdAt ? new Date(reclamation.createdAt).toISOString().slice(0, 16) : ""}
            />
          </label>
          <label>
            Date Fin
            <input
              type="datetime-local"
              value={new Date().toISOString().slice(0, 16)}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}

          <button
            className="text-indigo-00 text-green-600 text- mt-4 rounded py-2 px-4 font-bold hover:text-green-600"
            type="submit" onClick={add}>
            Finaliser
          </button>
          <button
            className="mt-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Intervention;
