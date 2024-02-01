import Card from 'components/card';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddAgence from './addAgence';

const AgenceDetails = () => {
  const { clientId,clientName } = useParams();
  const [clientAgences, setClientAgences] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(clientName)
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = (client) => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchAgences = async () => {
      try {
        const response = await fetch(`/api/client/${clientId}/agence`);
        if (response.ok) {
          const data = await response.json();
          setClientAgences(data);
        } else {
          console.error('Failed to fetch client agences');
        }
      } catch (error) {
        console.error('Error fetching client agences:', error);
      }
    };

    fetchAgences();
  }, [clientId]);

  return (
    <div className=''>
      <h1 className='text-[1.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'> {clientName}/ Agence</h1>
      <div className="mt-2 flex justify-end">
          <button
            title="Ajouter agence"
            class="group cursor-pointer bg-tunisys-100  w-[50px] rounded outline-none "
            onClick={handleOpenModal}
          >
           <p className='font-bold text-[50px] hover:rotate-90 duration-300 text-white'>+</p>
          </button>
        </div>
      <ul>
  {clientAgences.length > 0 ? (
    clientAgences.map((agence) => (
      <li key={agence._id}>
        <Card className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white dark:bg-navy-700'>
          <p className='text-[15px] text-tunisys-100 font-bold dark:text-white'><span>Code Agence :</span>{agence.code_agence}</p>
          <p className='text-[15px] text-black font-bold dark:text-white'><span>Localisation :</span>{agence.localisation}</p>
          <p className='text-[15px] text-black font-bold dark:text-white'><span>Rue :</span>{agence.rue}</p>
        </Card>
      </li>
    ))
  ) : (
    <li>
      <p>Aucune agence appartient à cet client</p>
    </li>
  )}
</ul>

{isModalOpen && (
      <div className='modal'>
        <div className='modal-content border-x-violet-800	'>
          <span className='close' onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
          {isModalOpen && <AddAgence handleClose={handleCloseModal}  />
}
        </div>
      </div>
    )}
    </div>
  );
};

export default AgenceDetails;
